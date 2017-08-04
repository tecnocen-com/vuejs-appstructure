var heading = require("./template/common/headerT.js");
var sidebar = require("./template/common/sidebarT.js");
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
Vue.component("sidebar", {
    template: sidebar,
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
    <div class="main-container">
        <heading :setview="setView"></heading>
        <sidebar :setview="setView" :active="active"></sidebar>
        <div class="row body-container">
            <div class="content-container">
                <template v-if="active.first === 0">
                    <mapping :config="children.map"></mapping>
                    <toolbar :config="children.map"></toolbar>
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
        </div>
        <foot></foot>
    </div>
`;