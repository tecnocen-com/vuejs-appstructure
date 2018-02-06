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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


BUTO.template = __webpack_require__(5);
BUTO.modules = {
  modelAR: __webpack_require__(10)
};

axios.get("/init-user-data").then(function (userResponse) {
  if (userResponse.status === 200 && userResponse.data.success) (function () {
    new BUTO.modules.modelAR({
      baseURL: userResponse.data.baseURL,
      dataURL: userResponse.data.dataURL,
      token: userResponse.data.access_token
    }, function (dataCreator) {
      BUTO.components = {
        main: new Vue({
          el: "#home",
          template: BUTO.template.home,
          data: {
            profile: {
              name: "Unknown",
              email: null
            },
            models: {
              profile: new dataCreator("profile")
            }
          },
          components: {
            "loader": __webpack_require__(14),
            "confirm": __webpack_require__(16),
            "alert": __webpack_require__(18),
            "heading": __webpack_require__(20),
            "my-menu": __webpack_require__(22),
            "breadcrumb": __webpack_require__(24),
            "foot": __webpack_require__(26)
          },
          router: new VueRouter({
            routes: [{
              title: "Inicio",
              path: "/",
              component: BUTO.template.dashboard
            }, {
              title: "Test",
              path: "/test",
              component: BUTO.template.test
            }]
          }),
          created: function created() {
            var me = this;
            this.models.profile.get({}, function (success) {
              me.profile.name = success.data.username;
              me.profile.email = success.data.email;
            }, function (error) {
              console.log(error);
              window.location = "/logout";
            });
          },
          mounted: function mounted() {}
        })
      };
    }, function (error) {
      console.log(error);
    });
  })();else window.location = "/logout";
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  dashboard: __webpack_require__(6),
  test: __webpack_require__(8),

  home: "\n    <div>\n      <transition name=\"slide-fade\">\n        <loader></loader>\n      </transition>\n      <transition name=\"slide-fade\">\n        <confirm></confirm>\n      </transition>\n      <transition name=\"slide-fade\">\n        <alert></alert>\n      </transition>\n      \n      <heading :profile=\"profile\"></heading>\n      \n      <my-menu></my-menu>\n      \n      <breadcrumb></breadcrumb>\n      \n      <transition name=\"slide-fade\">\n        <router-view></router-view>\n      </transition>\n      \n      <foot></foot>\n    </div>\n  "
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(7),
  props: {
    myProp: Number
  },
  data: function data() {
    return {
      title: "Dashboard",
      time: 0
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {
    var me = this;
    setInterval(function () {
      return ++me.time;
    }, 1000);
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <h1>{{ title }}</h1>\n    <p>{{ time }}</p>\n  </div>\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(9),
  props: {
    myProp: Number
  },
  data: function data() {
    return {
      title: "Test",
      value: 0
    };
  },
  computed: {
    square: function square() {
      return this.value * this.value;
    }
  },
  methods: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {
    var me = this;
    setInterval(function () {
      return ++me.time;
    }, 1000);
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <h1>{{ title }}</h1>\n    <div>\n      <input v-model=\"value\" type=\"number\">\n      <span>Valor al cuadrado: {{ square }}</span>\n    </div>\n  </div>\n";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

///////////////////////////////////USE EXAMPLES/////////////////////////////////
//me.models.form.post({
//  params: {
//    name: "My new form"
//  }
//},
//function(success){
//  console.log("POST", success);
//},
//function(error){
//  console.log(error);
//});
//
//me.models.form.patch({
//  delimiters: 6,
//  params: {
//    name: "My edited test form"
//  }
//},
//function(success){
//  console.log("PATCH", success);
//},
//function(error){
//  console.log(error);
//});
//
//me.models.form.remove({
//  delimiters: 6,
//  params: {}
//},
//function(success){
//  console.log("REMOVE", success);
//},
//function(error){
//  console.log(error);
//});
//
//me.models.form.get({},
//function(success){
//  console.log("GET", success);
//},
//function(error){
//  console.log(error);
//});
////////////////////////////////////////////////////////////////////
var querystring = __webpack_require__(11);
module.exports = function (init, activity, activityError) {
  var me = this;

  this.config = init;
  this.initRequest = function (initResponse) {
    this.create = function (name) {
      this.init = {
        get: function get(getData, getSuccess, getError) {
          var lastURL = '',
              localStatus = [true, 200],
              index = 0;
          switch (typeof name === 'undefined' ? 'undefined' : _typeof(name)) {
            case 'object':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (name.length === getData.delimiters.length || name.length - 1 === getData.delimiters.length) {
                    for (; index < name.length; index++) {
                      lastURL += name[index];
                      lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  if (name.length <= 2) {
                    for (index = 0; index < name.length; index++) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'string':
                  if (name.length <= 2) {
                    for (index = 0; index < name.length; index++) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'undefined':
                  if (name.length === 1) lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'string':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (; index < getData.delimiters.length; index++) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (; index < getData.delimiters.length; index++) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if (localStatus[0] && localStatus[1] === 200) {
            if (_typeof(getData.params) === "object" && !getData.params.length) axios.get(me.config.baseURL + me.config.dataURL + lastURL, { params: querystring.stringify(getData.params) }).then(getSuccess).catch(getError);else axios.get(me.config.baseURL + me.config.dataURL + lastURL).then(getSuccess).catch(getError);
          } else {
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".',
                objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch (localStatus[1]) {
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:
            }
            console.error(error);
            getError(objectError);
          }
        },
        post: function post(getData, getSuccess, getError) {
          var lastURL = '',
              localStatus = [true, 200],
              index = null;
          switch (typeof name === 'undefined' ? 'undefined' : _typeof(name)) {
            case 'object':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (name.length === getData.delimiters.length || name.length - 1 === getData.delimiters.length) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  if (name.length <= 2) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'string':
                  if (name.length <= 2) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'undefined':
                  if (name.length === 1) lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'string':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (index in getData.delimiters) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (index in getData.delimiters) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if (localStatus[0] && localStatus[1] === 200) {
            if (_typeof(getData.params) === "object" && !getData.params.length) axios.post(me.config.baseURL + me.config.dataURL + lastURL, querystring.stringify(getData.params)).then(getSuccess).catch(getError);else {
              var paramsError = ' Code: 400-4. incorrect way of initialization of "params".',
                  paramsObjectError = {
                message: 'Incorrect way of initialization of object names creation or "delimiters".',
                code: '400-4',
                toCheck: 'Incorrect way of initialization of "params".'
              };
              console.error(paramsError);
              getError(paramsObjectError);
            }
          } else {
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".';
            var objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch (localStatus[1]) {
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:

            }
            console.error(error);
            getError(objectError);
          }
        },
        patch: function patch(getData, getSuccess, getError) {
          var lastURL = '',
              localStatus = [true, 200],
              index = null;
          switch (typeof name === 'undefined' ? 'undefined' : _typeof(name)) {
            case 'object':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (name.length === getData.delimiters.length || name.length - 1 === getData.delimiters.length) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  if (name.length <= 2) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'string':
                  if (name.length <= 2) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'undefined':
                  if (name.length === 1) lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'string':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (index in getData.delimiters) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (index in getData.delimiters) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if (localStatus[0] && localStatus[1] === 200) {
            if (_typeof(getData.params) === "object" && !getData.params.length) axios.patch(me.config.baseURL + me.config.dataURL + lastURL, querystring.stringify(getData.params)).then(getSuccess).catch(getError);else {
              var paramsError = ' Code: 400-4. incorrect way of initialization of "params".',
                  paramsObjectError = {
                message: 'Incorrect way of initialization of object names creation or "delimiters".',
                code: '400-4',
                toCheck: 'Incorrect way of initialization of "params".'
              };
              console.error(paramsError);
              getError(paramsObjectError);
            }
          } else {
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".';
            var objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch (localStatus[1]) {
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:

            }
            console.error(error);
            getError(objectError);
          }
        },
        remove: function remove(getData, getSuccess, getError) {
          var lastURL = '',
              localStatus = [true, 200],
              index = null;
          switch (typeof name === 'undefined' ? 'undefined' : _typeof(name)) {
            case 'object':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (name.length === getData.delimiters.length || name.length - 1 === getData.delimiters.length) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  if (name.length <= 2) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'string':
                  if (name.length <= 2) {
                    for (index in name) {
                      lastURL += name[index];
                      lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                      lastURL += parseInt(index) < name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'undefined':
                  if (name.length === 1) lastURL += name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
                  break;
                default:
                  localStatus = [false, 2];

                  break;
              }
              break;
            case 'string':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (index in getData.delimiters) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            case 'number':
              switch (_typeof(getData.delimiters)) {
                case 'object':
                  if (getData.delimiters.length === 1) {
                    for (index in getData.delimiters) {
                      lastURL += name;
                      lastURL += '/' + getData.delimiters[index];
                      lastURL += '?accessToken=' + initResponse.body.access_token;
                    }
                  } else localStatus = [false, 1];
                  break;
                case 'number':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'string':
                  lastURL += name + '/' + getData.delimiters;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                case 'undefined':
                  lastURL += name;
                  lastURL += '?accessToken=' + initResponse.body.access_token;
                  break;
                default:
                  localStatus = [false, 2];
                  break;
              }
              break;
            default:
              localStatus = [false, 3];
              break;
          }
          if (localStatus[0] && localStatus[1] === 200) {
            if (_typeof(getData.params) === "object" && !getData.params.length) axios.delete(me.config.baseURL + me.config.dataURL + lastURL, { params: querystring.stringify(getData.params) }).then(getSuccess).catch(getError);else axios.delete(me.config.baseURL + me.config.dataURL + lastURL).then(getSuccess).catch(getError);
          } else {
            var error = 'ERROR: Incorrect way of initialization of object names creation or "delimiters".';
            var objectError = {
              message: 'Incorrect way of initialization of object names creation or "delimiters".'
            };
            switch (localStatus[1]) {
              case 1:
                error += ' Code: 400-' + localStatus[1] + '. incorrect way of initialization of relation between object names creation and "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect way of initialization of relation between object names creation and "delimiters".';
                break;
              case 2:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of "delimiters".';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of "delimiters".';
                break;
              case 3:
                error += ' Code: 400-' + localStatus[1] + '. incorrect type of object names.';
                objectError.code = '400-' + localStatus[1];
                objectError.toCheck = 'Incorrect type of object names.';
                break;
              default:
            }
            console.error(error);
            getError(objectError);
          }
        }
      };
      return this.init;
    };
    return this.create;
  };

  this.config.getToken = {
    initToken: function initToken() {
      var autoResponse = {};
      if (typeof me.config.token === "string") {
        autoResponse.body = {
          access_token: me.config.token
        };
        me.config.getToken.tokenResponse.success(autoResponse);
      }
    },
    tokenResponse: {
      success: function success(response) {
        activity(me.initRequest(response));
      },
      error: function error(response) {
        activityError(response);
      }
    }
  };

  this.config.getToken.initToken();
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(12);
exports.encode = exports.stringify = __webpack_require__(13);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(15),
  props: {},
  data: function data() {
    return {
      active: false,
      message: "Cargando"
    };
  },
  computed: {},
  methods: {
    loading: function loading() {
      this.active = true;
    },
    loaded: function loaded() {
      this.active = false;
    }
  },
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"active\">\n    <b>{{ message }}</b>\n  </div>\n";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(17),
  props: {},
  data: function data() {
    return {
      description: {
        title: "",
        text: "",
        accept: "",
        cancel: ""
      },
      active: false
    };
  },
  computed: {},
  methods: {
    onAccept: function onAccept() {}
  },
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"active\">\n    <div>\n      <h3>{{ description.title }}</h3>\n    </div>\n    <p><b v-html=\"description.text\"></b></p>\n    <div>\n      <a href=\"#\" v-on:click.prevent=\"onAccept()\"><span>{{ description.accept }}</span></a>\n      <a href=\"#\" v-on:click.prevent=\"active = !active\"><span>{{ description.cancel }}</span></a>\n    </div>\n  </div>\n";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(19),
  props: {},
  data: function data() {
    return {
      description: {
        title: "",
        text: "",
        ok: ""
      },
      active: false
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"active\">\n    <div>\n        <h3>{{ description.title }}</h3>\n    </div>\n    <p><b v-html=\"description.text\"></b></p>\n    <div>\n        <a href=\"#\" v-on:click.prevent=\"active = !active\"><span>{{ description.ok }}</span></a>\n    </div>\n  </div>\n";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(21),
  props: {
    profile: Object
  },
  data: function data() {
    return {
      active: true
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <a><span>{{ profile.name }}</span></a>\n    <a href=\"/logout\"><i></i> Cerrar Sesi\xF3n </a>\n  </div>\n";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(23),
  props: {},
  data: function data() {
    return {
      menu: [{
        title: "Inicio",
        path: "/"
      }, {
        title: "Test",
        path: "/test"
      }]
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <ul v-for=\"(menu, menuIndex) in menu\">\n      <li><router-link :to=\"menu.path\">{{ menu.title }}</router-link></li>\n    </ul>\n  </div>\n";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(25),
  props: {},
  data: function data() {
    return {
      home: "Inicio"
    };
  },
  computed: {
    path: function path() {
      return this.$route.fullPath.split("/");
    }
  },
  methods: {},
  beforeCreate: function beforeCreate() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <div>\n      <div>\n        <h4><b>Breadcrumb</b></h4>\n        <ul>\n          <li>{{ home }}</li>\n          <li v-for=\"p in path\" v-if=\"p !== ''\">{{ p }}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(27),
  props: {},
  data: function data() {
    return {
      year: 2018
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n    <div>\n      &copy; {{ year }}. <a href=\"#\" v-on:click.prevent>Tecnocen</a>\n    </div>\n";

/***/ })
/******/ ]);