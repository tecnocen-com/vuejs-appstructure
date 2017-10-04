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
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
/******/ })
/************************************************************************/
/******/ ({

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


BUTO.requires = {
    templates: {
        login: __webpack_require__(87)
    }
};
BUTO.components = {
    login: new Vue({
        el: "#login",
        template: BUTO.requires.templates.login,
        data: {
            hidden: true,
            error: 0,
            mainMessage: {
                title: "Bienvenido",
                subtitle: "Ingrese a su cuenta"
            },
            animationClass: ['fade-efect-hide', 'fade-efect-show'],
            user: {
                hidden: false,
                animate: false,
                data: "",
                label: "Usuario"
            },
            password: {
                hidden: true,
                animate: true,
                data: "",
                label: "Contraseña"
            },
            alert: {
                hidden: true,
                animate: false,
                message: ""
            },
            button: {
                loading: false,
                message: "Continuar",
                forgotten: "¿Olvidaste tu contraseña?"
            }
        },
        methods: {
            login: function login() {
                var me = this,
                    validator = true;
                this.button.loading = true;
                validator *= this.user.data === "" ? false : true;
                validator = validator === 1 ? true : false;
                if (!validator) {
                    this.alert.message = "Error, se requiere un nombre de usuario.";
                    this.alert.hidden = false;
                    this.error = 0;
                    this.button.loading = false;
                    setTimeout(function () {
                        me.alertAnimation("hide");
                    }, 1500);
                } else {
                    validator *= this.password.data === "" ? false : true;
                    validator = validator === 1 ? true : false;
                    if (!validator) {
                        this.alert.message = "Error, se requiere una contraseña.";
                        this.alert.hidden = false;
                        this.error = 1;
                        this.button.loading = false;
                        setTimeout(function () {
                            me.alertAnimation("hide");
                        }, 1500);
                    } else {
                        validator *= !this.fieldValidation(this.user.data);
                        validator = validator === 1 ? true : false;
                        if (!validator) {
                            this.alert.message = "Error, caracteres inválidos, inténtalo de nuevo.";
                            this.alert.hidden = false;
                            this.error = 0;
                            this.button.loading = false;
                            setTimeout(function () {
                                me.alertAnimation("hide");
                            }, 1500);
                        } else this.$http.post("/login", {
                            user: this.user.data,
                            pass: this.password.data
                        }).then(function (response) {
                            if (response.status === 200 && response.body.status !== 401) {
                                window.location = "/home";
                            } else {
                                me.alert.message = "Error, nombre de usuario y/o contraseña inválidos.";
                                me.alert.hidden = false;
                                me.error = 2;
                                this.button.loading = false;
                                setTimeout(function () {
                                    me.alertAnimation("hide");
                                }, 1500);
                            }
                        });
                    }
                }
            },
            alertAnimation: function alertAnimation(anim) {
                var me = this,
                    message = document.getElementById("message");
                if (message) {
                    this.alert.animate = anim === "show" ? false : true;
                    var messageAnimation = this.detectAnimation(message);
                    messageAnimation && message.addEventListener(messageAnimation, function (e) {
                        if (e.animationName === "fade-efect-hide") {
                            me.alert.hidden = true;
                            me.alert.animate = false;
                        } else {
                            //me.alert.show = true;
                        }
                    });
                }
            },
            noMessageAnimation: function (_noMessageAnimation) {
                function noMessageAnimation() {
                    return _noMessageAnimation.apply(this, arguments);
                }

                noMessageAnimation.toString = function () {
                    return _noMessageAnimation.toString();
                };

                return noMessageAnimation;
            }(function () {
                var noMessage = document.getElementById("noMessage");
                if (noMessage) {
                    noMessageAnimation = this.detectAnimation(noMessage);
                    noMessageAnimation && noMessage.addEventListener(noMessageAnimation, function (e) {
                        if (e.animationName === "fade-efect-hide") {} else {}
                    });
                }
            }),
            detectAnimation: function detectAnimation(el) {
                var t;
                var animations = {
                    "animation": "animationend",
                    "OAnimation": "oAnimationEnd",
                    "MozAnimation": "animationend",
                    "WebkitAnimation": "webkitAnimationEnd"
                };
                for (t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            },
            fieldValidation: function fieldValidation(element) {
                var validator = false;
                if (typeof element === "string") {
                    validator += element.indexOf('#') !== -1 ? true : false;
                    validator += element.indexOf('!') !== -1 ? true : false;
                    validator += element.indexOf('$') !== -1 ? true : false;
                    validator += element.indexOf('%') !== -1 ? true : false;
                    validator += element.indexOf('/') !== -1 ? true : false;
                    validator += element.indexOf('(') !== -1 ? true : false;
                    validator += element.indexOf(')') !== -1 ? true : false;
                    validator += element.indexOf('=') !== -1 ? true : false;
                    validator += element.indexOf('<') !== -1 ? true : false;
                    validator += element.indexOf('>') !== -1 ? true : false;
                    validator += element.indexOf('¡') !== -1 ? true : false;
                    validator += element.indexOf('\'') !== -1 ? true : false;
                    validator += element.indexOf('´') !== -1 ? true : false;
                    validator += element.indexOf('*') !== -1 ? true : false;
                    validator += element.indexOf('[') !== -1 ? true : false;
                    validator += element.indexOf(']') !== -1 ? true : false;
                    validator += element.indexOf('{') !== -1 ? true : false;
                    validator += element.indexOf('}') !== -1 ? true : false;
                    validator += element.indexOf('+') !== -1 ? true : false;
                    validator += element.indexOf('"') !== -1 ? true : false;
                    validator += element.indexOf('|') !== -1 ? true : false;
                    validator += element.indexOf('°') !== -1 ? true : false;
                    validator += element.indexOf('&') !== -1 ? true : false;
                    if (validator) validator = true;else validator = false;
                }
                return validator;
            }
        },
        created: function created() {},
        mounted: function mounted() {
            this.hidden = false;
            this.$refs.username.autofocus = true;
        }
    })
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n    <div class=\"login-box\">\n        <form v-on:submit.prevent action=\"#\" method=\"POST\">\n            <div class=\"Logo\">\n                <img src=\"/image/logo/techfor180-45.png\" alt=\"logotipo\" class=\"img-responsive\">\n            </div>\n            <div class=\"inner-login-box\">\n                <div class=\"header\">\n                    <h1 class=\"text-center text-uppercase\">{{mainMessage.title}}</h1>\n                    <h4 class=\"text-center\">{{mainMessage.subtitle}}</h4>\n                </div>\n                <div class=\"box-login\">\n                    <div id=\"username\" class=\"form-group\">\n                        <label for=\"username\">{{user.label}}:</label>\n                        <input v-on:keydown.space.prevent v-on:keydown.enter=\"login()\" type=\"text\" v-model=\"user.data\" ref=\"username\" name=\"username\" :class=\"!alert.hidden && error !== 1 ? 'wrong-input' : ''\" class=\"form-control\" maxlength=\"64\">\n                    </div>\n                    <div id=\"password\" class=\"form-group\">\n                        <label for=\"password\">{{password.label}}:</label>\n                        <input v-on:keydown.space.prevent v-on:keydown.enter=\"login()\" type=\"password\" v-model=\"password.data\" ref=\"password\" name=\"password\" :class=\"!alert.hidden && error !== 0 ? 'wrong-input' : ''\" class=\"form-control\" maxlength=\"64\">\n                    </div>\n                </div>\n                <div id=\"message\" v-if=\"!alert.hidden\" :class=\"[alert.animate ? animationClass[0] : animationClass[1], 'message-box', 'wrong-message-box']\" role=\"alert\">\n                    <p>\n                        <b>{{alert.message}}</b>\n                    </p>\n                </div>\n                <div class=\"form-group\" style=\"text-align: center;\">\n                    <button type=\"submit\" :class=\"button.loading ? 'disabled' : ''\" class=\"btn-black\" v-on:click=\"login()\"><b>{{button.message}}</b></button>\n                </div>\n            </div>\n        </form>\n            <div class=\"form-group forgotten-container\">\n                <!--<small>\n                    <a class=\"login-link\" href=\"#\" v.on:click.prevent>{{button.forgotten}}</a>\n                </small>-->\n            </div>\n    </div>\n";

/***/ })

/******/ });