// formatear fecha
const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha)

  const minutos = Math.floor((new Date() - nuevaFecha) / 1000 / 60)
  const horas = Math.floor((new Date() - nuevaFecha) / 1000 / 60 / 60)
  return (
    nuevaFecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) +
    ' hace ' +
    (minutos < 60
      ? minutos + ' minutos'
      : horas === 1
      ? '1 hora'
      : horas < 24
      ? horas + ' horas'
      : nuevaFecha.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }))
  )
}

export default formatearFecha
