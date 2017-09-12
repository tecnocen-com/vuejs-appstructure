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
            <div class="modal fade" id="remove" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Borrado de Registro: {{config.remove.name}}</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group text-center">
                                        <div class="checker border-indigo-600 text-indigo-800">
                                            <span :class="config.remove.type === false ? 'checked' : ''">
                                                <input v-on:click="config.remove.type = false" type="checkbox" class="control-custom" checked="checked">
                                            </span>
                                        </div>
                                        <span class="help-block">¿Borrar solo información de ubicación y horarios?</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group text-center">
                                        <div class="checker border-indigo-600 text-indigo-800">
                                            <span :class="config.remove.type === true ? 'checked' : ''">
                                                <input v-on:click="config.remove.type = true" type="checkbox" class="control-custom" checked="checked">
                                            </span>
                                        </div>
                                        <span class="help-block">¿Borrar todo el usuario?</span>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                        </div>
                        <div class="modal-footer modal-footer-custom">
                            <button type="button" v-on:click="config.removeEmployee()" class="btn btn-default btn-customized">Aceptar</button>
                            <button id="closeRemoveEmployee" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ver-recurso v-else-if="config.active === 1" :config="config.watch" :mask="config.mask" :setview="config.setView"></ver-recurso>
        <editar-recurso v-else-if="config.active === 2" :config="config.edit" :mask="config.mask" :setview="config.setView"></editar-recurso>
        <rutas v-else-if="config.active === 3" :config="config.ruta" :setview="config.setView"></rutas>
    </div>
`;