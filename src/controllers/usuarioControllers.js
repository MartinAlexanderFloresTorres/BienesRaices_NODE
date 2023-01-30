// Importaciones
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import { generJWT, generarId } from '../helpers/tokens.js'
import { emailRegistro, emailOlvidePassword } from '../emails/index.js'

// Formulario autenticar usuario
export const formularioAutenticar = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión'
  })
}

// Formulario registrar usuario
export const formularioRegistrar = (req, res) => {
  res.render('auth/registro', {
    page: 'Crear Cuenta'
  })
}

// Formulario olvide password
export const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    page: 'Recuperación'
  })
}

// autenticar usuario
export const autenticar = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar
    await check('email').isEmail().withMessage('El email no es valido').run(req)
    await check('password').notEmpty({ ignore_whitespace: true }).withMessage('El password es obligatorio').run(req)

    // Errores
    let errores = validationResult(req).array()

    if (errores.length > 0) {
      // Renderizar
      return res.render('auth/login', {
        page: 'Iniciar Sesión',
        errores,
        usuario: {
          email
        }
      })
    }

    // Verificar que exista el usuario con este email
    const existeUsuario = await Usuario.findOne({ where: { email } })

    if (!existeUsuario) {
      return res.render('auth/login', {
        page: 'Iniciar Sesión',
        errores: [{ msg: 'No existe un usuario con ese email' }],
        usuario: {
          email
        }
      })
    }

    // Comprobar si el usuario esta confirmado
    if (!existeUsuario.confirmado) {
      return res.render('auth/login', {
        page: 'Iniciar Sesión',
        errores: [{ msg: 'El usuario no ha cofirmado su cuenta' }],
        usuario: {
          email
        }
      })
    }

    // Validar su password
    if (!existeUsuario.verificarPassword(password)) {
      return res.render('auth/login', {
        page: 'Iniciar Sesión',
        errores: [{ msg: 'El password es incorrecto' }],
        usuario: {
          email
        }
      })
    }

    // Generar jwt
    const jwt = generJWT({ id: existeUsuario.id })

    // Almacenar en un cookie
    return res
      .cookie('_bienes_raices_cookie_token', jwt, {
        httpOnly: true
        // secure: true,
      })
      .redirect('/mis-propiedades')
  } catch (error) {
    console.log(error)
    res.render('auth/login', {
      page: 'Iniciar Sesión'
    })
  }
}

// registrar usuario
export const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Validar
    await check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('El email no es valido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').equals(password).withMessage('Los passwords no coinciden').run(req)

    // Errores
    let errores = validationResult(req).array()

    // Verificar que no exista el mismo usuario con un email
    const existeUsuario = await Usuario.findOne({ where: { email } })

    if (existeUsuario) {
      errores = [...errores, { msg: 'Ya existe un usuario con el email' }]
    } else {
      // Si no hay errores
      if (errores.length === 0) {
        // Crear usuario
        const usuario = await Usuario.create({
          nombre,
          email,
          password,
          token: generarId()
        })

        // Enviar email
        await emailRegistro({
          nombre: usuario.nombre,
          email: usuario.email,
          token: usuario.token
        })

        // Renderizar
        return res.render('templates/mensaje', {
          page: 'Cuenta Creada Correctamente',
          mensage: 'Hemos enviado un email de confirmación. Preciona en el enlace que te hemos enviado.'
        })
      }
    }

    // Renderizar
    res.render('auth/registro', {
      page: 'Crear Cuenta',
      errores,
      usuario: {
        nombre,
        email
      }
    })
  } catch (error) {
    console.log(error)
    res.render('auth/registro', {
      page: 'Crear Cuenta'
    })
  }
}

// confirmar cuenta
export const confirmar = async (req, res) => {
  try {
    const { token } = req.params

    // El usuario existe
    const existeUsuario = await Usuario.findOne({ where: { token } })

    if (!existeUsuario) {
      // Renderizar
      return res.render('auth/confirmar-cuenta', {
        page: 'Error al confimar tu cuenta',
        error: true,
        mensage: 'Hubo un error al confirmar tu cuenta, Intenta de nuevo.'
      })
    }

    // confirmar
    existeUsuario.token = null
    existeUsuario.confirmado = true

    // guardar
    await existeUsuario.save()

    // Renderizar
    res.render('auth/confirmar-cuenta', {
      page: 'Cuenta Confirmada',
      error: false,
      mensage: 'La cuenta se confirmó correctamente.'
    })
  } catch (error) {
    console.log(error)
  }
}

// olvide password
export const olvidePassword = async (req, res) => {
  try {
    const { email } = req.body

    // Validad email
    await check('email').isEmail().withMessage('El email no es valido').run(req)

    // Errores
    let errores = validationResult(req).array()

    // Verificar que exista el usuario con el email
    const existeUsuario = await Usuario.findOne({ where: { email } })

    if (existeUsuario) {
      // Generar token
      existeUsuario.token = generarId()

      // Guardar el usuario
      const usuario = await existeUsuario.save()

      // Enviar email
      await emailOlvidePassword({ email: usuario.email, nombre: usuario.nombre, token: usuario.token })

      // Renderizar
      return res.render('templates/mensaje', {
        page: 'Instrucciones enviadas',
        mensage: 'Hemos enviado un email para restableces su password. Preciona en el enlace que te hemos enviado.'
      })
    } else {
      errores = [...errores, { msg: 'No existe un usuario con ese email' }]
    }

    // Renderizar
    res.render('auth/olvide-password', {
      page: 'Recuperación',
      errores,
      usuario: { email }
    })
  } catch (error) {
    console.log(error)

    // Renderizar
    res.render('auth/olvide-password', {
      page: 'Recuperación'
    })
  }
}

// olvide password
export const comprobarToken = async (req, res) => {
  try {
    const { token } = req.params

    // Verificar que exista el usuario con el token
    const existeUsuario = await Usuario.findOne({ where: { token } })

    if (!existeUsuario) {
      return res.render('auth/alerta', {
        page: 'Token no valido',
        mensage: 'El token no es valido, Intente nuevamente.',
        error: true
      })
    }

    // Renderizar
    res.render('auth/nuevo-password', {
      page: 'Restablece Tu Password'
    })
  } catch (error) {
    console.log(error)
    return res.render('auth/alerta', {
      page: 'Hubo un error',
      mensage: 'Hubo un error, Intente nuevamente.',
      error: true
    })
  }
}

// olvide password
export const nuevoPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    // Validar
    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').equals(password).withMessage('Los passwords no coinciden').run(req)

    // Errores
    let errores = validationResult(req).array()

    // Verificar que exista el usuario con el token
    const existeUsuario = await Usuario.findOne({ where: { token } })

    if (!existeUsuario) {
      return res.render('auth/alerta', {
        page: 'Token lo valido',
        mensage: 'El token no es valido, Intente nuevamente.',
        error: true
      })
    }

    if (errores.length === 0) {
      // Hashear el nuevo password
      const salt = await bcrypt.genSalt(10)
      existeUsuario.password = await bcrypt.hash(password, salt)

      // Eliminar el token
      existeUsuario.token = null

      // Guardar
      await existeUsuario.save()

      // Renderizar
      return res.render('auth/alerta', {
        page: 'Password Restablecido',
        mensage: 'Su password a sido actualizado correctamente.'
      })
    }

    // Renderizar
    res.render('auth/nuevo-password', {
      page: 'Restablece Tu Password',
      errores
    })
  } catch (error) {
    console.log(error)
    return res.render('auth/alerta', {
      page: 'Hubo un error',
      mensage: 'Hubo un error, Intente nuevamente.',
      error: true
    })
  }
}

// cerrar Sesion
export const cerrarSesion = (req, res) => {
  res.clearCookie('_bienes_raices_cookie_token').redirect('/auth/login').status(200)
}
