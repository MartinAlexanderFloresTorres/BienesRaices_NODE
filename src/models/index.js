// Importaciones
import Propiedad from './Propiedad.js'
import Categoria from './Categoria.js'
import Precio from './Precio.js'
import Usuario from './Usuario.js'
import Mensaje from './Mensaje.js'

// ? 1:1
// Precio.hasOne(Propiedad) // Una propiedad tiene un precio
Propiedad.belongsTo(Precio, { foreignKey: 'precioId' }) // Una propiedad tiene un precio
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaId' }) // Una propiedad tiene un categoria
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioId' }) // Una propiedad tiene un usuario
Propiedad.hasMany(Mensaje, { foreignKey: 'propiedadId' }) // Una propiedad tiene muchos mensajes

Mensaje.belongsTo(Propiedad, { foreignKey: 'propiedadId' }) // Un Mensaje tiene una propiedad
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioId' }) // Un Mensaje tiene un usuario

export { Propiedad, Categoria, Precio, Usuario, Mensaje }
