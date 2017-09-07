module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h4 class="panel-title text-center">{{config.name}}</h4>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a href="#" v-on:click.prevent="setview(2)" title="Editar"><i class="icon-pencil7"></i></i></a></li>
                        <li><a href="#" v-on:click.prevent="setview(0)" title="Regresar"><i class="icon-history"></i></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body">
                
                <div class="row">
                    <div style="padding-top: 20px"></div>
                    <div class="col-sm-6">
                        <div class="form-group text-center schedule-title">
                            <label>Horario de inicio</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group text-center schedule-title">
                            <label>Horario de término</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <input disabled="disabled" type="text" maxlength="8" v-model="config.begin.value" class="form-control">
                            <span class="help-block">{{config.begin.text}}</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <input disabled="disabled" type="text" maxlength="8" v-model="config.end.value" class="form-control">
                            <span class="help-block">{{config.end.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label class="control-label col-lg-2">Día</label>
                        <div class="col-lg-10">
                            <div class="steps-basic wizard clearfix">
                                <div class="steps clearfix">
                                    <ul role="tablist">
                                        <li v-for="(steps, stepIndex) in config.day.options" role="tab"
                                        :class="[stepIndex === 0 ? 'first' : '',
                                                steps.value === config.day.value ? 'done active' : 'active']" aria-disabled="false" aria-selected="true">
                                            <a href="#" v-on:click.prevent>
                                                <span class="number">X</span> {{steps.text}}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <div class="panel panel-flat">
                    <div class="panel-heading">
                        <h5 class="panel-title">Trazado de ruta</h5>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <div id="mapFocusPositionSeeRoute" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                        <i class="icon-shrink3"></i>
                                    </div>
                                    <div id="mapSeeRoute" class="map-container-route map-basic"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-flat">
                    <div class="panel-heading">
                        <h5 class="panel-title">Etapas de ruta</h5>
                    </div>
                    <div class="panel-body">
                        <div class="row title-info">
                            <div class="col-sm-12">
                                <span>Distancia Total: {{config.store.data.totalDistance / 1000}} km.</span>
                            </div>
                            <div class="col-sm-12">
                                <span>Tiempo Total: {{config.store.point.length > 0 ? config.store.data.totalTime : '00:00:00'}}.</span>
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
                                            <a href="#" v-on:click.prevent="config.setPoint(storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                <i aria-hidden="true" class="icon-eye"></i>
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
        
        
        <!--<div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Horarios y Ubicaciones</h5>
                <div class="heading-elements">
                        <div class="heading-form">
                            <div class="form-group">
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
                        </div>
                    </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div class="steps-basic wizard clearfix">
                                <div class="steps clearfix">
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
                                        <div style="padding-top: 20px"></div>
                                        <div :class="config.steps[config.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                            <div class="form-group">
                                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                    <label>
                                                        <span class="switchery switchery-default switchery-custom" :class="config.steps[config.actualStep].active ? 'active' : 'not-active'">
                                                            <small></small>
                                                        </span>
                                                        {{config.steps[config.actualStep].active ? 'Si' : 'No'}}
                                                    </label>
                                                    <span class="help-block">¿Opera en {{config.steps[config.actualStep].text}}?</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="config.steps[config.actualStep].active" class="col-sm-6">
                                            <div class="form-group">
                                                <label class="control-label col-md-4">Intervalos de atención</label>
                                                <div class="col-md-8">
                                                    <input disabled="disabled" class="form-control" v-model="config.steps[config.actualStep].interval" type="number" name="Intervalos de atención">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="config.steps[config.actualStep].active && Math.floor(parseInt(config.steps[config.actualStep].interval)) > 0" class="row">
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
                                        <template v-for="(interval, intervalIndex) in config.steps[config.actualStep].schedule">
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
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <div id="mapFocusPositionSeeResource" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                                    <i class="icon-shrink3"></i>
                                                </div>
                                                <div id="mapSeeResource" class="map-container map-basic"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
    </div>
`;