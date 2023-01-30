import multer from 'multer'
import path from 'path'
import { generarId } from '../helpers/tokens.js'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/')
  },
  filename: function (req, file, callback) {
    callback(null, generarId() + path.extname(file.originalname))
  }
})

const subirImagen = multer({ storage })

export default subirImagen
