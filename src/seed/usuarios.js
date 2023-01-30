import bcrypt from 'bcrypt'

const usuarios = [
  {
    nombre: 'Martin Flores',
    email: 'correo@correo.com',
    confirmado: 1,
    password: bcrypt.hashSync('password', 10)
  }
]

export default usuarios
