// Importaciones
import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Propiedad = db.define('propiedades', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  habitaciones: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  establecimiento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  banos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null
  },
  publicado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

export default Propiedad
