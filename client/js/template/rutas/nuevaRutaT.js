module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">General</h5>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a href="#" v-on:click.prevent="config.reset('all')" title="Reinicializar"><i class="icon-reset"></i></i></a></li>
                    </ul>
                </div>
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
                    <div style="padding-top: 20px"></div>
                    <div class="col-sm-6">
                        <div class="form-group text-center schedule-title">
                            <label>
                                Horario de inicio
                                <a href="#" v-on:click.prevent class="input-info" data-toggle="popover" data-content="Si no se define este dato, se calculará automáticamente al trazar la ruta" data-placement="right" data-trigger="hover">
                                    <i class="icon-info22"></i>
                                </a>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group text-center schedule-title">
                            <label>
                                Horario de término
                                <a href="#" v-on:click.prevent class="input-info" data-toggle="popover" data-content="Si no se define este dato, se calculará automáticamente al trazar la ruta" data-placement="right" data-trigger="hover">
                                    <i class="icon-info22"></i>
                                </a>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div :class="config.begin.valid ? '' : 'has-error'" class="form-group">
                            <input :disabled="config.store.point.length > 0" type="text" maxlength="8" v-model="config.begin.value" v-on:keyup="config.begin.value = mask('time', $event, config.begin.value); config.validation('time-begin')" class="form-control">
                            <span class="help-block">{{config.begin.text}}</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div :class="config.end.valid ? '' : 'has-error'" class="form-group">
                            <input type="text" maxlength="8" v-model="config.end.value" v-on:keyup="config.end.value = mask('time', $event, config.end.value); config.validation('time-end')" class="form-control">
                            <span class="help-block">{{config.end.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label class="control-label col-lg-2">
                            Día
                            <a href="#" v-on:click.prevent class="input-info" data-toggle="popover" data-content="IMPORTANTE: Este dato se tomará en cuenta para obtener tiendas disponibles" data-placement="right" data-trigger="hover">
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
                                            <a href="#" v-on:click.prevent="config.store.point.length > 0 ? '' : config.day.value = steps.value;">
                                                <span class="number">X</span> {{steps.text}}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="config.store.point.length === 0" class="actions clearfix">
                                    <ul role="menu" aria-label="Pagination">
                                        <li>
                                            <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.setStep()" role="menuitem">{{config.step === 0 ? 'Siguiente' : 'Actualizar'}}</a>
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
                                                        <a href="#" v-on:click.prevent="config.initPoint('add', storeIndex)" :class="store.linked ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Agregar">
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
                            <div class="row title-info">
                                <div class="col-sm-12">
                                    <span>Distancia Total: {{config.store.data.search.actualDistance / 1000}} km.</span>
                                </div>
                                <div class="col-sm-12">
                                    <span>Tiempo Total: {{config.store.point.length > 0 ? config.converter('string', config.converter('time', config.store.data.search.actualTime) - config.converter('time', config.begin.value)) : '00:00:00'}}.</span>
                                </div>
                                <div class="col-sm-12 text-right">
                                    <button v-on:click="config.collapse()" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized">
                                        <i aria-hidden="true" class="icon-menu8"></i>
                                    </button>
                                </div>
                            </div>
                            <template v-if="config.store.point.length > 0">
                                <template v-for="(store, storeIndex) in config.store.point" class="selected grid-row-customized grid-row-highlight-customized">
                                    <div class="row main-info grid-row-customized grid-row-highlight-customized selected" style="padding-top: 8px; padding-bottom: 8px;">
                                        <div class="col-sm-2">
                                            <img :src="store.main.getIcon().url">
                                            <div class="icon-label-toolbar">{{storeIndex + 1}}</div>
                                        </div>
                                        <div class="col-sm-10">
                                            {{store.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="store.hidden = !store.hidden" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Más información">
                                                    <i :class="store.hidden ? 'icon-menu' : 'icon-more2'" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setPoint('see', storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                    <i aria-hidden="true" class="icon-eye"></i>
                                                </a>
                                                <!--<a href="#" v-on:click.prevent="config.initPoint('edit', storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Editar" data-toggle="modal" data-target="#edit">
                                                    <i aria-hidden="true" class="icon-pencil6"></i>
                                                </a>-->
                                                <a href="#" v-on:click.prevent="config.setPoint('remove', storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Quitar">
                                                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row title-info">
                                        <div class="col-sm-12">
                                            <span>Distancia: {{store.distance / 1000}} km.</span>
                                        </div>
                                        <div class="col-sm-12">
                                            <span>Hora de partida: {{store.start}}</span>
                                        </div>
                                        <div class="col-sm-12">
                                            <span>Hora de término: {{config.converter("string", config.converter("time", store.start) + config.converter("time", store.travel) + config.converter("time", store.death) + config.converter("time", store.usedTime))}}</span>
                                        </div>
                                    </div>
                                    <template v-if="store.details.legs.length > 0 && !store.hidden">
                                        <div v-for="steps in store.details.legs[0].steps" class="row second-info">
                                            <div class="col-sm-12">
                                                <span>{{steps.instructions}}</span>
                                            </div>
                                            <div class="col-sm-12 value-info text-center">
                                                <span>(Distancia aproximada: {{steps.distance.text}}. Tiempo aproximado: {{steps.duration.text}})</span>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                                <template v-if="config.store.point[0].details.legs.length > 0">
                                    <div class="row warning-info">
                                        <span>Notas:</span>
                                        <div v-for="data in config.store.point[0].details.warnings" class="col-sm-12">
                                            <span>{{data.text}}</span>
                                        </div>
                                    </div>
                                    <div class="row copyright-info text-center">
                                        <div class="col-sm-12">
                                            <span>{{config.store.point[0].details.copyrights}}</span>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <div style="padding-top: 20px"></div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="steps-basic wizard clearfix">
                                        <div v-if="config.store.point.length > 0" class="actions clearfix">
                                            <ul role="menu" aria-label="Pagination">
                                                <li>
                                                    <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit()" role="menuitem">Guardar</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <h4 class="modal-title" id="myModalLabel">Nueva etapa: {{config.store.add.name}}</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <h4 class="text-center">Horarios</h4>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group text-center">
                                        <div class="checker border-indigo-600 text-indigo-800">
                                            <span :class="config.store.add.calculate.end ? 'checked' : ''">
                                                <input v-on:click="config.store.add.calculate.end = !config.store.add.calculate.end" type="checkbox" class="control-custom" checked="checked">
                                            </span>
                                        </div>
                                        <span class="help-block">¿Recalcular hora de término de ruta?</span>
                                    </div>
                                </div>
                            </div>
                            <div v-for="(schedule, scheduleIndex) in config.store.add.schedule" class="row">
                                <div class="col-sm-4">
                                    <div class="form-group text-center">
                                        <span>{{schedule.begin}}</span>
                                        <span class="help-block">Inicio</span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group text-center">
                                        <span>{{schedule.end}}</span>
                                        <span class="help-block">Fin</span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group text-center">
                                        <div class="choice border-primary-600 text-primary-800">
                                            <span :class="schedule.active ? 'checked' : ''">
                                                <input v-on:click="config.setAddSchedule(scheduleIndex)" type="radio" name="radio-styled-color" class="control-primary" checked="checked">
                                            </span>
                                        </div>
                                        <span class="help-block">{{schedule.active ? 'Horario activo' : ''}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div v-if="!config.store.add.existsBegin && config.store.point.length === 0" class="col-sm-12 has-error">
                                    <span class="help-block">
                                        NOTAS:
                                        <template v-if="!config.store.add.existsBegin && config.store.point.length === 0">
                                            <br>- Se tomará el valor inicial del horario activo como hora de inicio de ruta.
                                        </template>
                                    </span>
                                </div>
                            </div>
                            <div class="custom-divider"></div>
                            <div class="custom-divider"></div>
                            <h4 class="text-center">Clientes</h4>
                            <div v-for="(client, clientIndex) in config.store.add.client" class="row">
                                <div class="col-sm-4 text-center">
                                    <span><b>{{client.name}}</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{client.time}}</span>
                                        <span class="help-block">Tiempo solicitado</span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-right checkbox-switchery text-center">
                                            <label v-on:click.prevent="config.setAddClient(clientIndex)">
                                                <span class="switchery switchery-default switchery-custom" :class="client.active ? 'active' : 'not-active'">
                                                    <small></small>
                                                </span>
                                                {{client.active ? 'Si' : 'No'}}
                                            </label>
                                            <span class="help-block">Incluir en etapa</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="custom-divider"></div>
                            <div class="custom-divider"></div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Hora de partida:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.add.calculate.begin}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo de viaje:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.add.calculate.travel}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo de llegada:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.converter("string", config.converter("time", config.store.add.calculate.begin) + config.converter("time", config.store.add.calculate.travel))}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>-->
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo muerto:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.add.calculate.death}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo total solicitado:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.add.stageTime}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="config.store.add.stageTime !== null && config.store.add.calculate.begin !== null" class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Hora de término:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group" :class="!config.store.add.validEnd ? 'has-error' : ''">
                                        <label class="control-label">{{config.converter('string', config.converter('time', config.store.add.stageTime) + config.converter('time', config.store.add.calculate.travel) + config.converter('time', config.store.add.calculate.begin) + config.converter('time', config.store.add.calculate.death))}}</label>
                                        <span class="help-block">{{!config.store.add.validEnd ? 'el término de ruta excede el fin del intervalo activo.' : ''}}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                        </div>
                        <div class="modal-footer modal-footer-custom">
                            <button v-on:click="config.setPoint('add')" type="button" class="btn btn-default btn-customized">Agregar</button>
                            <button v-on:click="config.setPoint('cancel')" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="see" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Ver etapa: {{config.store.see.name}}</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <h4 class="text-center">Horario de atención</h4>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group text-center">
                                        <span>{{config.store.see.scheduleBegin}}</span>
                                        <span class="help-block">Inicio</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group text-center">
                                        <span>{{config.store.see.scheduleEnd}}</span>
                                        <span class="help-block">Fin</span>
                                    </div>
                                </div>
                            </div>
                            <div class="custom-divider"></div>
                            <div class="custom-divider"></div>
                            <h4 class="text-center">Clientes</h4>
                            <div v-for="(client, clientIndex) in config.store.see.client" class="row">
                                <div class="col-sm-4 text-center">
                                    <span><b>{{client.name}}</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{client.time}}</span>
                                        <span class="help-block">Tiempo solicitado</span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-right checkbox-switchery text-center">
                                            <label v-on:click.prevent>
                                                <span class="switchery switchery-default switchery-custom" :class="client.active ? 'active' : 'not-active'">
                                                    <small></small>
                                                </span>
                                                {{client.active ? 'Si' : 'No'}}
                                            </label>
                                            <span class="help-block">Incluir en etapa</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="custom-divider"></div>
                            <div class="custom-divider"></div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Hora de partida:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.see.start}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo de viaje:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.see.travel}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo muerto:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.see.death}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo total solicitado:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.see.service}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Hora de término:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.see.finish}}</span>
                                        <span class="help-block"></span>
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
            <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-custom">
                            <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Ver etapa: {{config.store.edit.name}}</h4>
                        </div>
                        <div class="modal-body modal-body-custom">
                            <h4 class="text-center">Horario de atención</h4>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group text-center">
                                        <span>{{config.store.edit.scheduleBegin}}</span>
                                        <span class="help-block">Inicio</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group text-center">
                                        <span>{{config.store.edit.scheduleEnd}}</span>
                                        <span class="help-block">Fin</span>
                                    </div>
                                </div>
                            </div>
                            <div class="custom-divider"></div>
                            <div class="custom-divider"></div>
                            <h4 class="text-center">Clientes</h4>
                            <div v-for="(client, clientIndex) in config.store.edit.client" class="row">
                                <div class="col-sm-4 text-center">
                                    <span><b>{{client.name}}</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{client.time}}</span>
                                        <span class="help-block">Tiempo solicitado</span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-right checkbox-switchery text-center">
                                            <label v-on:click.prevent="config.setEditClient(clientIndex)">
                                                <span class="switchery switchery-default switchery-custom" :class="client.active ? 'active' : 'not-active'">
                                                    <small></small>
                                                </span>
                                                {{client.active ? 'Si' : 'No'}}
                                            </label>
                                            <span class="help-block">Incluir en etapa</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="custom-divider"></div>
                            <div class="custom-divider"></div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Hora de partida:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.edit.start}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo de viaje:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.edit.travel}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo muerto:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.edit.death}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Tiempo total solicitado:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group">
                                        <span>{{config.store.edit.service}}</span>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-5">
                                    <span><b>Hora de término:</b></span>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <div class="form-group" :class="!config.store.edit.validEnd ? 'has-error' : ''">
                                        <label class="control-label">{{config.converter("string", config.converter("time", config.store.edit.start) + config.converter("time", config.store.edit.travel) + config.converter("time", config.store.edit.death) + config.converter("time", config.store.edit.service))}}</label>
                                        <span class="help-block">{{!config.store.edit.validEnd ? 'el término de ruta excede el fin del intervalo activo.' : ''}}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                        </div>
                        <div class="modal-footer modal-footer-custom">
                            <button type="button" v-on:click="config.setPoint('edit')" class="btn btn-default btn-customized">Aceptar</button>
                            <button type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
`;