// Importaciones
import jwt from 'jsonwebtoken'

/**
 * Genera un id aleatorio para el token
 * @returns {string} id
 * @example '1a2b3c4d5e6f7g8h9i0j-white'
 */

export const generarId = () => {
  const ramdon1 = Math.random().toString(32).substring(2)
  const ramdon2 = Date.now().toString(32).substring(2)
  const id = `${ramdon1}${ramdon2}`.replace(/\//g, '').replace(/\+/g, '').substring(0, 16)
  return id + '-white'
}

/**
 * Genera un jwt con jsonwebtoken
 * @returns {string} jwt
 */

export const generJWT = ({ id }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
}
