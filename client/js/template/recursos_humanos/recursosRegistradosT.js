var verRecurso = require("./verRecursoT");
var editarRecurso = require("./editarRecursoT");
var rutas = require("./rutasT");
Vue.component("ver-recurso", {
    template: verRecurso,
    props: {
        config: Object,
        mask: Function,
        setview: Function
    }
});
Vue.component("editar-recurso", {
    template: editarRecurso,
    props: {
        config: Object,
        mask: Function,
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
    <div>
        <div v-if="config.active === 0" class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-body">
                    <p class="content-group">
                    
                    </p>
                    <mcdatatable :title="'Recursos Humanos'" :config="config.grid"></mcdatatable>
                </div>
            </div>
        </div>
        <ver-recurso v-else-if="config.active === 1" :config="config.watch" :mask="config.mask" :setview="config.setView"></ver-recurso>
        <editar-recurso v-else-if="config.active === 2" :config="config.edit" :mask="config.mask" :setview="config.setView"></editar-recurso>
        <rutas v-else-if="config.active === 3" :config="config.ruta" :setview="config.setView"></rutas>
    </div>
`;