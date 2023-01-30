;(() => {
  const contenedor = document.querySelector('#header-categorias')

  // obtener categorias
  const obtenerCategorias = async () => {
    try {
      const responde = await fetch('/api/categorias')
      const categorias = await responde.json()
      mostrarCategorias(categorias)
    } catch (error) {
      console.log(error)
    }
  }
  obtenerCategorias()

  const mostrarCategorias = (categorias) => {
    categorias.forEach((categoria) => {
      const enlace = document.createElement('A')
      enlace.href = `/categorias/${categoria.id}`
      enlace.textContent = categoria.nombre
      enlace.className = 'text-sm font-bold uppercase text-white'
      contenedor.appendChild(enlace)
    })
  }
})()
