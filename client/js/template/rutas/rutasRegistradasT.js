var verRuta = require("./verRutaT");
var editarRuta = require("./editarRutaT");
Vue.component("ver-ruta", {
    template: verRuta,
    props: {
        config: Object,
        mask: Function,
        setview: Function
    }
});
Vue.component("editar-ruta", {
    template: editarRuta,
    props: {
        config: Object,
        mask: Function,
        setview: Function
    }
});
module.exports = `
    <div>
        <div v-if="config.active === 0" class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-body">
                    <p class="content-group">
                    
                    </p>
                    <mcdatatable :title="'Rutas'" :config="config.grid"></mcdatatable>
                </div>
            </div>
        </div>
        <ver-ruta v-else-if="config.active === 1" :config="config.watch" :mask="config.mask" :setview="config.setView"></ver-ruta>
        <editar-ruta v-else-if="config.active === 2" :config="config.edit" :mask="config.mask" :setview="config.setView"></editar-ruta>
    </div>
`;