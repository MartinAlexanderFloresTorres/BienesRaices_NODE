import { Sequelize } from 'sequelize'
import { BD_DATABASE, BD_HOST, BD_PASSWORD, BD_PORT, BD_USER } from '../env/environment.js'

const db = new Sequelize(BD_DATABASE, BD_USER, BD_PASSWORD, {
  host: BD_HOST,
  port: BD_PORT,
  dialect: 'mysql',
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default db
