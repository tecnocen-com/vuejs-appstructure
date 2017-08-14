var mcdatatable = require("./plugins/vue-mcdatatable.js").template;
var loader = require("./template/common/loaderT.js");
var confirm = require("./template/common/confirmT.js");
var alert = require("./template/common/alertT.js");
var heading = require("./template/common/headerT.js");
var menu = require("./template/common/menuT.js");
var pageHeading = require("./template/common/pageHeaderT.js");
var foot = require("./template/common/footerT.js");
var clientesRegistrados = require("./template/clientes/clientesRegistradosT.js");
var tiendasRegistradas = require("./template/tiendas/tiendasRegistradasT.js");
var nuevaTienda = require("./template/tiendas/nuevaTiendaT.js");
var recursosRegistrados = require("./template/recursos_humanos/recursosRegistradosT.js");
var reportes = require("./template/reportes/reportesT.js");
var map = require("./template/mapT.js");
var toolbar = require("./template/toolbarT.js");
Vue.component("mcdatatable", {
    template: mcdatatable,
    props: {
        title: String,
        config: Object
    }
});
Vue.component("loader", {
    template: loader,
    props: {
        config: Object
    }
});
Vue.component("confirm", {
    template: confirm,
    props: {
        config: Object
    }
});
Vue.component("alert", {
    template: alert,
    props: {
        config: Object
    }
});
Vue.component("heading", {
    template: heading,
    props: {
        config: Object,
        setview: Function
    }
});
Vue.component("my-menu", {
    template: menu,
    props: {
        config: Object,
        active: Object,
        setview: Function
    }
});
Vue.component("page-heading", {
    template: pageHeading,
    props: {
        config: Object,
        active: Object,
        setview: Function
    }
});
Vue.component("foot", {
    template: foot,
    props: {
        config: Object
    }
});
Vue.component("clientes-registrados", {
    template: clientesRegistrados,
    props: {
        config: Object
    }
});
Vue.component("tiendas-registradas", {
    template: tiendasRegistradas,
    props: {
        config: Object
    }
});
Vue.component("nueva-tienda", {
    template: nuevaTienda,
    props: {
        config: Object
    }
});
Vue.component("recursos-registrados", {
    template: recursosRegistrados,
    props: {
        config: Object
    }
});
Vue.component("reportes", {
    template: reportes,
    props: {
        config: Object
    }
});
Vue.component("toolbar", {
    template: toolbar,
    props: {
        config: Object
    }
});
Vue.component("mapping", {
    template: map,
    props: {
        config: Object
    }
});
module.exports = `
    <!-- Main navbar -->
    <div>
        <transition name="slide-fade">
            <loader :config="loader"></loader>
        </transition>
        <transition name="slide-fade">
            <confirm :config="confirm"></confirm>
        </transition>
        <transition name="slide-fade">
            <alert :config="alert"></alert>
        </transition>
        <heading></heading>
        <my-menu :config="children.menu" :active="active" :setview="setView"></my-menu>
        <page-heading :config="children.menu" :active="active" :setview="setView"></page-heading>
        <div class="page-container">
            <div class="row">
                <template v-if="active.first === 0">
                    <transition name="slide-fade">
                        <mapping :config="children.map"></mapping>
                    </transition>
                    <transition name="slide-fade">
                        <toolbar :config="children.map"></toolbar>
                    </transition>
                </template>
                <template v-else-if="active.first === 1">
                    <transition name="slide-fade">
                        <clientes-registrados :config="children.clientesRegistrados"></clientes-registrados>
                    </transition>
                </template>
                <template v-else-if="active.first === 2">
                    <template v-if="active.second === 0">
                        <template v-if="active.third === 0">
                            <transition name="slide-fade">
                                <tiendas-registradas :config="children.tiendasRegistradas"></tiendas-registradas>
                            </transition>
                        </template>
                        <template v-if="active.third === 1">
                            <transition name="slide-fade">
                                <nueva-tienda :config="children.nuevaTienda"></nueva-tienda>
                            </transition>
                        </template>
                    </template>
                </template>
                <template v-else-if="active.first === 3">
                    <transition name="slide-fade">
                        <recursos-registrados :config="children.recursosRegistrados"></recursos-registrados>
                    </transition>
                </template>
                <template v-else-if="active.first === 4">
                    <transition name="slide-fade">
                        <reportes></reportes>
                    </transition>
                </template>
            </div>
        </div>
        <foot></foot>
    </div>
`;