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
                                                steps.value === config.store.data.search.actualDay ? 'done active' :
                                                steps.value === config.day.value  ? 'current active' : 'active']" aria-disabled="false" aria-selected="true">
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
                                                :class="[config.store.data.selected === storeIndex ? 'link-row-select' : '', store.linked ? 'selected' : '']"
                                                class="grid-row-customized grid-row-highlight-customized">
                                                <td v-on:click.self="config.selector(storeIndex)" class="col-md-1">
                                                    {{store.name}}
                                                    <div class="pull-right">
                                                        <a href="#" v-on:click.prevent="config.initPoint(storeIndex)" :class="store.linked ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Agregar">
                                                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                                        </a>
                                                        <a :id="'schedule-' + storeIndex" href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Horarios" data-toggle="popover" data-placement="right" data-trigger="hover">
                                                            <i class="icon-watch2" aria-hidden="true"></i>
                                                        </a>
                                                    </div>
                                                    <div :id="'popover-' + storeIndex" class="hidden">
                                                        <table class="table">
                                                            <thead class="table-inverse">
                                                                <tr>
                                                                    <th class="text-center">Inicio</th>
                                                                    <th class="text-center">Final</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="body-class">
                                                                <template v-for="steps in store.steps">
                                                                    <tr v-for="schedule in steps.schedule" v-if="steps.dayNumber === config.day.value">
                                                                        <td>{{schedule.begin}}</td>
                                                                        <td>{{schedule.end}}</td>
                                                                    </tr>
                                                                </template>
                                                            </tbody>
                                                        </table>
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
                <div class="col-sm-3">
                    <div class="panel panel-flat">
                        <div class="panel-heading">
                            <h5 class="panel-title">Etapas de ruta</h5>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12 grid-route">
                                    <table class="table table-bordered">
                                        <tbody class="body-class">
                                            <tr v-for="(store, storeIndex) in config.store.point" class="selected grid-row-customized grid-row-highlight-customized">
                                                <td class="col-md-1">
                                                    {{store.name}}
                                                    <div class="pull-right">
                                                        <a href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Quitar">
                                                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Más información">
                                                            <i class="icon-menu" aria-hidden="true"></i>
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
                            <!--<div class="map-toolbar">
                                <div class="row title-info">
                                    <div class="col-sm-12">
                                        <span>Distancia Total: {{config.configuration.service.totalDistance / 1000}} km.</span>
                                    </div>
                                    <div class="col-sm-12">
                                        <span>Tiempo Total: {{Math.floor((config.configuration.service.totalTime + config.configuration.service.deathTime * 60) / 60) + ' min. ' + Math.floor(((config.configuration.service.totalTime / 60) % 1) * 60) + ' seg.'}}</span>
                                    </div>
                                    <div class="col-sm-12 text-right">
                                        <button v-on:click="config.collapse()" class="btn btn-info btn-small">
                                            {{config.configuration.stepsHidden ? 'Expandir' : 'Colapsar'}} <i :class="config.configuration.stepsHidden ? 'fa-sort-desc' : 'fa-sort-asc'" class="fa" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <template v-if="config.configuration.service.travelDetails.legs.length > 0">
                                    <template v-for="(data, dataIndex) in config.configuration.service.travelDetails.legs">
                                        <div class="row main-info">
                                            <div class="col-sm-2">
                                                <img :src="data.iconStart">
                                            </div>
                                            <div class="col-sm-10">
                                                <a href="#" v-on:click.prevent="data.hidden = !data.hidden">
                                                    <span>{{data.start}}</span>
                                                </a>
                                            </div>
                                            <div class="col-sm-6">
                                                <span>Tiempo Muerto (minutos):</span>
                                            </div>
                                            <div class="col-sm-6">
                                                <input v-on:keyup="config.computeRoute(false)" class="form-control" v-model="data.deathTime" type="number" value="0">
                                            </div>
                                        </div>
                                        <template v-for="steps in data.steps" v-if="!data.hidden">
                                            <div class="row second-info">
                                                <div class="col-sm-12">
                                                    <span>{{steps.instructions}}</span>
                                                </div>
                                                <div class="col-sm-12 value-info text-center">
                                                    <span>(Distancia aproximada: {{steps.distance.text}}. Tiempo aproximado: {{steps.duration.text}})</span>
                                                </div>
                                            </div>
                                        </template>
                                        <div v-if="config.configuration.service.travelDetails.legs.length - 1 === dataIndex" class="row main-info">
                                            <div class="col-sm-1">
                                                <img :src="data.iconEnd">
                                            </div>
                                            <div class="col-sm-10">
                                                <span>{{data.end}}</span>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="row warning-info">
                                        <span>Notas:</span>
                                        <div v-for="data in config.configuration.service.travelDetails.warnings" class="col-sm-12">
                                            <span>{{data.text}}</span>
                                        </div>
                                    </div>
                                    <div class="row copyright-info text-center">
                                        <div class="col-sm-12">
                                            <span>{{config.configuration.service.travelDetails.copyrights}}</span>
                                        </div>
                                    </div>
                                </template>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="linkClient" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Nueva etapa</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="form-group text-center">
                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                        <label v-on:click.prevent>
                                            <span class="switchery switchery-default switchery-custom active">
                                                <small></small>
                                            </span>
                                            {{true ? 'Si' : 'No'}}
                                        </label>
                                        <span class="help-block">Generalizar tiempos solicitados</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row"><!--for-->
                                <div class="col-sm-6">
                                    <span><b>NOMBRE CLIENTE</b></span>
                                </div>
                                <div class="col-sm-6">
                                    <div class="has-error form-group">
                                        <input name="Tiempo solicitado" placeholder="Tiempo solicitado" maxlength="8" class="form-control" type="text">
                                        <span class="help-block">Help</span>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                        </div>
                        <div class="modal-footer modal-footer-custom">
                            <button type="button" class="btn btn-default btn-customized" v-on:click>Agregar</button>
                            <button id="closeAdd" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Nueva etapa</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <div class="row">
                                <div class="form-group text-center">
                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                        <label v-on:click.prevent>
                                            <span class="switchery switchery-default switchery-custom active">
                                                <small></small>
                                            </span>
                                            {{true ? 'Si' : 'No'}}
                                        </label>
                                        <span class="help-block">Generalizar tiempos solicitados</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row"><!--for-->
                                <div class="col-sm-6">
                                    <span><b>NOMBRE CLIENTE</b></span>
                                </div>
                                <div class="col-sm-6">
                                    <div class="has-error form-group">
                                        <input name="Tiempo solicitado" placeholder="Tiempo solicitado" maxlength="8" class="form-control" type="text">
                                        <span class="help-block">Help</span>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                        </div>
                        <div class="modal-footer modal-footer-custom">
                            <button type="button" class="btn btn-default btn-customized" v-on:click>Agregar</button>
                            <button id="closeAdd" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
`;