;(() => {
  const lat = -5.1787499
  const lng = -80.6539404
  const mapa = L.map('mapa-inicio').setView([lat, lng], 13)

  const categoriaSelect = document.querySelector('#categorias')
  const precioSelect = document.querySelector('#precios')

  let markers = new L.FeatureGroup().addTo(mapa)

  let propiedades = []

  // Filtros
  const filtros = {
    categoria: '',
    precio: ''
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa)

  // Eventos de filtrados
  categoriaSelect.addEventListener('change', (e) => {
    filtros.categoria = Number(e.target.value)
    filtarPropiedades()
  })
  precioSelect.addEventListener('change', (e) => {
    filtros.precio = Number(e.target.value)
    filtarPropiedades()
  })

  const filtarPropiedades = () => {
    const filtarCategoria = (p) => {
      const { precioId } = p
      return filtros.precio ? precioId === filtros.precio : p
    }
    const filtrarPrecio = (p) => {
      const { categoriaId } = p
      return filtros.categoria ? categoriaId === filtros.categoria : p
    }
    const filtrados = propiedades.filter(filtarCategoria).filter(filtrarPrecio)

    // Limpiar los markers previos
    markers.clearLayers()

    mostrarPropiedades(filtrados)
  }

  const obtenerPropiedades = async () => {
    try {
      const resultados = await fetch('/api/propiedades')
      propiedades = await resultados.json()
      mostrarPropiedades(propiedades)
    } catch (error) {
      console.log(error)
    }
  }
  obtenerPropiedades()

  const mostrarPropiedades = (propiedades) => {
    propiedades.forEach((propiedad) => {
      // Agregar los pines
      const { id, lat, lng, calle, titulo, imagen, descripcion, precio, categoria } = propiedad

      const marker = new L.marker([Number(lat), Number(lng)], {
        autoPan: true
      }).addTo(mapa).bindPopup(`
          <div>
            <span class="text-sm font-bold text-indigo-500">
            ${categoria.nombre} 
            </span> 
            <span class="text-gray-400">${calle}</span>
          </div>
     
          <h1 class="text-xl font-extrabold uppercase my-5">${titulo}</h1>
          <img class="block" src="/uploads/${imagen}" alt="Imangen propiedad ${titulo}">
          <p class="text-sm font-bold text-green-600">${precio.nombre}</p>
          <p class="text-sm font-bold text-gray-600">${descripcion}</p>
          <a href="/propiedad/${id}" target="_blank" class="block w-full py-3 px-2 font-bold uppercase bg-indigo-700 text-white text-center rounded-md hover:bg-indigo-800 transition-all cursor-pointer border border-indigo-500"><span class="text-white">Ver Propiedad</span></a>
        `)

      markers.addLayer(marker)
    })
  }
})()
