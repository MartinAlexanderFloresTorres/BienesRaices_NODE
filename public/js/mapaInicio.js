/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n;(() => {\r\n  const lat = -5.1787499\r\n  const lng = -80.6539404\r\n  const mapa = L.map('mapa-inicio').setView([lat, lng], 13)\r\n\r\n  const categoriaSelect = document.querySelector('#categorias')\r\n  const precioSelect = document.querySelector('#precios')\r\n\r\n  let markers = new L.FeatureGroup().addTo(mapa)\r\n\r\n  let propiedades = []\r\n\r\n  // Filtros\r\n  const filtros = {\r\n    categoria: '',\r\n    precio: ''\r\n  }\r\n\r\n  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n    attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n  }).addTo(mapa)\r\n\r\n  // Eventos de filtrados\r\n  categoriaSelect.addEventListener('change', (e) => {\r\n    filtros.categoria = Number(e.target.value)\r\n    filtarPropiedades()\r\n  })\r\n  precioSelect.addEventListener('change', (e) => {\r\n    filtros.precio = Number(e.target.value)\r\n    filtarPropiedades()\r\n  })\r\n\r\n  const filtarPropiedades = () => {\r\n    const filtarCategoria = (p) => {\r\n      const { precioId } = p\r\n      return filtros.precio ? precioId === filtros.precio : p\r\n    }\r\n    const filtrarPrecio = (p) => {\r\n      const { categoriaId } = p\r\n      return filtros.categoria ? categoriaId === filtros.categoria : p\r\n    }\r\n    const filtrados = propiedades.filter(filtarCategoria).filter(filtrarPrecio)\r\n\r\n    // Limpiar los markers previos\r\n    markers.clearLayers()\r\n\r\n    mostrarPropiedades(filtrados)\r\n  }\r\n\r\n  const obtenerPropiedades = async () => {\r\n    try {\r\n      const resultados = await fetch('/api/propiedades')\r\n      propiedades = await resultados.json()\r\n      mostrarPropiedades(propiedades)\r\n    } catch (error) {\r\n      console.log(error)\r\n    }\r\n  }\r\n  obtenerPropiedades()\r\n\r\n  const mostrarPropiedades = (propiedades) => {\r\n    propiedades.forEach((propiedad) => {\r\n      // Agregar los pines\r\n      const { id, lat, lng, calle, titulo, imagen, descripcion, precio, categoria } = propiedad\r\n\r\n      const marker = new L.marker([Number(lat), Number(lng)], {\r\n        autoPan: true\r\n      }).addTo(mapa).bindPopup(`\r\n          <div>\r\n            <span class=\"text-sm font-bold text-indigo-500\">\r\n            ${categoria.nombre} \r\n            </span> \r\n            <span class=\"text-gray-400\">${calle}</span>\r\n          </div>\r\n     \r\n          <h1 class=\"text-xl font-extrabold uppercase my-5\">${titulo}</h1>\r\n          <img class=\"block\" src=\"/uploads/${imagen}\" alt=\"Imangen propiedad ${titulo}\">\r\n          <p class=\"text-sm font-bold text-green-600\">${precio.nombre}</p>\r\n          <p class=\"text-sm font-bold text-gray-600\">${descripcion}</p>\r\n          <a href=\"/propiedad/${id}\" target=\"_blank\" class=\"block w-full py-3 px-2 font-bold uppercase bg-indigo-700 text-white text-center rounded-md hover:bg-indigo-800 transition-all cursor-pointer border border-indigo-500\"><span class=\"text-white\">Ver Propiedad</span></a>\r\n        `)\r\n\r\n      markers.addLayer(marker)\r\n    })\r\n  }\r\n})()\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;