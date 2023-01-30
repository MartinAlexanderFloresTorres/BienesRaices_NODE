import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const Usuario = db.define(
  'usuarios',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10)
        usuario.password = await bcrypt.hash(usuario.password, salt)
      }
    },
    scopes: {
      eliminarAtributos: {
        attributes: {
          exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
        }
      }
    }
  }
)

// Metodos personalizados
Usuario.prototype.verificarPassword = function (formularioPassword) {
  return bcrypt.compareSync(formularioPassword, this.password)
}

export default Usuario
