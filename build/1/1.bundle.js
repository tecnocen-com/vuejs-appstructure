webpackJsonp([1],{

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Dashboard_vue__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Dashboard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Dashboard_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Dashboard_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Dashboard_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_07760ac9_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Dashboard_vue__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(64);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(604)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Dashboard_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_07760ac9_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Dashboard_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_07760ac9_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Dashboard_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "client\\js\\apps\\home\\components\\dashboard\\Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-07760ac9", Component.options)
  } else {
    hotAPI.reload("data-v-07760ac9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {},
  data: function data() {
    return {
      title: "Dashboard",
      time: 0,
      interval: null
    };
  },
  computed: {},
  methods: {
    open: function open(o) {
      this.$store.commit("open", o);
    },
    close: function close(o) {
      this.$store.commit("close", o);
    },
    accept: function accept() {
      this.$store.commit("onAccept", function () {
        console.log("Accept from dashboard");
      });
      this.open({
        name: "confirm",
        title: "Título de ConfirmacióN",
        text: "Texto de confirmacióN",
        accept: "AceptaR",
        close: "CancelaR"
      });
    }
  },
  beforeCreate: function beforeCreate() {},
  created: function created() {
    var _this = this;

    this.interval = setInterval(function () {
      return ++_this.time;
    }, 1000);
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  activated: function activated() {},
  deactivated: function deactivated() {},
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.interval);
  },
  destroyed: function destroyed() {}
};

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(605);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(63).default
var update = add("3889b5e4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v(_vm._s(_vm.title))]),
    _vm._v(" "),
    _c("p", [_vm._v(_vm._s(_vm.time))]),
    _vm._v(" "),
    _c(
      "button",
      {
        on: {
          click: function($event) {
            _vm.open({ name: "loader" })
          }
        }
      },
      [_vm._v("Abrir cargador")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        on: {
          click: function($event) {
            _vm.close({ name: "loader" })
          }
        }
      },
      [_vm._v("Cerrar cargador")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        on: {
          click: function($event) {
            _vm.accept()
          }
        }
      },
      [_vm._v("Abrir confirmación")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        on: {
          click: function($event) {
            _vm.open({
              name: "alert",
              title: "Título de AlertA",
              text: "Texto de alertA",
              close: "AceptaR"
            })
          }
        }
      },
      [_vm._v("Abrir alerta")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-07760ac9", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

});