var tiendasLigadas = require("./tiendasLigadasT");
var recursosLigados = require("./recursosLigadosT");
var rutas = require("./rutasT");
Vue.component("tiendas-ligadas", {
    template: tiendasLigadas,
    props: {
        config: Object,
        setview: Function
    }
});
Vue.component("recursos-ligados", {
    template: recursosLigados,
    props: {
        config: Object,
        setview: Function
    }
});
Vue.component("rutas", {
    template: rutas,
    props: {
        config: Object,
        setview: Function
    }
});
module.exports = `
    <div class="col-sm-12">
        <div v-if="config.active === 0" class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-body">
                    <p class="content-group">
                    
                    </p>
                    <mcdatatable :title="'Clientes'" :config="config.grid"></mcdatatable>
                </div>
            </div>
        </div>
        <tiendas-ligadas v-else-if="config.active === 1" :config="config.tienda" :setview="config.setView"></tiendas-ligadas>
        <recursos-ligados v-else-if="config.active === 2" :config="config.recurso" :setview="config.setView"></recursos-ligados>
        <rutas v-else-if="config.active === 3" :config="config.ruta" :setview="config.setView"></rutas>
    </div>
`;