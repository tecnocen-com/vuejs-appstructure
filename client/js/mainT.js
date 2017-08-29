BUTO.templates = {
    mcdatatable: require("./plugins/vue-mcdatatable.js").template,
    
    loader: require("./template/common/loaderT.js"),
    confirm: require("./template/common/confirmT.js"),
    alert: require("./template/common/alertT.js"),
    
    heading: require("./template/common/headerT.js"),
    menu: require("./template/common/menuT.js"),
    pageHeading: require("./template/common/pageHeaderT.js"),
    foot: require("./template/common/footerT.js"),
    
    clientesRegistrados: require("./template/clientes/clientesRegistradosT.js"),
    
    tiendasRegistradas: require("./template/tiendas/tiendasRegistradasT.js"),
    nuevaTienda: require("./template/tiendas/nuevaTiendaT.js"),
    
    recursosRegistrados: require("./template/recursos_humanos/recursosRegistradosT.js"),
    nuevoRecurso: require("./template/recursos_humanos/nuevoRecursoT.js"),
    
    rutasRegistradas: require("./template/rutas/rutasRegistradasT.js"),
    nuevaRuta: require("./template/rutas/nuevaRutaT.js"),
    
    reportes: require("./template/reportes/reportesT.js"),
    
    map: require("./template/mapT.js"),
    toolbar: require("./template/toolbarT.js")
};

Vue.component("mcdatatable", {
    template: BUTO.templates.mcdatatable,
    props: {
        title: String,
        config: Object
    }
});

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
        setview: Function,
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
Vue.component("page-heading", {
    template: BUTO.templates.pageHeading,
    props: {
        config: Object,
        active: Object,
        setview: Function,
        profile: Object
    }
});
Vue.component("foot", {
    template: BUTO.templates.foot,
    props: {
        config: Object
    }
});

Vue.component("clientes-registrados", {
    template: BUTO.templates.clientesRegistrados,
    props: {
        config: Object
    }
});

Vue.component("tiendas-registradas", {
    template: BUTO.templates.tiendasRegistradas,
    props: {
        config: Object
    }
});
Vue.component("nueva-tienda", {
    template: BUTO.templates.nuevaTienda,
    props: {
        config: Object,
        mask: Function
    }
});

Vue.component("recursos-registrados", {
    template: BUTO.templates.recursosRegistrados,
    props: {
        config: Object
    }
});
Vue.component("nuevo-recurso", {
    template: BUTO.templates.nuevoRecurso,
    props: {
        config: Object,
        mask: Function
    }
});

Vue.component("rutas-registradas", {
    template: BUTO.templates.rutasRegistradas,
    props: {
        config: Object
    }
});
Vue.component("nueva-ruta", {
    template: BUTO.templates.nuevaRuta,
    props: {
        config: Object,
        mask: Function
    }
});

Vue.component("reportes", {
    template: BUTO.templates.reportes,
    props: {
        config: Object
    }
});

Vue.component("toolbar", {
    template: BUTO.templates.toolbar,
    props: {
        config: Object
    }
});
Vue.component("mapping", {
    template: BUTO.templates.map,
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
        <heading :setview="setView" :profile="profile"></heading>
        <my-menu :config="children.menu" :active="active" :setview="setView"></my-menu>
        <page-heading :config="children.menu" :active="active" :setview="setView" :profile="profile"></page-heading>
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

                <template v-else-if="active.first === 2 && active.second === 0 && active.third === 0">
                    <transition name="slide-fade">
                        <tiendas-registradas :config="children.tiendasRegistradas"></tiendas-registradas>
                    </transition>
                </template>
                <template v-else-if="active.first === 2 && active.second === 0 && active.third === 1">
                    <transition name="slide-fade">
                        <nueva-tienda :mask="mask" :config="children.nuevaTienda"></nueva-tienda>
                    </transition>
                </template>

                <template v-else-if="active.first === 3 && active.second === 0 && active.third === 0">
                    <transition name="slide-fade">
                        <recursos-registrados :config="children.recursosRegistrados"></recursos-registrados>
                    </transition>
                </template>
                <template v-else-if="active.first === 3 && active.second === 0 && active.third === 1">
                    <transition name="slide-fade">
                        <nuevo-recurso :mask="mask" :config="children.nuevoRecurso"></nuevo-recurso>
                    </transition>
                </template>
                
                <template v-else-if="active.first === 4 && active.second === 0 && active.third === 0">
                    <transition name="slide-fade">
                        <rutas-registradas :config="children.rutasRegistradas"></rutas-registradas>
                    </transition>
                </template>
                <template v-else-if="active.first === 4 && active.second === 0 && active.third === 1">
                    <transition name="slide-fade">
                        <nueva-ruta :mask="mask" :config="children.nuevaRuta"></nueva-ruta>
                    </transition>
                </template>

                <template v-else-if="active.first === 5">
                    <transition name="slide-fade">
                        <reportes></reportes>
                    </transition>
                </template>
            </div>
        </div>
        <foot></foot>
    </div>
`;