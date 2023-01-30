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

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n;(() => {\r\n  const botones = document.querySelectorAll('#cambiar-estado-btn')\r\n\r\n  botones.forEach((boton) => {\r\n    boton.addEventListener('click', async (e) => {\r\n      const { id } = e.target.dataset\r\n\r\n      try {\r\n        const results = await fetch(`/propiedades/estado/${id}`, {\r\n          method: 'PUT'\r\n        })\r\n        const { ok } = await results.json()\r\n        if (ok) {\r\n          if (boton.classList.contains('bg-green-100')) {\r\n            boton.classList.remove('bg-green-100', 'text-green-800', 'hover:bg-green-200')\r\n            boton.classList.add('bg-yellow-100', 'text-yellow-800', 'hover:bg-yellow-200')\r\n            boton.textContent = 'No publicado'\r\n          } else {\r\n            boton.classList.remove('bg-yellow-100', 'text-yellow-800', 'hover:bg-yellow-200')\r\n            boton.classList.add('bg-green-100', 'text-green-800', 'hover:bg-green-200')\r\n            boton.textContent = 'Publicado'\r\n          }\r\n        }\r\n      } catch (error) {\r\n        console.log(error)\r\n      }\r\n    })\r\n  })\r\n})()\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/cambiarEstado.js?");

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
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;