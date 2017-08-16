var verTienda = require("./verTiendaT");
var editarTienda = require("./editarTiendaT");
Vue.component("ver-tienda", {
    template: verTienda,
    props: {
        config: Object,
        mask: Function,
        setview: Function
    }
});
Vue.component("editar-tienda", {
    template: editarTienda,
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
                    <mcdatatable :title="'Tiendas'" :config="config.grid"></mcdatatable>
                </div>
            </div>
        </div>
        <ver-tienda v-else-if="config.active === 1" :config="config.watch" :mask="config.mask" :setview="config.setView"></ver-tienda>
        <editar-tienda v-else-if="config.active === 2" :config="config.edit" :mask="config.mask" :setview="config.setView"></editar-tienda>
    </div>
`;