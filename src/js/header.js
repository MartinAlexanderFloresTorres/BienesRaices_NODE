;(() => {
  const header = document.querySelector('#header-app')
  const menu = document.querySelector('#menu-app')

  // Eventos
  menu.addEventListener('click', toogleMenu)

  // Funciones
  function toogleMenu() {
    header.classList.toggle('header-app-active')
  }
})()
