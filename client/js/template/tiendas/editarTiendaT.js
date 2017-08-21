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
                    <div class="col-sm-12">
                        <div :class="config.name.valid ? '' : 'has-error'" class="form-group">
                            <input class="form-control" v-on:keyup="config.validation('name')" v-model="config.name.value" type="text" name="Nombre">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Ubicación</h5>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <input id="searchEditStore" class="form-control" style="margin-top: 8px; width: 40%;" type="text" placeholder="Búsqueda">
                            <div id="mapFocusPositionEditStore" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                <i class="icon-shrink3"></i>
                            </div>
                            <div id="mapEditStore" class="map-container map-basic"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Horarios</h5>
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
                                                    <label v-on:click.prevent="config.steps[config.actualStep].active = !config.steps[config.actualStep].active">
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
                                                    <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.steps[config.actualStep].interval" type="number" name="Intervalos de atención">
                                                    <span class="help-block">Máximo {{config.maxInterval}} intervalos</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="config.steps[config.actualStep].active && Math.floor(parseInt(config.steps[config.actualStep].interval)) > 0" class="row">
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
                                        <template v-for="(interval, intervalIndex) in config.steps[config.actualStep].schedule" v-if="!interval.remove">
                                            <div class="col-sm-6">
                                                <div :class="interval.validBegin ? '' : 'has-error'" class="form-group">
                                                    <input type="text" maxlength="8" v-model="interval.begin" v-on:keyup="interval.begin = mask('time', $event, interval.begin); config.validation('time-begin', intervalIndex)" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                    <span class="help-block">hh:mm:ss</span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div :class="interval.validEnd ? '' : 'has-error'" class="form-group">
                                                    <input type="text" maxlength="8" v-model="interval.end" v-on:keyup="interval.end = mask('time', $event, interval.end); config.validation('time-end', intervalIndex)" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                    <span class="help-block">hh:mm:ss</span>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="actions clearfix">
                                    <ul role="menu" aria-label="Pagination">
                                        <li>
                                            <a class="btn btn-info" href="#finish" v-on:click.prevent="config.submit()" role="menuitem">Guardar</a>
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