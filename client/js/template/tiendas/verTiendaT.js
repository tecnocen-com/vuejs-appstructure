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
        </div>
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Ubicación</h5>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div id="mapFocusPositionSeeStore" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                <i class="icon-shrink3"></i>
                            </div>
                            <div id="mapSeeStore" class="map-container map-basic"></div>
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
                                        <template v-for="(interval, intervalIndex) in config.steps[config.actualStep].schedule">
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
            </div>
        </div>
    </div>
`;