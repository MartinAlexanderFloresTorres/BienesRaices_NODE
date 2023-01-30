import path from 'path'

export default {
  mode: 'development', // production
  entry: {
    mapa: './src/js/mapa.js',
    agregarImagen: './src/js/agregarImagen.js',
    mostrarMapa: './src/js/mostrarMapa.js',
    mapaInicio: './src/js/mapaInicio.js',
    mostrarCategorias: './src/js/mostrarCategorias.js',
    cambiarEstado: './src/js/cambiarEstado.js',
    header: './src/js/header.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js')
  }
}
