// Importaciones
import { Router } from 'express'
import autoAuth from '../middlewares/autoAuth.js'
import { registrar, confirmar, formularioAutenticar, formularioOlvidePassword, formularioRegistrar, olvidePassword, nuevoPassword, comprobarToken, autenticar, cerrarSesion } from '../controllers/usuarioControllers.js'

// Router
const usuarioRouters = Router()

// Rutas
usuarioRouters.get('/login', autoAuth, formularioAutenticar)
usuarioRouters.post('/login', autenticar)

usuarioRouters.get('/registro', autoAuth, formularioRegistrar)
usuarioRouters.post('/registro', registrar)

usuarioRouters.get('/confirmar/:token', confirmar)

usuarioRouters.post('/cerrar-sesion/', cerrarSesion)

usuarioRouters.get('/olvide-password', autoAuth, formularioOlvidePassword)
usuarioRouters.post('/olvide-password', olvidePassword)
usuarioRouters.get('/nuevo-password/:token', comprobarToken)
usuarioRouters.post('/nuevo-password/:token', nuevoPassword)

export default usuarioRouters
