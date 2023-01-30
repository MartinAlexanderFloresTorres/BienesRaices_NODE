// Importaciones
import { unlink } from 'fs/promises'
import { check, validationResult } from 'express-validator'
import { Propiedad, Categoria, Precio, Mensaje, Usuario } from '../models/index.js'
import formatearFecha from '../helpers/formatearFecha.js'

// Admin
export const admin = async (req, res) => {
  try {
    const { id } = req.usuario

    const { pagina: paginaActual } = req.query

    // Expression
    const regex = /^[1-9]+$/

    if (!regex.test(paginaActual)) {
      return res.redirect('/mis-propiedades?pagina=1')
    }

    // Paginas de (1 - 10), (20-30), (30-40) ...
    const limit = 10
    const offset = paginaActual * limit - limit

    // Traer las propiedades del usuario
    const [propiedades, total] = await Promise.all([
      Propiedad.findAll({
        limit,
        offset,
        where: { usuarioId: id },
        include: [
          { model: Categoria, as: 'categoria' },
          { model: Precio, as: 'precio' },
          { model: Mensaje, as: 'mensajes' }
        ]
      }),
      Propiedad.count({ where: { usuarioId: id } })
    ])

    const paginas = Math.ceil(total / limit)

    res.render('propiedades/admin', {
      page: 'Mis propiedades',
      propiedades,
      paginaActual: Number(paginaActual),
      paginas,
      total,
      limit,
      offset
    })
  } catch (error) {
    console.log(error)
  }
}

// formulario Crear
export const formularioCrear = async (req, res) => {
  try {
    // Consultar categorias y precios
    const [categorias, precios] = await Promise.all([Categoria.findAll(), await Precio.findAll()])

    res.render('propiedades/propiedad-crear', {
      page: 'Crear Propiedad',
      categorias,
      precios
    })
  } catch (error) {
    console.log(error)
    res.render('propiedades/propiedad-crear', {
      page: 'Crear Propiedad'
    })
  }
}

// Crear Propiedad
export const crearPropiedad = async (req, res) => {
  try {
    // usuario del req
    const { usuario } = req

    // Validar
    await check('titulo').notEmpty({ ignore_whitespace: true }).withMessage('El titulo del anuncio es obligatorio').run(req)
    await check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('La descripción no puede ir vacia').isLength({ max: 1200 }).withMessage('La descripcion debe ser minimo 1200 caracteres').run(req)
    await check('categoria').isNumeric().withMessage('Selecciona una categoria').run(req)
    await check('precio').isNumeric().withMessage('Selecciona el precio').run(req)
    await check('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones').run(req)
    await check('establecimiento').isNumeric().withMessage('Selecciona la cantidad de establecimientos').run(req)
    await check('banos').isNumeric().withMessage('Selecciona la cantidad de baños').run(req)
    await check('calle').notEmpty().withMessage('Selecciona una ubicacion valida').run(req)
    await check('lat').notEmpty().withMessage('Ubica la propiedad en el mapa').run(req)

    // Validacion
    const errores = validationResult(req).array()

    // Consultar categorias y precios
    const [categorias, precios] = await Promise.all([Categoria.findAll(), await Precio.findAll()])

    if (errores.length > 0) {
      return res.render('propiedades/propiedad-crear', {
        page: 'Crear Propiedad',

        categorias,
        precios,
        errores,
        propiedad: req.body
      })
    }

    const { titulo, descripcion, categoria, precio, habitaciones, establecimiento, banos, calle, lat, lng } = req.body

    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      establecimiento,
      banos,
      calle,
      lat,
      lng,
      precioId: Number(categoria),
      categoriaId: Number(precio),
      usuarioId: usuario.id,
      imagen: ''
    })

    // Obtener id
    const { id } = propiedadGuardada
    res.redirect(`/propiedades/agregar-imagen/${id}`)
  } catch (error) {
    console.log(error)
    res.render('propiedades/propiedad-crear', {
      page: 'Crear Propiedad'
    })
  }
}

// formulario Agregar Imagen
export const formularioAgregarImagen = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario } = req

    // Propiedad existe
    const propiedad = await Propiedad.findByPk(id)

    // No exite
    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }

    // No este publicado
    if (propiedad.publicado) {
      return res.redirect('/mis-propiedades')
    }

    // Creado es igual al usuario
    if (propiedad.usuarioId.toString() !== usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    res.render('propiedades/agregar-imagen', {
      page: `Agregar Imagen: ${propiedad.titulo}`,
      propiedad
    })
  } catch (error) {
    console.log(error)
    res.redirect('/propiedades')
  }
}

// Almacenar Imagen
export const almacenarImagen = async (req, res, next) => {
  try {
    const { id } = req.params
    const { usuario } = req

    // Propiedad existe
    const propiedad = await Propiedad.findByPk(id)

    // No exite
    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }

    // No este publicado
    if (propiedad.publicado) {
      return res.redirect('/mis-propiedades')
    }

    // Creado es igual al usuario
    if (propiedad.usuarioId.toString() !== usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    // Almacenar la imagen
    propiedad.imagen = req.file.filename
    // Publicar la propiedad
    propiedad.publicado = true

    // Guardar
    await propiedad.save()

    next()
  } catch (error) {
    console.log(error)
    res.redirect('/mis-propiedades')
  }
}

// Formulario Editar Propiedad
export const formularioEditarPropiedad = async (req, res) => {
  try {
    const { usuario } = req
    const { id } = req.params

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }

    // Quien visita la url es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    // Consultar categorias y precios
    const [categorias, precios] = await Promise.all([Categoria.findAll(), await Precio.findAll()])

    res.render('propiedades/propiedad-editar', {
      page: `Editar Propiedad: ${propiedad.titulo}`,
      categorias,
      precios,
      propiedad
    })
  } catch (error) {
    console.log(error)
    res.redirect('/mis-propiedades')
  }
}

// Editar Propiedad
export const editarPropiedad = async (req, res) => {
  try {
    const { usuario } = req
    const { id } = req.params

    // Validar
    await check('titulo').notEmpty({ ignore_whitespace: true }).withMessage('El titulo del anuncio es obligatorio').run(req)
    await check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('La descripción no puede ir vacia').isLength({ max: 1200 }).withMessage('La descripcion debe ser minimo 1200 caracteres').run(req)
    await check('categoria').isNumeric().withMessage('Selecciona una categoria').run(req)
    await check('precio').isNumeric().withMessage('Selecciona el precio').run(req)
    await check('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones').run(req)
    await check('establecimiento').isNumeric().withMessage('Selecciona la cantidad de establecimientos').run(req)
    await check('banos').isNumeric().withMessage('Selecciona la cantidad de baños').run(req)
    await check('calle').notEmpty().withMessage('Selecciona una ubicacion valida').run(req)
    await check('lat').notEmpty().withMessage('Ubica la propiedad en el mapa').run(req)

    // Validacion
    const errores = validationResult(req).array()

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }

    // Quien visita la url es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    // Consultar categorias y precios
    const [categorias, precios] = await Promise.all([Categoria.findAll(), await Precio.findAll()])

    if (errores.length > 0) {
      return res.render('propiedades/propiedad-editar', {
        page: `Editar Propiedad: ${propiedad.titulo}`,
        categorias,
        precios,
        errores,
        propiedad: req.body
      })
    }

    // Actualizar datos
    const { titulo, descripcion, categoria, precio, habitaciones, establecimiento, banos, calle, lat, lng } = req.body

    propiedad.set({
      titulo,
      descripcion,
      habitaciones,
      establecimiento,
      banos,
      calle,
      lat,
      lng,
      categoriaId: Number(categoria),
      precioId: Number(precio),
      usuarioId: usuario.id
    })

    // Guardar
    await propiedad.save()

    res.redirect(`/mis-propiedades`)
  } catch (error) {
    console.log(error)
    res.redirect('/mis-propiedades')
  }
}

// Eliminar Propiedad
export const eliminarPropiedad = async (req, res) => {
  try {
    const { usuario } = req
    const { id } = req.params

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }

    // Quien visita la url es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    // Eliminar imagen
    await unlink(`public/uploads/${propiedad.imagen}`)

    // Eliminar la propiedad
    await propiedad.destroy()

    res.redirect('/mis-propiedades')
  } catch (error) {
    console.log(error)
    res.redirect('/mis-propiedades')
  }
}

// Mostrar propiedad
export const mostrarPropiedad = async (req, res) => {
  try {
    const { id } = req.params
    const { enviado } = req.query
    const { usuario } = req

    // Obtener propiedad
    const propiedad = await Propiedad.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'categoria'
        },
        {
          model: Precio,
          as: 'precio'
        }
      ]
    })

    // No existe propiedad
    if (!propiedad || !propiedad.publicado) {
      return res.redirect('/404')
    }
    // Es vendedor
    const isVendedor = usuario?.id?.toString() === propiedad?.usuarioId?.toString()

    // Renderizar
    res.render('propiedades/propiedad', { page: `Propiedad: ${propiedad.titulo}`, propiedad, usuario, isVendedor, enviado: enviado === 'true' })
  } catch (error) {
    console.log(error)
    res.redirect('/mis-propiedades')
  }
}

// Enviar Mensaje
export const enviarMensaje = async (req, res) => {
  try {
    const { id } = req.params

    const { usuario } = req

    // Obtener propiedad
    const propiedad = await Propiedad.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'categoria'
        },
        {
          model: Precio,
          as: 'precio'
        }
      ]
    })

    // No existe propiedad
    if (!propiedad) {
      return res.redirect('/404')
    }

    // Validar
    await check('mensaje').notEmpty({ ignore_whitespace: true }).withMessage('El mensaje es requerido').isLength({ min: 6 }).withMessage('El mensaje debe ser mayor a 6 caracteres').run(req)

    // Errores
    const errores = validationResult(req).array()

    // Es vendedor
    const isVendedor = usuario?.id?.toString() === propiedad?.usuarioId?.toString()

    // Almacena el mensaje
    if (!isVendedor && usuario && errores.length === 0) {
      const { mensaje } = req.body

      await Mensaje.create({
        mensaje,
        propiedadId: id,
        usuarioId: usuario.id
      })

      // Rendireccionar
      return res.redirect(`/propiedad/${id}?enviado=true`)
    }

    // Renderizar
    res.render('propiedades/propiedad', { page: `Propiedad: ${propiedad.titulo}`, propiedad, usuario, isVendedor, errores })
  } catch (error) {
    console.log(error)
    res.redirect('/mis-propiedades')
  }
}

// Mostrar Mensajes
export const mostrarMensajes = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario } = req

    // obtener la propiedad
    const propiedad = await Propiedad.findByPk(id, {
      include: [{ model: Mensaje, as: 'mensajes', include: [{ model: Usuario.scope('eliminarAtributos'), as: 'usuario' }] }]
    })

    // Si no hay propiedad
    if (!propiedad) {
      return res.redirect('/404')
    }

    // Verificar el usuario
    if (usuario.id.toString() !== propiedad.usuarioId.toString()) {
      return res.redirect('/404')
    }

    // renderizar
    res.render('propiedades/mensajes', { page: `Mensajes: ${propiedad.titulo} (${propiedad.mensajes.length})`, mensajes: propiedad.mensajes, formatearFecha })
  } catch (error) {
    console.log(error)
    res.redirect('/404')
  }
}

// cambiar Estado
export const cambiarEstado = async (req, res) => {
  try {
    const { usuario } = req
    const { id } = req.params

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }

    // Quien visita la url es quien creo la propiedad
    if (propiedad.usuarioId.toString() !== usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    // Cambiar el publicado
    propiedad.publicado = !propiedad.publicado

    // Guardar
    await propiedad.save()

    res.json({
      ok: true
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
