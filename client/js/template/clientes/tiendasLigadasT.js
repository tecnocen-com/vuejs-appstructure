module.exports = `
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">{{config.client.name}}</h4>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent title="Tiendas"><span aria-hidden="true" class="glyphicon glyphicon-tags"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(2)" title="Recursos humanos"><span aria-hidden="true" class="glyphicon glyphicon-briefcase"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(0)" title="Regresar"><i class="icon-history"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title text-center">Todas las tiendas</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                <input type="text" v-model="config.data.search.store" v-on:keyup="config.init(1)" class="form-control" placeholder="Búsqueda">
                                <div class="form-control-feedback" style="width: 30px;">
                                    <i class="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
                                <tbody class="body-class">
                                    <tr v-for="(store, storeIndex) in config.store"
                                        :draggable="store.selected"
                                        @dragstart="config.initDrag('add'); $event.dataTransfer.setData('text/plain', 'This text may be dragged');"
                                        @dragend="config.alterLinkDef.masive.config.active = 0;"
                                        :class="store.linked ? 'selected' : store.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td v-on:click.self="store.linked ? '' : store.selected = !store.selected" class="col-md-1">
                                            {{store.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.setLink('see', storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('add', storeIndex)" :class="store.linked ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ligar" data-toggle="modal" data-target="#add">
                                                    <i class="icon-link" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <nav class="pull-right">
                            <ul class="pagination">
                                <li>
                                    <span><b>Mostrando {{config.store.length}} de {{config.data.page.store.totalCount}} filas en la página {{config.data.page.store.currentPage}} de {{config.data.page.store.pageCount < 1 ? '1' : config.data.page.store.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.store.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.store.pageCount <= 3">
                                    <li v-for="page in config.data.page.store.pageCount" :class="page === config.data.page.store.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.store.currentPage ? '' : config.init(1, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.store.currentPage < 3">
                                        <li :class="config.data.page.store.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === 1 ? '' : config.init(1, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === 2 ? '' : config.init(1, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === 3 ? '' : config.init(1, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.store.currentPage > config.data.page.store.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === config.data.page.store.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === config.data.page.store.pageCount - 2 ? '' : config.init(1, config.data.page.store.pageCount - 2);">
                                                {{config.data.page.store.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === config.data.page.store.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === config.data.page.store.pageCount - 1 ? '' : config.init(1, config.data.page.store.pageCount - 1);">
                                                {{config.data.page.store.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === config.data.page.store.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === config.data.page.store.pageCount ? '' : config.init(1, config.data.page.store.pageCount);">
                                                {{config.data.page.store.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.store.currentPage - 1)">
                                                {{config.data.page.store.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.store.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.store.currentPage + 1)">
                                                {{config.data.page.store.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.store.pageCount === config.data.page.store.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, config.data.page.store.pageCount);">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title text-center">Tiendas ligadas</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
                                <!--<thead>
                                    <tr>
                                        <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                            <input type="text" class="form-control" placeholder="Búsqueda">
                                            <div class="form-control-feedback" style="width: 30px;">
                                                <i class="icon-search4 text-size-base"></i>
                                            </div>
                                        </div>
                                    </tr>
                                </thead>-->
                                <tbody class="body-class">
                                    <tr v-for="(store, storeIndex) in config.storeLinked"
                                        :draggable="store.selected"
                                        @dragstart="config.initDrag('remove'); $event.dataTransfer.setData('text/plain', 'This text may be dragged');"
                                        @dragend="config.alterLinkDef.masive.config.active = 0;"
                                        :class="store.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td v-on:click.self="store.selected = !store.selected" class="col-md-1">
                                            {{store.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.setLink('seeLinked', storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#seeLinked">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('edit', storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Editar" data-toggle="modal" data-target="#edit">
                                                    <i class="icon-pencil6" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.remove(store.id)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Desligar">
                                                    <i class="icon-unlink" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <nav class="pull-right">
                            <ul class="pagination">
                                <li>
                                    <span><b>Mostrando {{config.storeLinked.length}} de {{config.data.page.storeLinked.totalCount}} filas en la página {{config.data.page.storeLinked.currentPage}} de {{config.data.page.storeLinked.pageCount < 1 ? '1' : config.data.page.storeLinked.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.storeLinked.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(2, null, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.storeLinked.pageCount <= 3">
                                    <li v-for="page in config.data.page.storeLinked.pageCount" :class="page === config.data.page.storeLinked.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.storeLinked.currentPage ? '' : config.init(2, null, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.storeLinked.currentPage < 3">
                                        <li :class="config.data.page.storeLinked.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.storeLinked.currentPage === 1 ? '' : config.init(2, null, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.storeLinked.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.storeLinked.currentPage === 2 ? '' : config.init(2, null, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.storeLinked.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.storeLinked.currentPage === 3 ? '' : config.init(2, null, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.storeLinked.currentPage > config.data.page.storeLinked.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.storeLinked.currentPage === config.data.page.storeLinked.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.storeLinked.currentPage === config.data.page.storeLinked.pageCount - 2 ? '' : config.init(2, null, config.data.page.storeLinked.pageCount - 2);">
                                                {{config.data.page.storeLinked.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.storeLinked.currentPage === config.data.page.storeLinked.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.storeLinked.currentPage === config.data.page.storeLinked.pageCount - 1 ? '' : config.init(2, null, config.data.page.storeLinked.pageCount - 1);">
                                                {{config.data.page.storeLinked.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.storeLinked.currentPage === config.data.page.storeLinked.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.storeLinked.currentPage === config.data.page.storeLinked.pageCount ? '' : config.init(2, null, config.data.page.storeLinked.pageCount);">
                                                {{config.data.page.storeLinked.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(2, null, config.data.page.storeLinked.currentPage - 1)">
                                                {{config.data.page.storeLinked.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.storeLinked.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(2, null, config.data.page.storeLinked.currentPage + 1)">
                                                {{config.data.page.storeLinked.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.storeLinked.pageCount === config.data.page.storeLinked.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(2, null, config.data.page.storeLinked.pageCount);">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Ligar tiendas</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div v-if="config.alterLinkDef.add.length > 1" class="row">
                            <div class="form-group text-center">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.alterLinkDef.masive.config.same = !config.alterLinkDef.masive.config.same">
                                        <span class="switchery switchery-default switchery-custom" :class="config.alterLinkDef.masive.config.same ? 'active' : 'not-active'">
                                            <small></small>
                                        </span>
                                        {{config.alterLinkDef.masive.config.same ? 'Si' : 'No'}}
                                    </label>
                                    <span class="help-block">Generalizar tiempos solicitados</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="config.alterLinkDef.masive.config.same" class="row">
                            <div class="col-sm-6">
                                <span><b>Tiempo General</b></span>
                            </div>
                            <div class="col-sm-6">
                                <div v-if="config.alterLinkDef.add.length > 0" :class="config.alterLinkDef.add[0].valid ? '' : 'has-error'" class="form-group">
                                    <input v-model="config.alterLinkDef.add[0].time" v-on:keyup="config.alterLinkDef.add[0].time = mask('time', $event, config.alterLinkDef.add[0].time); config.validation('add', 0)" name="Tiempo solicitado" placeholder="Tiempo solicitado" maxlength="8" class="form-control" type="text">
                                    <span class="help-block">{{config.alterLinkDef.add[0].text}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else v-for="(link, linkIndex) in config.alterLinkDef.add" class="row">
                            <div class="col-sm-6">
                                <span><b>{{config.store[link.index].name}}</b></span>
                            </div>
                            <div class="col-sm-6">
                                <div :class="link.valid ? '' : 'has-error'" class="form-group">
                                    <input v-model="link.time" v-on:keyup="link.time = mask('time', $event, link.time); config.validation('add', linkIndex)" name="Tiempo solicitado" placeholder="Tiempo solicitado" maxlength="8" class="form-control" type="text">
                                    <span class="help-block">{{link.text}}</span>
                                </div>
                            </div>
                        </div>
                        <div style="height: 10px;"></div>
                    </div>
                    <div class="modal-footer modal-footer-custom">
                        <button type="button" class="btn btn-default btn-customized" v-on:click="config.alterLink('add')">Ligar</button>
                        <button id="closeAdd" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.alterLinkDef.edit.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="col-sm-6">
                                    <span><b>Tiempo requerido</b></span>
                                </div>
                                <div class="col-sm-6">
                                    <div :class="config.alterLinkDef.edit.valid ? '' : 'has-error'" class="form-group">
                                        <input v-model="config.alterLinkDef.edit.time" v-on:keyup="config.alterLinkDef.edit.time = mask('time', $event, config.alterLinkDef.edit.time); config.validation('edit')" name="Tiempo solicitado" placeholder="Tiempo solicitado" maxlength="8" class="form-control" type="text">
                                        <span class="help-block">{{config.alterLinkDef.edit.text}}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                    </div>
                    <div class="modal-footer modal-footer-custom">
                        <button type="button" class="btn btn-default btn-customized" v-on:click="config.alterLink('edit')">Guardar</button>
                        <button id="closeEdit" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="see" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.alterLinkDef.see.store.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <div id="mapFocusPositionSeeStore" v-on:click="config.alterLinkDef.see.store.focusPosition()" class="map-focus-position text-center">
                                        <i class="icon-shrink3"></i>
                                    </div>
                                    <div id="mapSeeStore" class="map-container-modal map-basic"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <div class="steps-basic wizard clearfix">
                                        <div class="steps clearfix">
                                            <ul role="tablist">
                                                <li v-for="(steps, stepIndex) in config.alterLinkDef.see.store.steps" role="tab"
                                                :class="[stepIndex === 0 ? 'first' : '',
                                                        config.alterLinkDef.see.store.actualStep === stepIndex ? 'current' : steps.seen ? 'done' : 'disabled']" aria-disabled="false" aria-selected="true">
                                                    <a href="#" v-on:click.prevent="steps.seen && config.alterLinkDef.see.store.actualStep !== stepIndex ? config.alterLinkDef.see.store.changeStep(stepIndex) : ''">
                                                        <span class="number">{{stepIndex + 1}}</span> {{steps.text}}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="content clearfix">
                                            <div class="row">
                                                <div style="padding-top: 20px"></div>
                                                <div :class="config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                    <div class="form-group">
                                                        <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                            <label>
                                                                <span class="switchery switchery-default switchery-custom" :class="config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].active ? 'active' : 'not-active'">
                                                                    <small></small>
                                                                </span>
                                                                {{config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].active ? 'Si' : 'No'}}
                                                            </label>
                                                            <span class="help-block">¿Opera en {{config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].text}}?</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].active" class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-4">Intervalos de atención</label>
                                                        <div class="col-md-8">
                                                            <input disabled="disabled" class="form-control" v-model="config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].interval" type="number" name="Intervalos de atención">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].active && Math.floor(parseInt(config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].interval)) > 0" class="row">
                                                <div style="padding-top: 20px"></div>
                                                <div class="col-sm-6">
                                                    <div class="form-group text-center schedule-title">
                                                        <label>Inicio</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group text-center schedule-title">
                                                        <label>Final</label>
                                                    </div>
                                                </div>
                                                <template v-for="(interval, intervalIndex) in config.alterLinkDef.see.store.steps[config.alterLinkDef.see.store.actualStep].schedule">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <input disabled="disabled" type="text" maxlength="8" v-model="interval.begin" v-on:keyup="interval.begin = mask('time', $event, interval.begin)" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                            <span class="help-block">hh:mm:ss</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <input disabled="disabled" type="text" maxlength="8" v-model="interval.end" v-on:keyup="interval.end = mask('time', $event, interval.end)" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                            <span class="help-block">hh:mm:ss</span>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="height: 10px;"></div>
                    </div>
                    <div class="modal-footer modal-footer-custom">
                        <button type="button" class="btn btn-default btn-customized" data-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="seeLinked" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.alterLinkDef.see.storeLinked.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="col-sm-6">
                                    <span><b>Tiempo requerido</b></span>
                                </div>
                                <div class="col-sm-6">
                                    <span>{{config.alterLinkDef.see.storeLinked.time}}</span>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                    </div>
                    <div class="modal-footer modal-footer-custom">
                        <button type="button" class="btn btn-default btn-customized" data-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        <div :class="config.alterLinkDef.masive.config.active === 0 ? '' : 'active'" class="link-button-container">
            <div class="row">
                <div class="col-sm-6 text-center button">
                    <a v-on:click.prevent @dragover.prevent @drop="config.setMasive('remove')" v-if="config.alterLinkDef.masive.config.active === 1" href="#">
                        <img src="/image/remove.png">
                    </a>
                </div>
                <div class="col-sm-6 text-center button">
                    <a v-on:click.prevent @dragover.prevent @drop="config.setMasive('add')" v-if="config.alterLinkDef.masive.config.active === 2" href="#">
                        <img src="/image/add.png">
                    </a>
                </div>
            </div>
        </div>
    </div>
`;