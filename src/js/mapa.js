;(function () {
  let marker
  const lat = Number(document.querySelector('#lat').value) || -5.1787499
  const lng = Number(document.querySelector('#lng').value) || -80.6539404
  const mapa = L.map('mapa').setView([lat, lng], 13)

  // Utilizar Provider y Geocoder
  const geocodeService = L.esri.Geocoding.geocodeService()

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa)

  // El pin
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  }).addTo(mapa)

  // Detectar el movimiento del pin
  marker.on('moveend', function (e) {
    marker = e.target
    const posicion = marker.getLatLng()
    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

    // Obtener informacion de las caller al soltar el ping
    geocodeService
      .reverse()
      .latlng(posicion, 13)
      .run(function (error, resultado) {
        marker.bindPopup(resultado?.address?.LongLabel ?? 'No logramos localizarlo')

        // Llenar los inputs
        document.querySelector('.calle').textContent = resultado?.address?.Address ?? 'No logramos localizarlo, Intente con otro'
        document.querySelector('#calle').value = resultado?.address?.Address ?? 'No logramos localizarlo, Intente con otro'
        document.querySelector('#lat').value = resultado?.latlng?.lat ?? 0
        document.querySelector('#lng').value = resultado?.latlng?.lng ?? 0
      })
  })
})()
