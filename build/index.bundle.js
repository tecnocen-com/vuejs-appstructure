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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


BUTO.template = __webpack_require__(1);
BUTO.component = new Vue({
  el: "#index",
  template: BUTO.template.index,
  data: {
    hidden: true,
    error: 0,
    mainMessage: {
      title: "Bienvenido",
      subtitle: "Ingrese a su cuenta"
    },
    user: {
      data: "",
      label: "Usuario"
    },
    password: {
      data: "",
      label: "Contraseña"
    },
    alert: {
      hidden: true,
      message: ""
    },
    button: {
      loading: false,
      login: {
        message: "Continuar"
      },
      forgotten: {
        message: "¿Olvidaste tu contraseña?"
      }
    }
  },
  methods: {
    login: function login() {
      var me = this,
          validator;
      this.button.loading = true;
      validator = this.user.data === "" ? 0 : this.password.data === "" ? 1 : 2;
      switch (validator) {
        case 0:
          this.button.loading = false;
          this.error = 0;
          this.alert.hidden = false;
          this.alert.message = "Error, se requiere un nombre de usuario.";
          setTimeout(function () {
            me.alert.hidden = true;
          }, 1500);
          break;
        case 1:
          this.button.loading = false;
          this.error = 1;
          this.alert.hidden = false;
          this.alert.message = "Error, se requiere una contraseña.";
          setTimeout(function () {
            me.alert.hidden = true;
          }, 1500);
          break;
        default:
          axios.post("/login", {
            user: this.user.data,
            pass: this.password.data
          }).then(function (response) {
            if (response.status === 200 && response.data.status !== 401) {
              window.location = "/";
            } else {
              me.alert.message = "Error, nombre de usuario y/o contraseña inválidos.";
              me.alert.hidden = false;
              me.error = 2;
              me.button.loading = false;
              setTimeout(function () {
                me.alert.hidden = true;
              }, 1500);
            }
          });
          break;
      }
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.hidden = false;
    this.$refs.username.autofocus = true;
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  index: "\n    <div>\n      <form v-on:submit.prevent action=\"#\" method=\"POST\">\n        <div>\n          <h1>{{ mainMessage.title }}</h1>\n          <h4>{{ mainMessage.subtitle }}</h4>\n        </div>\n        <div>\n          <div>\n            <label>{{ user.label }}:</label>\n            <input\n            v-on:keydown.space.prevent\n            v-on:keydown.enter=\"login()\"\n            v-model=\"user.data\"\n            :class=\"!alert.hidden && error !== 0 ? 'wrong-input' : ''\"\n            ref=\"username\"\n            name=\"username\"\n            maxlength=\"64\"\n            type=\"text\">\n          </div>\n          <div>\n            <label>{{ password.label }}:</label>\n            <input\n            v-on:keydown.space.prevent\n            v-on:keydown.enter=\"login()\"\n            v-model=\"password.data\"\n            :class=\"!alert.hidden && error !== 0 ? 'wrong-input' : ''\"\n            ref=\"password\"\n            name=\"password\"\n            maxlength=\"64\"\n            type=\"password\">\n          </div>\n        </div>\n        <div v-if=\"!alert.hidden\">\n          <p><b>{{ alert.message }}</b></p>\n        </div>\n        <div>\n          <button\n          v-on:click=\"login()\"\n          :class=\"button.loading ? 'disabled' : ''\"\n          type=\"submit\">\n            <b>{{ button.login.message }}</b>\n          </button>\n        </div>\n      </form>\n      <div>\n        <button\n        v.on:click.prevent\n        :class=\"button.loading ? 'disabled' : ''\"\n        href=\"#\">\n          {{ button.forgotten.message }}\n        </button>\n      </div>\n    </div>\n  "
};

/***/ })
/******/ ]);