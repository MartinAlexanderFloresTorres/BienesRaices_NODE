import db from './db.js'

const conectarBD = async () => {
  try {
    await db.authenticate()
    db.sync()
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default conectarBD
