import { Usuario } from '../models/index.js'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  // token
  const { _bienes_raices_cookie_token } = req.cookies

  // si no hay token
  if (!_bienes_raices_cookie_token) return next()

  try {
    // descifrar
    const encode = jwt.verify(_bienes_raices_cookie_token, process.env.JWT_SECRET)

    // consultar usuario
    const usuario = await Usuario.scope('eliminarAtributos').findByPk(encode.id)

    if (usuario) {
      req.usuario = usuario
    }
    return next()
  } catch (error) {
    console.log(error)
    res.clearCookie('_bienes_raices_cookie_token').redirect('/auth/login')
  }

  return next()
}

export default auth
