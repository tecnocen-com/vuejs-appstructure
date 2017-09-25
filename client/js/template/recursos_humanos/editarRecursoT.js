module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">{{config.name.value}}</h5>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a href="#" v-on:click.prevent="setview(0)" title="Regresar"><i class="icon-history"></i></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div :class="config.name.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">Nombre</label>
                        <div class="col-lg-10">
                            <input class="form-control" v-on:keyup="config.validation('name')" v-model="config.name.value" type="text" name="Nombre" maxlength="64">
                            <span class="help-block">{{config.name.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div :class="config.email.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">Correo electrónico</label>
                        <div class="col-lg-10">
                            <input class="form-control" v-on:keyup="config.validation('email')" v-model="config.email.value" type="text" name="Correo electrónico" maxlength="64">
                            <span class="help-block">{{config.email.text}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div :class="config.phone.valid ? '' : 'has-error'" class="form-group">
                        <label class="control-label col-lg-2">Teléfono</label>
                        <div class="col-lg-10">
                            <input class="form-control" v-on:keyup="config.validation('phone')" v-model="config.phone.value" type="text" name="Teléfono" min="1" step="1" onkeypress="return ((event.charCode >= 48 && event.charCode <= 57) || event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 46)">
                            <span class="help-block">{{config.phone.text}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-flat">
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
                                        <div v-if="config.steps[config.actualStep].active" class="col-sm-6">
                                            <div class="form-group">
                                                <label class="control-label col-md-4">Intervalos de atención</label>
                                                <div class="col-md-8">
                                                    <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.steps[config.sameConf ? 0 : config.actualStep].interval" type="number" min="1" :max="config.maxInterval" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="Intervalos de atención">
                                                    <span class="help-block">Máximo {{config.maxInterval}} intervalos</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="config.steps[config.actualStep].active" class="row">
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
                                        <template v-for="(interval, intervalIndex) in config.steps[config.actualStep].schedule" v-if="!interval.remove">
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
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input id="searchEditResource" class="form-control" style="margin-top: 8px; width: 40%;" type="text" placeholder="Búsqueda">
                                                <div id="mapFocusPositionEditResource" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                                    <i class="icon-shrink3"></i>
                                                </div>
                                                <div id="mapEditResource" class="map-container map-basic"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="actions clearfix">
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
`;