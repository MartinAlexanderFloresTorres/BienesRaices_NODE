;(() => {
  const botones = document.querySelectorAll('#cambiar-estado-btn')

  botones.forEach((boton) => {
    boton.addEventListener('click', async (e) => {
      const { id } = e.target.dataset

      try {
        const results = await fetch(`/propiedades/estado/${id}`, {
          method: 'PUT'
        })
        const { ok } = await results.json()
        if (ok) {
          if (boton.classList.contains('bg-green-100')) {
            boton.classList.remove('bg-green-100', 'text-green-800', 'hover:bg-green-200')
            boton.classList.add('bg-yellow-100', 'text-yellow-800', 'hover:bg-yellow-200')
            boton.textContent = 'No publicado'
          } else {
            boton.classList.remove('bg-yellow-100', 'text-yellow-800', 'hover:bg-yellow-200')
            boton.classList.add('bg-green-100', 'text-green-800', 'hover:bg-green-200')
            boton.textContent = 'Publicado'
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
  })
})()
