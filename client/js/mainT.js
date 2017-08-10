var heading = require("./template/common/headerT.js");
var menu = require("./template/common/menuT.js");
var foot = require("./template/common/footerT.js");
var clientes = require("./template/clientes/clientesT.js");
var tiendas = require("./template/tiendas/tiendasT.js");
var recursosHumanos = require("./template/recursos_humanos/recursosHumanosT.js");
var reportes = require("./template/reportes/reportesT.js");
var map = require("./template/mapT.js");
var toolbar = require("./template/toolbarT.js");
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
Vue.component("foot", {
    template: foot,
    props: {
        config: Object
    }
});
Vue.component("clientes", {
    template: clientes,
    props: {
        config: Object
    }
});
Vue.component("recursos-humanos", {
    template: recursosHumanos,
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
Vue.component("tiendas", {
    template: tiendas,
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
        <heading></heading>
        <my-menu :config="children.menu" :active="active" :setview="setView"></my-menu>
        <div class="page-container">
            <template v-if="active.first === 0">
                <div class="row">
                    <mapping :config="children.map"></mapping>
                    <toolbar :config="children.map"></toolbar>
                </div>
            </template>
            <template v-else-if="active.first === 1">
                <clientes></clientes>
            </template>
            <template v-else-if="active.first === 2">
                <tiendas></tiendas>
            </template>
            <template v-else-if="active.first === 3">
                <recursos-humanos></recursos-humanos>
            </template>
            <template v-else-if="active.first === 4">
                <reportes></reportes>
            </template>
        </div>
        <foot></foot>
    </div>
`;