const validarDatos = (...args) => {
  const objetos = args.filter((arg) => typeof arg === 'object')
  if (objetos.length > 0) {
    return Object.values(objetos[0]).includes('')
  }

  const strings = args.filter((arg) => typeof arg === 'string')

  if (strings.length > 0) {
    return strings.includes('')
  }

  return args.includes('')
}

export default validarDatos
