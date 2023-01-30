import { Op } from 'sequelize'
import { Propiedad, Precio, Categoria } from '../models/index.js'

// Inicio
export const inicio = async (req, res) => {
  try {
    const { usuario } = req
    const [categorias, precios, casas, departamentos] = await Promise.all([Categoria.findAll({ raw: true }), Precio.findAll({ raw: true }), Propiedad.findAll({ where: { categoriaId: 1, publicado: true }, limit: 3, include: [{ model: Precio, as: 'precio' }], order: [['createdAt', 'DESC']] }), Propiedad.findAll({ where: { categoriaId: 2, publicado: true }, limit: 3, include: [{ model: Precio, as: 'precio' }], order: [['createdAt', 'DESC']] })])

    res.render('inicio', {
      page: 'Bienvenido',
      categorias,
      precios,
      casas,
      departamentos,
      usuario
    })
  } catch (error) {
    console.log(error)
    res.redirect('back')
  }
}

// Categoria
export const categoria = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario } = req
    const categoria = await Categoria.findByPk(id)

    // No existe la categoria
    if (!categoria) {
      return res.redirect('/404')
    }

    // obtener las propiedades de esa categoria
    const propiedades = await Propiedad.findAll({
      where: { categoriaId: id },
      include: [
        { model: Categoria, as: 'categoria' },
        { model: Precio, as: 'precio' }
      ]
    })

    res.render('categoria', {
      page: `${categoria.nombre} en Venta`,
      propiedades,
      usuario
    })
  } catch (error) {
    console.log(error)
    res.redirect('back')
  }
}

// NotFound
export const notFound = (req, res) => {
  const { usuario } = req

  res.render('404', {
    page: 'No encontrado',
    usuario
  })
}

// Buscador
export const buscador = async (req, res) => {
  try {
    const { q } = req.query
    const { usuario } = req

    // esta vacio
    if (!q) return res.redirect('back')
    if (!q.trim()) return res.redirect('back')

    // consultar propiedades
    const propiedades = await Propiedad.findAll({
      where: {
        // buscar por titulo y descripcion o calle
        [Op.or]: [{ titulo: { [Op.like]: `%${q}%` } }, { descripcion: { [Op.like]: `%${q}%` } }, { calle: { [Op.like]: `%${q}%` } }]
      },
      include: [
        { model: Categoria, as: 'categoria' },
        { model: Precio, as: 'precio' }
      ]
    })

    res.render('busqueda', {
      page: `Resultados de la Búsquedad: ${q}`,
      propiedades,
      usuario
    })
  } catch (error) {
    console.log(error)
    res.redirect('back')
  }
}
