module.exports = `
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">{{config.client.name}}</h4>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(1)" title="Tiendas"><span aria-hidden="true" class="glyphicon glyphicon-tags"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent title="Recursos humanos"><span aria-hidden="true" class="glyphicon glyphicon-briefcase"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(0)" title="Regresar"><i class="icon-history"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title text-center">Todos los recursos</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                <input type="text" v-model="config.data.search.resource" v-on:keyup="config.init(1)" class="form-control" placeholder="Búsqueda">
                                <div class="form-control-feedback" style="width: 30px;">
                                    <i class="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
                                <tbody class="body-class">
                                    <tr v-for="(resource, resourceIndex) in config.resource"
                                        :draggable="resource.selected"
                                        @dragstart="config.initDrag('add')"
                                        @dragend="config.alterLinkDef.masive.config.active = 0;"
                                        :class="resource.linked ? 'selected' : resource.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td v-on:click.self="resource.linked ? '' : resource.selected = !resource.selected" class="col-md-1">
                                            {{resource.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.setLink('see', resourceIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('add', resourceIndex)" :class="resource.linked ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ligar">
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
                                    <span><b>Mostrando {{config.resource.length}} de {{config.data.page.resource.totalCount}} filas en la página {{config.data.page.resource.currentPage}} de {{config.data.page.resource.pageCount < 1 ? '1' : config.data.page.resource.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.resource.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.resource.pageCount <= 3">
                                    <li v-for="page in config.data.page.resource.pageCount" :class="page === config.data.page.resource.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.resource.currentPage ? '' : config.init(1, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.resource.currentPage < 3">
                                        <li :class="config.data.page.resource.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resource.currentPage === 1 ? '' : config.init(1, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resource.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resource.currentPage === 2 ? '' : config.init(1, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resource.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resource.currentPage === 3 ? '' : config.init(1, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.resource.currentPage > config.data.page.resource.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.resource.currentPage === config.data.page.resource.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resource.currentPage === config.data.page.resource.pageCount - 2 ? '' : config.init(1, config.data.page.resource.pageCount - 2);">
                                                {{config.data.page.resource.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resource.currentPage === config.data.page.resource.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resource.currentPage === config.data.page.resource.pageCount - 1 ? '' : config.init(1, config.data.page.resource.pageCount - 1);">
                                                {{config.data.page.resource.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resource.currentPage === config.data.page.resource.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resource.currentPage === config.data.page.resource.pageCount ? '' : config.init(1, config.data.page.resource.pageCount);">
                                                {{config.data.page.resource.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.resource.currentPage - 1)">
                                                {{config.data.page.resource.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.resource.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.resource.currentPage + 1)">
                                                {{config.data.page.resource.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.resource.pageCount === config.data.page.resource.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, config.data.page.resource.pageCount);">
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
                    <h5 class="panel-title text-center">Recursos ligados</h5>
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
                                    <tr v-for="(resource, resourceIndex) in config.resourceLinked"
                                        :draggable="resource.selected"
                                        @dragstart="config.initDrag('remove')"
                                        @dragend="config.alterLinkDef.masive.config.active = 0;"
                                        :class="resource.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td v-on:click.self="resource.selected = !resource.selected" class="col-md-1">
                                            {{resource.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.remove(resource.id)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Desligar">
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
                                    <span><b>Mostrando {{config.resourceLinked.length}} de {{config.data.page.resourceLinked.totalCount}} filas en la página {{config.data.page.resourceLinked.currentPage}} de {{config.data.page.resourceLinked.pageCount < 1 ? '1' : config.data.page.resourceLinked.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.resourceLinked.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(2, null, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.resourceLinked.pageCount <= 3">
                                    <li v-for="page in config.data.page.resourceLinked.pageCount" :class="page === config.data.page.resourceLinked.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.resourceLinked.currentPage ? '' : config.init(2, null, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.resourceLinked.currentPage < 3">
                                        <li :class="config.data.page.resourceLinked.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resourceLinked.currentPage === 1 ? '' : config.init(2, null, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resourceLinked.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resourceLinked.currentPage === 2 ? '' : config.init(2, null, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resourceLinked.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resourceLinked.currentPage === 3 ? '' : config.init(2, null, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.resourceLinked.currentPage > config.data.page.resourceLinked.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.resourceLinked.currentPage === config.data.page.resourceLinked.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resourceLinked.currentPage === config.data.page.resourceLinked.pageCount - 2 ? '' : config.init(2, null, config.data.page.resourceLinked.pageCount - 2);">
                                                {{config.data.page.resourceLinked.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resourceLinked.currentPage === config.data.page.resourceLinked.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resourceLinked.currentPage === config.data.page.resourceLinked.pageCount - 1 ? '' : config.init(2, null, config.data.page.resourceLinked.pageCount - 1);">
                                                {{config.data.page.resourceLinked.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.resourceLinked.currentPage === config.data.page.resourceLinked.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.resourceLinked.currentPage === config.data.page.resourceLinked.pageCount ? '' : config.init(2, null, config.data.page.resourceLinked.pageCount);">
                                                {{config.data.page.resourceLinked.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(2, null, config.data.page.resourceLinked.currentPage - 1)">
                                                {{config.data.page.resourceLinked.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.resourceLinked.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(2, null, config.data.page.resourceLinked.currentPage + 1)">
                                                {{config.data.page.resourceLinked.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.resourceLinked.pageCount === config.data.page.resourceLinked.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(2, null, config.data.page.resourceLinked.pageCount);">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="see" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.alterLinkDef.see.resource.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="form-group">
                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                        <label v-on:click.prevent="config.alterLinkDef.see.resource.setVisibilityPosition()" class="label-three-option">
                                            <span class="switchery switchery-default switchery-custom switchery-three-option info" :class="config.alterLinkDef.see.resource.allPosVisible === 0 ? 'one' : config.alterLinkDef.see.resource.allPosVisible === 1 ? 'two' : 'three'">
                                                <small></small>
                                            </span>
                                            {{config.alterLinkDef.see.resource.allPosVisible === 0 ? 'Todas' : config.alterLinkDef.see.resource.allPosVisible === 1 ? 'Día' : 'Intervalo'}}
                                        </label>
                                        <span class="help-block">Ubicaciones</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="steps-basic wizard clearfix">
                                            <div class="steps clearfix">
                                                <ul role="tablist">
                                                    <li v-for="(steps, stepIndex) in config.alterLinkDef.see.resource.steps" role="tab"
                                                    :class="[stepIndex === 0 ? 'first' : '',
                                                            config.alterLinkDef.see.resource.actualStep === stepIndex ? 'current' : steps.seen ? 'done' : 'disabled']" aria-disabled="false" aria-selected="true">
                                                        <a href="#" v-on:click.prevent="steps.seen && config.alterLinkDef.see.resource.actualStep !== stepIndex ? config.alterLinkDef.see.resource.changeStep(stepIndex) : ''">
                                                            <span class="number">{{stepIndex + 1}}</span> {{steps.text}}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="content clearfix">
                                                <div class="row">
                                                    <div style="padding-top: 20px"></div>
                                                    <div :class="config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                        <div class="form-group">
                                                            <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                                <label>
                                                                    <span class="switchery switchery-default switchery-custom" :class="config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].active ? 'active' : 'not-active'">
                                                                        <small></small>
                                                                    </span>
                                                                    {{config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].active ? 'Si' : 'No'}}
                                                                </label>
                                                                <span class="help-block">¿Opera en {{config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].text}}?</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].active" class="col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-4">Intervalos de atención</label>
                                                            <div class="col-md-8">
                                                                <input disabled="disabled" class="form-control" v-model="config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].interval" type="number" name="Intervalos de atención">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].active && Math.floor(parseInt(config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].interval)) > 0" class="row">
                                                    <div style="padding-top: 20px"></div>
                                                    <div class="col-sm-5">
                                                        <div class="form-group text-center schedule-title">
                                                            <label>Inicio</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <div class="form-group text-center schedule-title">
                                                            <label>Final</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-group text-center schedule-title">
                                                            <label>Posición</label>
                                                        </div>
                                                    </div>
                                                    <template v-for="(interval, intervalIndex) in config.alterLinkDef.see.resource.steps[config.alterLinkDef.see.resource.actualStep].schedule">
                                                        <div class="col-sm-5">
                                                            <div class="form-group">
                                                                <input disabled="disabled" type="text" maxlength="8" v-model="interval.begin" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                                <span class="help-block">hh:mm:ss</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-5">
                                                            <div class="form-group">
                                                                <input disabled="disabled" type="text" maxlength="8" v-model="interval.end" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                                <span class="help-block">hh:mm:ss</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                                <label v-on:click.prevent="config.alterLinkDef.see.resource.setActiveInterval(intervalIndex)">
                                                                    <span class="switchery switchery-default switchery-custom" :class="interval.active ? 'active' : 'not-active'">
                                                                        <small></small>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <div id="mapFocusPositionSeeResource" v-on:click="config.alterLinkDef.see.resource.focusPosition()" class="map-focus-position text-center">
                                                                <i class="icon-shrink3"></i>
                                                            </div>
                                                            <div id="mapSeeResource" class="map-container-modal map-basic"></div>
                                                        </div>
                                                    </div>
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