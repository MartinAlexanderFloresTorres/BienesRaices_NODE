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

/***/ "./src/js/mostrarCategorias.js":
/*!*************************************!*\
  !*** ./src/js/mostrarCategorias.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n;(() => {\r\n  const contenedor = document.querySelector('#header-categorias')\r\n\r\n  // obtener categorias\r\n  const obtenerCategorias = async () => {\r\n    try {\r\n      const responde = await fetch('/api/categorias')\r\n      const categorias = await responde.json()\r\n      mostrarCategorias(categorias)\r\n    } catch (error) {\r\n      console.log(error)\r\n    }\r\n  }\r\n  obtenerCategorias()\r\n\r\n  const mostrarCategorias = (categorias) => {\r\n    categorias.forEach((categoria) => {\r\n      const enlace = document.createElement('A')\r\n      enlace.href = `/categorias/${categoria.id}`\r\n      enlace.textContent = categoria.nombre\r\n      enlace.className = 'text-sm font-bold uppercase text-white'\r\n      contenedor.appendChild(enlace)\r\n    })\r\n  }\r\n})()\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mostrarCategorias.js?");

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
/******/ 	__webpack_modules__["./src/js/mostrarCategorias.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;