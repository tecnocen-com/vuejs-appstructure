module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Tipo de Registro</h5>
                <div v-if="config.typeSelection.type === 0 || config.typeSelection.type === 1" class="heading-elements">
                    <ul class="icons-list">
                        <li><a href="#" v-on:click.prevent="config.reset('all')" title="Reinicializar"><i class="icon-reset"></i></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body">
                <p class="content-group">
                    
                </p>
                <div class="form-group">
                    <div class="btn-group bootstrap-select show-tick" style="width: 100%;">
                        <button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" role="button" :title="config.typeSelection.type === null ? 'Selecciona una opción' : config.typeSelection.options[config.typeSelection.type].text">
                            <span class="filter-option pull-left">{{config.typeSelection.type === null ? 'Selecciona una opción' : config.typeSelection.options[config.typeSelection.type].text}}</span>&nbsp;
                            <span class="bs-caret">
                                <span class="caret"></span>
                            </span>
                        </button>
                        <div class="dropdown-menu open" role="combobox">
                            <ul class="dropdown-menu inner" role="listbox" aria-expanded="false">
                                <li v-for="options in config.typeSelection.options" :class="config.typeSelection.type === options.value ? 'selected' : ''">
                                    <a href="#" v-on:click.prevent="config.mainSelect(options.value)" tabindex="0" data-tokens="null" role="option" aria-disabled="false" aria-selected="true">
                                        <span class="text">{{options.text}}</span>
                                        <span class=" icon-checkmark3 check-mark"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="config.typeSelection.type === 0" class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Selección de archivo</h5>
            </div>
            <div class="panel-body">
                <p class="content-group">
                    
                </p>
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <div class="uploader">
                            <input type="file" class="file-styled">
                            <span class="filename">No has seleccionado ningún archivo</span>
                            <span class="action btn btn-default import-file">Selecciona un archivo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-else-if="config.typeSelection.type === 1">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">General</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div :class="config.manualAdd.name.valid ? '' : 'has-error'" class="form-group">
                            <label class="control-label col-lg-2">Nombre</label>
                            <div class="col-lg-10">
                                <input class="form-control" v-on:keyup="config.validation('name')" v-model="config.manualAdd.name.value" type="text" name="Nombre">
                                <span class="help-block">{{config.manualAdd.name.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div :class="config.manualAdd.email.valid ? '' : 'has-error'" class="form-group">
                            <label class="control-label col-lg-2">Correo electrónico</label>
                            <div class="col-lg-10">
                                <input class="form-control" v-on:keyup="config.validation('email')" v-model="config.manualAdd.email.value" type="text" name="Correo electrónico">
                                <span class="help-block">{{config.manualAdd.email.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div :class="config.manualAdd.pass.valid ? '' : 'has-error'" class="form-group">
                            <label class="control-label col-lg-2">Contraseña</label>
                            <div class="col-lg-10">
                                <input class="form-control" v-on:keyup="config.validation('pass')" v-model="config.manualAdd.pass.value" type="password" name="Contraseña">
                                <span class="help-block">{{config.manualAdd.pass.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div :class="config.manualAdd.repass.valid ? '' : 'has-error'" class="form-group">
                            <label class="control-label col-lg-2">Confirmar contraseña</label>
                            <div class="col-lg-10">
                                <input class="form-control" v-on:keyup="config.validation('repass')" v-model="config.manualAdd.repass.value" type="password" name="Confirmar contraseña">
                                <span class="help-block">{{config.manualAdd.repass.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div :class="config.manualAdd.date.valid ? '' : 'has-error'" class="form-group">
                            <label class="control-label col-lg-2">Fecha de ingreso</label>
                            <div class="col-lg-10">
                                <input class="form-control" v-on:keyup="config.validation('date')" v-on:change="config.validation('date')" v-model="config.manualAdd.date.value" type="date" name="Fecha de ingreso">
                                <span class="help-block">{{config.manualAdd.date.text}}</span>
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
                                    <label v-on:click.prevent="config.test = config.test < 2 ? config.test + 1 : 0;" class="label-three-option">
                                        <span class="switchery switchery-default switchery-custom switchery-three-option info" :class="config.test === 0 ? 'one' : config.test === 1 ? 'two' : 'three'">
                                            <small></small>
                                        </span>
                                        {{config.test === 0 ? 'Todas' : config.test === 1 ? 'Día' : 'Intervalo'}}
                                    </label>
                                    <span class="help-block">Ubicaciones</span>
                                </div>
                            </div>
                            <div v-if="!config.manualAdd.sameConf" class="form-group">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.setVisibilityPosition()">
                                        <span class="switchery switchery-default switchery-custom info" :class="config.manualAdd.allPosVisible ? 'active' : 'not-active'">
                                            <small></small>
                                        </span>
                                        {{config.manualAdd.allPosVisible ? 'Si' : 'No'}}
                                    </label>
                                    <span class="help-block">Todas las ubicaciones</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.initConfiguration()">
                                        <span class="switchery switchery-default switchery-custom" :class="config.manualAdd.sameConf ? 'active' : 'not-active'">
                                            <small></small>
                                        </span>
                                        {{config.manualAdd.sameConf ? 'Si' : 'No'}}
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
                                    <template v-if="config.manualAdd.sameConf">
                                        <div style="padding-top: 20px"></div>
                                    </template>
                                    <div v-else class="steps clearfix">
                                        <ul role="tablist">
                                            <li v-for="(steps, stepIndex) in config.manualAdd.steps" role="tab"
                                            :class="[stepIndex === 0 ? 'first' : '',
                                                    config.manualAdd.actualStep === stepIndex ? 'current' : steps.seen ? 'done' : 'disabled']" aria-disabled="false" aria-selected="true">
                                                <a href="#" v-on:click.prevent="steps.seen && config.manualAdd.actualStep !== stepIndex ? config.changeStep(stepIndex) : ''">
                                                    <span class="number">{{stepIndex + 1}}</span> {{steps.text}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="content clearfix">
                                        <div class="row">
                                            <div v-if="!config.manualAdd.sameConf" :class="config.manualAdd.steps[config.manualAdd.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                <div class="form-group">
                                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                        <label v-on:click.prevent="config.setActivity()">
                                                            <span class="switchery switchery-default switchery-custom" :class="config.manualAdd.steps[config.manualAdd.actualStep].active ? 'active' : 'not-active'">
                                                                <small></small>
                                                            </span>
                                                            {{config.manualAdd.steps[config.manualAdd.actualStep].active ? 'Si' : 'No'}}
                                                        </label>
                                                        <span class="help-block">¿Opera en {{config.manualAdd.steps[config.manualAdd.actualStep].text}}?</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="config.manualAdd.steps[config.manualAdd.sameConf ? 0 : config.manualAdd.actualStep].active" :class="config.manualAdd.sameConf ? 'col-sm-12' : 'col-sm-6'">
                                                <div class="form-group">
                                                    <label class="control-label col-md-4">Intervalos de atención</label>
                                                    <div class="col-md-8">
                                                        <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.manualAdd.steps[config.manualAdd.sameConf ? 0 : config.manualAdd.actualStep].interval" type="number" name="Intervalos de atención">
                                                        <span class="help-block">Máximo {{config.manualAdd.maxInterval}} intervalos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="config.manualAdd.steps[config.manualAdd.sameConf ? 0 : config.manualAdd.actualStep].active && Math.floor(parseInt(config.manualAdd.steps[config.manualAdd.sameConf ? 0 : config.manualAdd.actualStep].interval)) > 0" class="row">
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
                                            <template v-for="(interval, intervalIndex) in config.manualAdd.steps[config.manualAdd.sameConf ? 0 : config.manualAdd.actualStep].schedule">
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
                                            <template v-if="config.manualAdd.sameConf">
                                                <li>
                                                    <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit('manual')" role="menuitem">Guardar</a>
                                                </li>
                                            </template>
                                            <template v-else>
                                                <li :class="config.manualAdd.actualStep === 0 ? 'disabled' : ''" aria-disabled="true">
                                                    <a class="btn btn-default" href="#previous" v-on:click.prevent="config.manualAdd.actualStep > 0 ? config.changeStep(config.manualAdd.actualStep - 1) : ''" role="menuitem">Anterior</a>
                                                </li>
                                                <li v-if="config.manualAdd.actualStep < config.manualAdd.steps.length - 1">
                                                    <a class="btn btn-info btn-customized" href="#next" v-on:click.prevent="config.changeStep(config.manualAdd.actualStep + 1)" role="menuitem">Siguiente</a>
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
            </div>
        </template>
    </div>
`;