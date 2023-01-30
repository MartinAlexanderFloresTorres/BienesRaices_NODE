import { Router } from 'express'
import { buscador, categoria, inicio, notFound } from '../controllers/appControllers.js'
import auth from '../middlewares/auth.js'

const appRouters = Router()

// Inicio
appRouters.get('/', auth, inicio)

// Categorias
appRouters.get('/categorias/:id', auth, categoria)

// 404
appRouters.get('/404', auth, notFound)

// Buscador
appRouters.get('/buscador', auth, buscador)

export default appRouters
