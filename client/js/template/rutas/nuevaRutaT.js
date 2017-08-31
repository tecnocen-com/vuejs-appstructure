module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">General</h5>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div :class="config.name.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">Nombre</label>
                        <div class="col-lg-10">
                            <input class="form-control" v-on:keyup="config.validation('name')" v-model="config.name.value" type="text" name="Nombre">
                            <span class="help-block">{{config.name.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div :class="config.begin.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">
                            Horario de inicio
                            <a href="#" v-on:click.prevent class="input-info" data-toggle="popover" data-content="Este dato se tomará como horario inicial para obtener tiendas disponibles" data-placement="right" data-trigger="hover">
                                <i class="icon-info22"></i>
                            </a>
                        </label>
                        <div class="col-lg-10">
                            <input type="text" maxlength="8" v-model="config.begin.value" v-on:keyup="config.begin.value = mask('time', $event, config.begin.value); config.validation('time-begin')" class="form-control">
                            <span class="help-block">{{config.begin.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div :class="config.end.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">
                            Horario de término
                            <a href="#" v-on:click.prevent class="input-info" data-toggle="popover" data-content="Este dato se tomará como horario máximo en el trazado de rutas" data-placement="right" data-trigger="hover">
                                <i class="icon-info22"></i>
                            </a>
                        </label>
                        <div class="col-lg-10">
                            <input type="text" maxlength="8" v-model="config.end.value" v-on:keyup="config.end.value = mask('time', $event, config.end.value); config.validation('time-end')" class="form-control">
                            <span class="help-block">{{config.end.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div :class="config.name.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">
                            Día
                            <a href="#" v-on:click.prevent class="input-info" data-toggle="popover" data-content="Este dato se tomará en cuenta para obtener tiendas disponibles" data-placement="right" data-trigger="hover">
                                <i class="icon-info22"></i>
                            </a>
                        </label>
                        <div class="col-lg-10">
                            <div class="steps-basic wizard clearfix">
                                <div class="steps clearfix">
                                    <ul role="tablist">
                                        <li v-for="(steps, stepIndex) in config.day.options" role="tab"
                                        :class="[stepIndex === 0 ? 'first' : '',
                                                config.day.value === steps.value ? 'done active' : 'active']" aria-disabled="false" aria-selected="true">
                                            <a href="#" v-on:click.prevent="config.day.value = steps.value">
                                                <span class="number">X</span> {{steps.text}}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="actions clearfix">
                                    <ul role="menu" aria-label="Pagination">
                                        <li>
                                            <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.setStep()" role="menuitem">{{config.step === 0 ? 'Siguiente' : 'Volver a filtrar'}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="config.step === 1">
            <div class="row">
                <div class="col-sm-3">
                    <div class="panel panel-flat">
                        <div class="panel-heading">
                            <h5 class="panel-title">Tiendas filtradas</h5>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                        <input type="text" v-model="config.store.data.search.store" v-on:keyup="config.initStore(1)" class="form-control" placeholder="Búsqueda">
                                        <div class="form-control-feedback" style="width: 30px;">
                                            <i class="icon-search4 text-size-base"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 grid-route">
                                    <table class="table table-bordered">
                                        <tbody class="body-class">
                                            <tr v-for="(store, storeIndex) in config.store.position"
                                                :class="store.linked ? 'selected' : store.selected ? 'link-row-select' : ''"
                                                class="grid-row-customized grid-row-highlight-customized">
                                                <td v-on:click.self="store.linked ? '' : store.selected = !store.selected" class="col-md-1">
                                                    {{store.name}}
                                                    <div class="pull-right">
                                                        <a href="#" v-on:click.prevent="config.seeStore(storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                            <i class="icon-eye" aria-hidden="true"></i>
                                                        </a>
                                                        <a href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Agregar">
                                                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
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
                                            <span><b>Mostrando {{config.store.position.length}} de {{config.store.data.page.store.totalCount}} filas en la página {{config.store.data.page.store.currentPage}} de {{config.store.data.page.store.pageCount}}.</b></span>
                                        </li>
                                        <li  :class="config.store.data.page.store.currentPage === 1 ? 'not-active disabled' : ''">
                                            <a href="#" v-on:click.prevent="config.initStore(1, 1);">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <template v-if="config.store.data.page.store.pageCount <= 3">
                                            <li v-for="page in config.store.data.page.store.pageCount" :class="page === config.store.data.page.store.currentPage ? 'active' : ''">
                                                <a href="#" v-on:click.prevent="page === config.store.data.page.store.currentPage ? '' : config.initStore(1, page);">
                                                    {{page}}
                                                </a>
                                            </li>
                                        </template>
                                        <template v-else>
                                            <template v-if="config.store.data.page.store.currentPage < 3">
                                                <li :class="config.store.data.page.store.currentPage === 1 ? 'active' : ''">
                                                    <a href="#" v-on:click.prevent="config.store.data.page.store.currentPage === 1 ? '' : config.initStore(1, 1);">
                                                        1
                                                    </a>
                                                </li>
                                                <li :class="config.store.data.page.store.currentPage === 2 ? 'active' : ''">
                                                    <a href="#" v-on:click.prevent="config.store.data.page.store.currentPage === 2 ? '' : config.initStore(1, 2);">
                                                        2
                                                    </a>
                                                </li>
                                                <li :class="config.store.data.page.store.currentPage === 3 ? 'active' : ''">
                                                    <a href="#" v-on:click.prevent="config.store.data.page.store.currentPage === 3 ? '' : config.initStore(1, 3);">
                                                        3
                                                    </a>
                                                </li>
                                                <li>
                                                    <span aria-hidden="true">...</span>
                                                </li>
                                            </template>
                                            <template v-else-if="config.store.data.page.store.currentPage > config.store.data.page.store.pageCount - 2">
                                                <li>
                                                    <span aria-hidden="true">...</span>
                                                </li>
                                                <li :class="config.store.data.page.store.currentPage === config.store.data.page.store.pageCount - 2 ? 'active' : ''">
                                                    <a href="#" v-on:click.prevent="config.store.data.page.store.currentPage === config.store.data.page.store.pageCount - 2 ? '' : config.initStore(1, config.store.data.page.store.pageCount - 2);">
                                                        {{config.store.data.page.store.pageCount - 2}}
                                                    </a>
                                                </li>
                                                <li :class="config.store.data.page.store.currentPage === config.store.data.page.store.pageCount - 1 ? 'active' : ''">
                                                    <a href="#" v-on:click.prevent="config.store.data.page.store.currentPage === config.store.data.page.store.pageCount - 1 ? '' : config.initStore(1, config.store.data.page.store.pageCount - 1);">
                                                        {{config.store.data.page.store.pageCount - 1}}
                                                    </a>
                                                </li>
                                                <li :class="config.store.data.page.store.currentPage === config.store.data.page.store.pageCount ? 'active' : ''">
                                                    <a href="#" v-on:click.prevent="config.store.data.page.store.currentPage === config.store.data.page.store.pageCount ? '' : config.initStore(1, config.store.data.page.store.pageCount);">
                                                        {{config.store.data.page.store.pageCount}}
                                                    </a>
                                                </li>
                                            </template>
                                            <template v-else>
                                                <li>
                                                    <span aria-hidden="true">...</span>
                                                </li>
                                                <li>
                                                    <a href="#" v-on:click.prevent="config.initStore(1, config.store.data.page.store.currentPage - 1)">
                                                        {{config.store.data.page.store.currentPage - 1}}
                                                    </a>
                                                </li>
                                                <li class="active">
                                                    <a href="#" v-on:click.prevent>
                                                        {{config.store.data.page.store.currentPage}}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" v-on:click.prevent="config.initStore(1, config.store.data.page.store.currentPage + 1)">
                                                        {{config.store.data.page.store.currentPage + 1}}
                                                    </a>
                                                </li>
                                                <li>
                                                    <span aria-hidden="true">...</span>
                                                </li>
                                            </template>
                                        </template>
                                        <li :class="config.store.data.page.store.pageCount === config.store.data.page.store.currentPage ? 'not-active disabled' : ''">
                                            <a href="#" v-on:click.prevent="config.initStore(1, config.store.data.page.store.pageCount);">
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
                            <h5 class="panel-title">Trazado de ruta</h5>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <input id="searchAddRoute" class="form-control" style="margin-top: 8px; width: 40%;" type="text" placeholder="Búsqueda">
                                        <div id="mapFocusPositionAddRoute" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                            <i class="icon-shrink3"></i>
                                        </div>
                                        <div id="mapAddRoute" class="map-container-route map-basic"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Ruta</h5>
                    <div class="heading-elements">
                        <div class="heading-form">
                            <div v-if="config.sameConf" class="form-group">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.allPosVisible = config.allPosVisible === 1 ? 2 : 1; config.setVisibilityPosition(true)">
                                        <span class="switchery switchery-default switchery-custom info" :class="config.allPosVisible === 1 ? 'active' : 'not-active'">
                                            <small></small>
                                        </span>
                                        {{config.allPosVisible === 1 ? 'Día' : 'Intervalo'}}
                                    </label>
                                    <span class="help-block">Ubicaciones</span>
                                </div>
                            </div>
                            <div v-else class="form-group">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.setVisibilityPosition()" class="label-three-option">
                                        <span class="switchery switchery-default switchery-custom switchery-three-option info" :class="config.allPosVisible === 0 ? 'one' : config.allPosVisible === 1 ? 'two' : 'three'">
                                            <small></small>
                                        </span>
                                        {{config.allPosVisible === 0 ? 'Todas' : config.allPosVisible === 1 ? 'Día' : 'Intervalo'}}
                                    </label>
                                    <span class="help-block">Ubicaciones</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.initConfiguration()">
                                        <span class="switchery switchery-default switchery-custom" :class="config.sameConf ? 'active' : 'not-active'">
                                            <small></small>
                                        </span>
                                        {{config.sameConf ? 'Si' : 'No'}}
                                    </label>
                                    <span class="help-block">Generalizar horarios</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="steps-basic wizard clearfix">
                                    <template v-if="config.sameConf">
                                        <div style="padding-top: 20px"></div>
                                    </template>
                                    <div v-else class="steps clearfix">
                                        <ul role="tablist">
                                            <li v-for="(steps, stepIndex) in config.steps" role="tab"
                                            :class="[stepIndex === 0 ? 'first' : '',
                                                    config.actualStep === stepIndex ? 'current' : steps.seen ? 'done' : 'disabled']" aria-disabled="false" aria-selected="true">
                                                <a href="#" v-on:click.prevent="steps.seen && config.actualStep !== stepIndex ? config.changeStep(stepIndex) : ''">
                                                    <span class="number">{{stepIndex + 1}}</span> {{steps.text}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="content clearfix">
                                        <div class="row">
                                            <div v-if="!config.sameConf" :class="config.steps[config.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                <div class="form-group">
                                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                        <label v-on:click.prevent="config.setActivity()">
                                                            <span class="switchery switchery-default switchery-custom" :class="config.steps[config.actualStep].active ? 'active' : 'not-active'">
                                                                <small></small>
                                                            </span>
                                                            {{config.steps[config.actualStep].active ? 'Si' : 'No'}}
                                                        </label>
                                                        <span class="help-block">¿Opera en {{config.steps[config.actualStep].text}}?</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="config.steps[config.sameConf ? 0 : config.actualStep].active" :class="config.sameConf ? 'col-sm-12' : 'col-sm-6'">
                                                <div class="form-group">
                                                    <label class="control-label col-md-4">Intervalos de atención</label>
                                                    <div class="col-md-8">
                                                        <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.steps[config.sameConf ? 0 : config.actualStep].interval" type="number" min="1" step="1" onkeypress="return event.charCode >= 48" name="Intervalos de atención">
                                                        <span class="help-block">Máximo {{config.maxInterval}} intervalos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="config.steps[config.sameConf ? 0 : config.actualStep].active" class="row">
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
                                            <template v-for="(interval, intervalIndex) in config.steps[config.sameConf ? 0 : config.actualStep].schedule">
                                                <div class="col-sm-5">
                                                    <div :class="interval.validBegin ? '' : 'has-error'" class="form-group">
                                                        <input type="text" maxlength="8" v-model="interval.begin" v-on:focus="config.setActiveInterval(intervalIndex)" v-on:keyup="interval.begin = mask('time', $event, interval.begin); config.validation('time-begin', intervalIndex)" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                        <span class="help-block">{{interval.textBegin}}</span>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5">
                                                    <div :class="interval.validEnd ? '' : 'has-error'" class="form-group">
                                                        <input type="text" maxlength="8" v-model="interval.end" v-on:focus="config.setActiveInterval(intervalIndex)" v-on:keyup="interval.end = mask('time', $event, interval.end); config.validation('time-end', intervalIndex)" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                        <span class="help-block">{{interval.textEnd}}</span>
                                                    </div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                        <label v-on:click.prevent="config.setActiveInterval(intervalIndex)">
                                                            <span class="switchery switchery-default switchery-custom" :class="interval.active ? 'active' : 'not-active'">
                                                                <small></small>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                        <div class="row">
                                            <div style="padding-top: 20px"></div>
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <input id="searchAddResource" class="form-control" style="margin-top: 8px; width: 40%;" type="text" placeholder="Búsqueda">
                                                    <div id="mapFocusPositionAddResource" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                                        <i class="icon-shrink3"></i>
                                                    </div>
                                                    <div id="mapAddResource" class="map-container map-basic"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="actions clearfix">
                                        <div style="padding-top: 20px"></div>
                                        <ul role="menu" aria-label="Pagination">
                                            <template v-if="config.sameConf">
                                                <li>
                                                    <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit('manual')" role="menuitem">Guardar</a>
                                                </li>
                                            </template>
                                            <template v-else>
                                                <li :class="config.actualStep === 0 ? 'disabled' : ''" aria-disabled="true">
                                                    <a class="btn btn-default" href="#previous" v-on:click.prevent="config.actualStep > 0 ? config.changeStep(config.actualStep - 1) : ''" role="menuitem">Anterior</a>
                                                </li>
                                                <li v-if="config.actualStep < config.steps.length - 1">
                                                    <a class="btn btn-info btn-customized" href="#next" v-on:click.prevent="config.changeStep(config.actualStep + 1)" role="menuitem">Siguiente</a>
                                                </li>
                                                <li v-else>
                                                    <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit('manual')" role="menuitem">Guardar</a>
                                                </li>
                                            </template>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            <div class="modal fade" id="see" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">{{config.store.alterLinkDef.see.store.name}}</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div id="mapFocusPositionSeeStore" v-on:click="config.store.alterLinkDef.see.store.focusPosition()" class="map-focus-position text-center">
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
                                                    <li v-for="(steps, stepIndex) in config.store.alterLinkDef.see.store.steps" role="tab"
                                                    :class="[stepIndex === 0 ? 'first' : '',
                                                            config.store.alterLinkDef.see.store.actualStep === stepIndex ? 'current' : steps.seen ? 'done' : 'disabled']" aria-disabled="false" aria-selected="true">
                                                        <a href="#" v-on:click.prevent="steps.seen && config.store.alterLinkDef.see.store.actualStep !== stepIndex ? config.store.alterLinkDef.see.store.changeStep(stepIndex) : ''">
                                                            <span class="number">{{stepIndex + 1}}</span> {{steps.text}}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="content clearfix">
                                                <div class="row">
                                                    <div style="padding-top: 20px"></div>
                                                    <div :class="config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                        <div class="form-group">
                                                            <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                                <label>
                                                                    <span class="switchery switchery-default switchery-custom" :class="config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].active ? 'active' : 'not-active'">
                                                                        <small></small>
                                                                    </span>
                                                                    {{config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].active ? 'Si' : 'No'}}
                                                                </label>
                                                                <span class="help-block">¿Opera en {{config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].text}}?</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].active" class="col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-4">Intervalos de atención</label>
                                                            <div class="col-md-8">
                                                                <input disabled="disabled" class="form-control" v-model="config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].interval" type="number" name="Intervalos de atención">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].active && Math.floor(parseInt(config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].interval)) > 0" class="row">
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
                                                    <template v-for="(interval, intervalIndex) in config.store.alterLinkDef.see.store.steps[config.store.alterLinkDef.see.store.actualStep].schedule">
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
        </template>
    </div>
`;