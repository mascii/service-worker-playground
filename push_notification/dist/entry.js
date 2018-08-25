/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ServiceWorker;
function ServiceWorker() {
  if ('serviceWorker' in navigator) {
    var _navigator$serviceWor;

    return (_navigator$serviceWor = navigator.serviceWorker).register.apply(_navigator$serviceWor, arguments);
  }
  return Promise.reject("Sorry, your browser doesn't support Service Worker.");
}

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_service_worker__ = __webpack_require__(0);


var subscriptionContent = document.querySelector('#subscription');
var notificationCommand = document.querySelector('#notification-command');

var urlBase64ToUint8Array = function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }return outputArray;
};

var arrayBufferToBase64 = function arrayBufferToBase64(buf) {
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_');
};

new __WEBPACK_IMPORTED_MODULE_0__lib_service_worker__["a" /* default */]('/push_notification/worker-compiled.js', { scope: '/push_notification/' }).then(function (worker) {
  worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(undefined)
  }).then(function (subscription) {
    subscriptionContent.textContent = 'Notification is subscribing now. You can send notification with below:';
    notificationCommand.style.display = 'block';

    notificationCommand.value = 'yarn webpush -- \\\n        --endpoint ' + subscription.endpoint + ' \\\n        --auth ' + arrayBufferToBase64(subscription.getKey('auth')) + ' \\\n        --p256dh ' + arrayBufferToBase64(subscription.getKey('p256dh')) + ' \\\n        --payload \'Test notification!!\'';
  }).catch(function (e) {
    subscriptionContent.textContent = 'Not subscribed (' + e + ')';
  });
}).catch(function (message) {
  return alert(message);
});

/***/ })

/******/ });