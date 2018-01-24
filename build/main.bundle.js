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


BUTO.requires = {
  mainTemplate: __webpack_require__(3),
  modules: {
    modelAR: __webpack_require__(13)
  },
  components: {
    menu: __webpack_require__(14),

    dashboard: __webpack_require__(15),
    test: __webpack_require__(16)
  }
};

Vue.http.get("/init-user-data").then(function (userResponse) {
  if (userResponse.status === 200 && userResponse.body.success) {
    (function () {
      new BUTO.requires.modules.modelAR({
        baseURL: userResponse.body.baseURL,
        dataURL: userResponse.body.dataURL,
        token: userResponse.body.access_token
      }, function (dataCreator) {
        BUTO.components = {
          main: new Vue({
            el: "#main",
            template: BUTO.requires.mainTemplate,
            data: {
              profile: {
                name: "Unknown",
                email: null
              },
              active: {
                first: 0,
                second: 0,
                third: 0
              },
              loader: new Vue({
                data: {
                  active: false,
                  message: "Cargando"
                },
                methods: {
                  loading: function loading() {
                    this.active = true;
                  },
                  loaded: function loaded() {
                    this.active = false;
                  }
                }
              }),
              confirm: new Vue({
                data: {
                  description: {
                    title: "",
                    text: "",
                    accept: "",
                    cancel: ""
                  },
                  active: false
                },
                methods: {
                  onAccept: function onAccept() {}
                }
              }),
              alert: new Vue({
                data: {
                  description: {
                    title: "",
                    text: "",
                    ok: ""
                  },
                  active: false
                }
              }),
              models: {
                profile: new dataCreator("profile")
              },
              children: {
                menu: BUTO.requires.components.menu,
                dashboard: BUTO.requires.components.dashboard,
                test: BUTO.requires.components.test
              }
            },
            methods: {
              setView: function setView(e) {
                var me = this,
                    inPos = false;
                if (this.active.first === e.first && this.active.second === e.second && this.active.third === e.third) inPos = true;
                if (!inPos) {
                  me.active.first = e.first;
                  me.active.second = e.second;
                  me.active.third = e.third;
                }
              }
            },
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
    })();
  } else {
    window.location = "/logout";
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


BUTO.templates = {
  loader: __webpack_require__(4),
  confirm: __webpack_require__(5),
  alert: __webpack_require__(6),

  heading: __webpack_require__(7),
  menu: __webpack_require__(8),
  breadcrumb: __webpack_require__(9),
  foot: __webpack_require__(10),

  dashboard: __webpack_require__(11),
  test: __webpack_require__(12)
};
Vue.component("loader", {
  template: BUTO.templates.loader,
  props: {
    config: Object
  }
});
Vue.component("confirm", {
  template: BUTO.templates.confirm,
  props: {
    config: Object
  }
});
Vue.component("alert", {
  template: BUTO.templates.alert,
  props: {
    config: Object
  }
});

Vue.component("heading", {
  template: BUTO.templates.heading,
  props: {
    profile: Object
  }
});
Vue.component("my-menu", {
  template: BUTO.templates.menu,
  props: {
    config: Object,
    active: Object,
    setview: Function
  }
});
Vue.component("breadcrumb", {
  template: BUTO.templates.breadcrumb,
  props: {
    config: Object,
    active: Object
  }
});
Vue.component("foot", {
  template: BUTO.templates.foot,
  props: {
    config: Object
  }
});
Vue.component("dashboard", {
  template: BUTO.templates.dashboard,
  props: {
    config: Object
  }
});

Vue.component("test", {
  template: BUTO.templates.test,
  props: {
    config: Object
  }
});
module.exports = "\n  <div>\n    <transition name=\"slide-fade\">\n      <loader :config=\"loader\"></loader>\n    </transition>\n    <transition name=\"slide-fade\">\n      <confirm :config=\"confirm\"></confirm>\n    </transition>\n    <transition name=\"slide-fade\">\n      <alert :config=\"alert\"></alert>\n    </transition>\n    <heading :profile=\"profile\"></heading>\n    <my-menu\n    :config=\"children.menu\"\n    :active=\"active\"\n    :setview=\"setView\"></my-menu>\n    <breadcrumb\n    :config=\"children.menu\"\n    :active=\"active\"\n    :setview=\"setView\"></breadcrumb>\n    \n    <div>\n      <div>\n        <template v-if=\"active.first === 0 && active.second === 0 && active.third === 0\">\n          <transition name=\"slide-fade\">\n            <dashboard :config=\"children.dashboard\"></dashboard>\n          </transition>\n        </template>\n        <template v-else-if=\"active.first === 1 && active.second === 0 && active.third === 0\">\n          <transition name=\"slide-fade\">\n            <test :config=\"children.test\"></test>\n          </transition>\n        </template>\n      </div>\n    </div>\n    <foot></foot>\n  </div>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"config.active\">\n    <b>{{config.message}}</b>\n  </div>\n";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"config.active\">\n    <div>\n      <h3>{{config.description.title}}</h3>\n    </div>\n    <p><b v-html=\"config.description.text\"></b></p>\n    <div>\n      <a href=\"#\" v-on:click.prevent=\"config.onAccept()\"><span>{{config.description.accept}}</span></a>\n      <a href=\"#\" v-on:click.prevent=\"config.active = !config.active\"><span>{{config.description.cancel}}</span></a>\n    </div>\n  </div>\n";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div v-if=\"config.active\">\n    <div>\n        <h3>{{config.description.title}}</h3>\n    </div>\n    <p><b v-html=\"config.description.text\"></b></p>\n    <div>\n        <a href=\"#\" v-on:click.prevent=\"config.active = !config.active\"><span>{{config.description.ok}}</span></a>\n    </div>\n  </div>\n";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <a><span> {{profile.name}} </span></a>\n    <a href=\"/logout\"><i></i> Cerrar Sesi\xF3n </a>\n  </div>\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <ul v-for=\"(menu, menuIndex) in config.menu\">\n      <li\n      :class=\"[active.first === menuIndex ? 'active' : '',\n      menu.dropdown.length > 0 ? 'dropdown' : '']\">\n        <a href=\"#\"\n        v-on:click.prevent=\"menu.dropdown.length > 0 ? function(){} : setview({first: menuIndex, second: 0, third: 0})\"\n        :class=\"menu.dropdown.length > 0 ? 'dropdown' : ''\">\n          {{menu.title}}\n        </a>\n        <ul v-if=\"menu.dropdown.length > 0\" class=\"dropdown-menu\">\n          <template v-for=\"(dropdown, dropdownIndex) in menu.dropdown\">\n            <li class=\"dropdown-header\">{{dropdown.title}}</li>\n            <li v-for=\"(subs, subsIndex) in dropdown.subs\">\n              <a href=\"#\" v-on:click.prevent=\"setview({first: menuIndex, second: dropdownIndex, third: subsIndex})\">\n                {{subs.title}}\n              </a>\n            </li>\n          </template>\n        </ul>\n      </li>                    \n    </ul>\n  </div>\n";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <div>\n      <div v-if=\"active.first !== 0\">\n        <h4><b>Breadcrumb</b></h4>\n        <ul>\n          <li>{{config.menu[0].title}}</li>\n          <li>{{config.menu[active.first].title}}</li>\n          <li v-if=\"config.menu[active.first].dropdown.length > 0\">{{config.menu[active.first].dropdown[active.second].title}}</li>\n          <li v-if=\"config.menu[active.first].dropdown.length > 0\" class=\"active\">{{config.menu[active.first].dropdown[active.second].subs[active.third].title}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n    <div>\n        &copy; 2017. <a href=\"#\" v-on:click.prevent>Tecnocen</a>\n    </div>\n";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <h1>{{config.title}}</h1>\n    <p>{{config.time}}</p>\n  </div>\n";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n  <div>\n    <h1>{{config.title}}</h1>\n    <div>\n      <input v-model=\"config.value\" type=\"number\">\n      <span>Valor al cuadrado: {{config.square}}</span>\n    </div>\n  </div>\n";

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = new Vue({
  data: {
    menu: [{
      title: "Inicio",
      dropdown: []
    }, {
      title: "Test",
      dropdown: []
      //dropdown: [
      //  {
      //    title: "General",
      //    subs: [
      //      {
      //        title: "Tiendas registradas",
      //      },
      //      {
      //        title: "Nueva tienda",
      //      }
      //    ]
      //  }
      //]
    }]
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = new Vue({
    data: {
        title: "Dashboard",
        time: 0
    },
    methods: {
        init: function init() {}
    },
    created: function created() {
        var me = this;
        setInterval(function () {
            return ++me.time;
        }, 1000);
    }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = new Vue({
    data: {
        title: "Test",
        value: 0
    },
    computed: {
        square: function square() {
            return this.value * this.value;
        }
    },
    methods: {
        init: function init() {}
    }
});

/***/ })
/******/ ]);