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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


BUTO.template = __webpack_require__(3);
BUTO.modules = {
  modelAR: __webpack_require__(8)
};

Vue.http.get("/init-user-data").then(function (userResponse) {
  if (userResponse.status === 200 && userResponse.body.success) (function () {
    new BUTO.modules.modelAR({
      baseURL: userResponse.body.baseURL,
      dataURL: userResponse.body.dataURL,
      token: userResponse.body.access_token
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
            "loader": __webpack_require__(9),
            "confirm": __webpack_require__(11),
            "alert": __webpack_require__(13),
            "heading": __webpack_require__(15),
            "my-menu": __webpack_require__(17),
            "breadcrumb": __webpack_require__(19),
            "foot": __webpack_require__(21)
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
              me.profile.name = success.body.username;
              me.profile.email = success.body.email;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  dashboard: __webpack_require__(4),
  test: __webpack_require__(6),

  home: "\n    <div>\n      <transition name=\"slide-fade\">\n        <loader></loader>\n      </transition>\n      <transition name=\"slide-fade\">\n        <confirm></confirm>\n      </transition>\n      <transition name=\"slide-fade\">\n        <alert></alert>\n      </transition>\n      \n      <heading :profile=\"profile\"></heading>\n      \n      <my-menu></my-menu>\n      \n      <breadcrumb></breadcrumb>\n      \n      <transition name=\"slide-fade\">\n        <router-view></router-view>\n      </transition>\n      \n      <foot></foot>\n    </div>\n  "
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(5),
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <h1>{{title}}</h1>\n    <p>{{time}}</p>\n  </div>\n";

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <h1>{{title}}</h1>\n    <div>\n      <input v-model=\"value\" type=\"number\">\n      <span>Valor al cuadrado: {{square}}</span>\n    </div>\n  </div>\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (init, activity, activityError) {
  var me = this;

  this.config = init;

  this.initRequest = function (initResponse) {

    this.create = function (name) {

      this.init = new Vue({
        data: {
          name: name
        },
        methods: {
          get: function get(getData, getSuccess, getError) {
            var meInit = this,
                lastURL = '',
                localStatus = [true, 200],
                index = null;
            switch (_typeof(meInit.name)) {
              case 'object':
                switch (_typeof(getData.delimiters)) {
                  case 'object':
                    if (meInit.name.length === getData.delimiters.length || meInit.name.length - 1 === getData.delimiters.length) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'string':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'undefined':
                    if (meInit.name.length === 1) lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
              if (_typeof(getData.params) === "object" && !getData.params.length) this.$http.get(me.config.baseURL + me.config.dataURL + lastURL, {
                params: getData.params
              }).then(getSuccess, getError);else this.$http.get(me.config.baseURL + me.config.dataURL + lastURL).then(getSuccess, getError);

              //var anHttpRequest = new XMLHttpRequest();
              //anHttpRequest.onreadystatechange = function() { 
              //    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
              //        getSuccess(anHttpRequest);
              //};
              //anHttpRequest.open( "GET", me.config.baseURL + me.config.dataURL + lastURL, true );
              //anHttpRequest.send( 200 );
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
            var meInit = this,
                lastURL = '',
                localStatus = [true, 200],
                index = null;
            switch (_typeof(meInit.name)) {
              case 'object':
                switch (_typeof(getData.delimiters)) {
                  case 'object':
                    if (meInit.name.length === getData.delimiters.length || meInit.name.length - 1 === getData.delimiters.length) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'string':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'undefined':
                    if (meInit.name.length === 1) lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
              if (_typeof(getData.params) === "object" && !getData.params.length) this.$http.post(me.config.baseURL + me.config.dataURL + lastURL, getData.params, {
                emulateJSON: true
              }).then(getSuccess, getError);else {
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
            var meInit = this,
                lastURL = '',
                localStatus = [true, 200],
                index = null;
            switch (_typeof(meInit.name)) {
              case 'object':
                switch (_typeof(getData.delimiters)) {
                  case 'object':
                    if (meInit.name.length === getData.delimiters.length || meInit.name.length - 1 === getData.delimiters.length) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'string':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'undefined':
                    if (meInit.name.length === 1) lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
              if (_typeof(getData.params) === "object" && !getData.params.length) this.$http.patch(me.config.baseURL + me.config.dataURL + lastURL, getData.params, {
                emulateJSON: true
              }).then(getSuccess, getError);else {
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
            var meInit = this,
                lastURL = '',
                localStatus = [true, 200],
                index = null;
            switch (_typeof(meInit.name)) {
              case 'object':
                switch (_typeof(getData.delimiters)) {
                  case 'object':
                    if (meInit.name.length === getData.delimiters.length || meInit.name.length - 1 === getData.delimiters.length) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += getData.delimiters[index] ? '/' + getData.delimiters[index] : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'string':
                    if (meInit.name.length <= 2) {
                      for (index in meInit.name) {
                        lastURL += meInit.name[index];
                        lastURL += parseInt(index) === 0 ? '/' + getData.delimiters : '';
                        lastURL += parseInt(index) < meInit.name.length - 1 ? '/' : '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'undefined':
                    if (meInit.name.length === 1) lastURL += meInit.name[0] + '?accessToken=' + initResponse.body.access_token;else localStatus = [false, 1];
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
                        lastURL += meInit.name;
                        lastURL += '/' + getData.delimiters[index];
                        lastURL += '?accessToken=' + initResponse.body.access_token;
                      }
                    } else localStatus = [false, 1];
                    break;
                  case 'number':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'string':
                    lastURL += meInit.name + '/' + getData.delimiters;
                    lastURL += '?accessToken=' + initResponse.body.access_token;
                    break;
                  case 'undefined':
                    lastURL += meInit.name;
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
              if (_typeof(getData.params) === "object" && !getData.params.length) this.$http.delete(me.config.baseURL + me.config.dataURL + lastURL, { params: getData.params }).then(getSuccess, getError);else this.$http.delete(me.config.baseURL + me.config.dataURL + lastURL).then(getSuccess, getError);
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
        }
      });
      return this.init;
    };
    return this.create;
  };

  this.config.getToken = new Vue({
    data: {
      tokenResponse: {
        success: function success(response) {
          activity(me.initRequest(response));
        },
        error: function error(response) {
          activityError(response);
        }
      }
    },
    methods: {
      initToken: function initToken() {
        var autoResponse = {};
        if (typeof me.config.token === "string") {
          autoResponse.body = {
            access_token: me.config.token
          };
          this.tokenResponse.success(autoResponse);
        } else {
          this.$http.post(me.config.baseURL + me.config.tokenURL, me.config.accessData.body, {
            emulateJSON: me.config.contentType === "application/x-www-form-urlencoded" ? true : false,
            headers: me.config.accessData.headers
            //before: function(req){
            //    console.log(req);
            //}
          }).then(this.tokenResponse.success, this.tokenResponse.error);
        }
      }
    }
  });

  this.config.getToken.initToken();
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(10),
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"active\">\n    <b>{{message}}</b>\n  </div>\n";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(12),
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"active\">\n    <div>\n      <h3>{{description.title}}</h3>\n    </div>\n    <p><b v-html=\"description.text\"></b></p>\n    <div>\n      <a href=\"#\" v-on:click.prevent=\"onAccept()\"><span>{{description.accept}}</span></a>\n      <a href=\"#\" v-on:click.prevent=\"active = !active\"><span>{{description.cancel}}</span></a>\n    </div>\n  </div>\n";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(14),
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"active\">\n    <div>\n        <h3>{{description.title}}</h3>\n    </div>\n    <p><b v-html=\"description.text\"></b></p>\n    <div>\n        <a href=\"#\" v-on:click.prevent=\"active = !active\"><span>{{description.ok}}</span></a>\n    </div>\n  </div>\n";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(16),
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <a><span> {{profile.name}} </span></a>\n    <a href=\"/logout\"><i></i> Cerrar Sesi\xF3n </a>\n  </div>\n";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(18),
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <ul v-for=\"(menu, menuIndex) in menu\">\n      <li><router-link :to=\"menu.path\">{{ menu.title }}</router-link></li>\n    </ul>\n  </div>\n";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(20),
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <div>\n      <div>\n        <h4><b>Breadcrumb</b></h4>\n        <ul>\n          <li>{{ home }}</li>\n          <li v-for=\"p in path\" v-if=\"p !== ''\">{{ p }}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: __webpack_require__(22),
  props: {},
  data: function data() {
    return {
      text: "&copy; 2017. <a href='#' v-on:click.prevent>Tecnocen</a>"
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n    <div v-html=\"text\"></div>\n";

/***/ })
/******/ ]);