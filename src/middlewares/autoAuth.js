import jwt from 'jsonwebtoken'
import { Usuario } from '../models/index.js'

const autoAuth = async (req, res, next) => {
  // Existe cookie
  const { _bienes_raices_cookie_token } = req.cookies

  if (!_bienes_raices_cookie_token) {
    return next()
  }

  // Validar cookie
  try {
    // Decifrar
    const decifrado = jwt.verify(_bienes_raices_cookie_token, process.env.JWT_SECRET)

    // Verificar usuario existe
    const { id } = decifrado
    const usuario = await Usuario.scope('eliminarAtributos').findOne({ where: { id } })

    if (!usuario) {
      return next()
    }

    return res.redirect('/mis-propiedades')
  } catch (error) {
    console.log(error)
    return res.clearCookie('_bienes_raices_cookie_token').redirect('/auth/login')
  }
}

export default autoAuth
