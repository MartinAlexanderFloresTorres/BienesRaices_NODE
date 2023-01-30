import { Router } from 'express'
import { categorias, propiedades } from '../controllers/apiControllers.js'

const apiRouters = Router()

// propiedades
apiRouters.get('/propiedades', propiedades)

// categorias
apiRouters.get('/categorias', categorias)

export default apiRouters
