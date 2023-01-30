import { Dropzone } from 'dropzone'

Dropzone.options.dropzoneimagen = {
  dictDefaultMessage: 'Sube tus imagenes aqui',
  acceptedFiles: 'image/png,image/jpg,image/jpeg,image/webp',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Quitar',
  dictMaxFilesExceeded: 'El limite es 1 archivo',
  paramName: 'imagen',
  init: function () {
    const dropzone = this
    const botonPublicar = document.querySelector('#publicar')

    botonPublicar.addEventListener('click', function () {
      dropzone.processQueue()
    })

    dropzone.on('queuecomplete', function () {
      if (dropzone.getActiveFiles().length == 0) {
        window.location.href = '/mis-propiedades'
      }
    })
  }
}
