import { Propiedad, Precio, Categoria } from '../models/index.js'

// propiedades
export const propiedades = async (req, res) => {
  try {
    const propiedades = await Propiedad.findAll({
      include: [
        { model: Precio, as: 'precio' },
        { model: Categoria, as: 'categoria' }
      ],
      where: {
        publicado: true
      }
    })

    res.json(propiedades)
  } catch (error) {
    console.log(error)
    res.status(404)
  }
}

// categorias
export const categorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ raw: true })
    res.json(categorias)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
