;(() => {
  const lat = Number(document.querySelector('#lat').textContent) || -5.1787499
  const lng = Number(document.querySelector('#lng').textContent) || -80.6539404
  const calle = document.querySelector('#calle').textContent || 'No se encontro la calle'
  const mapa = L.map('mapa').setView([lat, lng], 17)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa)

  // Agregar el pin
  L.marker([lat, lng]).addTo(mapa).bindPopup(calle)
})()
