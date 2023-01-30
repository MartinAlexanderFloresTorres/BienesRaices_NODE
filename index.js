// Importaciones
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import usuarioRouters from './src/routers/usuarioRouters.js'
import propiedadRouters from './src/routers/propiedadRouters.js'
import { PORT } from './src/env/environment.js'
import conectarBD from './src/config/conectarBD.js'
import appRouters from './src/routers/appRouters.js'
import apiRouters from './src/routers/apiRouters.js'

// Inicializar la app
const app = express()

// Env
dotenv.config()

// Cookie
app.use(cookieParser())

// Conectar DB
conectarBD()

// Habilita la lectura de los formularios
app.use(express.urlencoded({ extended: true }))

// Carpeta publica
app.use(express.static('public'))

// Habilitar pug
app.set('view engine', 'pug')
app.set('views', './src/views')

// Rutas
app.use('/', appRouters)
app.use('/', propiedadRouters)
app.use('/auth', usuarioRouters)
app.use('/api', apiRouters)

// Run Server
app.listen(PORT, (error) => {
  if (error) process.exit()
  console.log(`Servidor funcionando en el puerto http://localhost:${PORT}`)
})
