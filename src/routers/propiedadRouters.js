// Importaciones
import { Router } from 'express'
import checkAuth from '../middlewares/checkAuth.js'
import { admin, formularioCrear, crearPropiedad, formularioAgregarImagen, almacenarImagen, formularioEditarPropiedad, editarPropiedad, eliminarPropiedad, mostrarPropiedad, enviarMensaje, mostrarMensajes, cambiarEstado } from '../controllers/propiedadControllers.js'
import subirImagen from '../middlewares/subirImagen.js'
import auth from '../middlewares/auth.js'

// Router
const propiedadRouters = Router()

// Rutas
// Area privada
propiedadRouters.get('/mis-propiedades', checkAuth, admin)

propiedadRouters.get('/propiedades/crear', checkAuth, formularioCrear)
propiedadRouters.post('/propiedades/crear', checkAuth, crearPropiedad)

propiedadRouters.get('/propiedades/agregar-imagen/:id', checkAuth, formularioAgregarImagen)
propiedadRouters.post('/propiedades/agregar-imagen/:id', checkAuth, subirImagen.single('imagen'), checkAuth, almacenarImagen)

propiedadRouters.get('/propiedades/editar/:id', checkAuth, formularioEditarPropiedad)
propiedadRouters.post('/propiedades/editar/:id', checkAuth, editarPropiedad)

propiedadRouters.post('/propiedades/eliminar/:id', checkAuth, eliminarPropiedad)

propiedadRouters.put('/propiedades/estado/:id', checkAuth, cambiarEstado)

// Area publica
propiedadRouters.get('/propiedad/:id', auth, mostrarPropiedad)

// Almacenar los mensajes
propiedadRouters.post('/propiedad/:id', auth, enviarMensaje)

// Mostrar Mensajes
propiedadRouters.get('/mensajes/:id', checkAuth, mostrarMensajes)

export default propiedadRouters
