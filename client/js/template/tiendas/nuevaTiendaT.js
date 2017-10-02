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
        <template v-if="config.typeSelection.type === 0">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Selección de archivo</h5>
                </div>
                <div class="panel-body">
                    <p class="content-group">
                        
                    </p>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <div class="uploader">
                                <input type="file" v-on:change="config.changeFile" class="file-styled">
                                <span class="filename">{{config.importer.file.text}}</span>
                                <span class="action btn btn-default import-file">Selecciona un archivo</span>
                                <a href="#" v-on:click.prevent class="input-info input-import"
                                data-toggle="popover"
                                data-trigger="focus"
                                data-placement="left"
                                data-content="¿Desconoces el formato apropiado para este importador?<br>Da click <a href='/download-import?type=store'>aquí</a> para obtenerlo."
                                data-html="true">
                                    <i class="icon-info22"></i>
                                </a>
                            </div>
                            <div v-if="config.importer.file.value !== null" class="form-group">
                                <div class="steps-basic wizard clearfix">
                                    <div class="actions clearfix">
                                        <ul role="menu" aria-label="Pagination">
                                            <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.process()" role="menuitem">Procesar</a>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="config.importer.store.length > 0">
                <div class="panel panel-flat">
                    <div class="panel-heading">
                        <h5 class="panel-title">Datos importados</h5>
                    </div>
                    <div class="panel-body">
                        <p class="content-group">
                            
                        </p>
                        <div v-for="(store, storeIndex) in config.importer.store" class="row">
                            <div :class="store.valid && store.name.valid ? '' : 'has-error'" class="form-group">
                                <label class="control-label col-lg-2">Nombre tienda {{storeIndex + 1}}</label>
                                <div class="col-lg-10">
                                    <input class="form-control" v-on:keyup="config.validation('import-name', storeIndex)" v-model="store.name.value" type="text" name="Nombre" maxlength="64">
                                    <span class="help-block">{{store.name.text}}</span>
                                    <div class="pull-right input-handler">
                                        <a href="#" v-on:click.prevent="config.edit(storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" :title="'Editar ' + store.name.value" data-toggle="modal" data-target="#edit">
                                            <i aria-hidden="true" class="icon-pencil6"></i>
                                        </a>
                                        <a href="#" v-on:click.prevent="config.remove(storeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" :title="'Descartar ' + store.name.value">
                                            <span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <div class="steps-basic wizard clearfix">
                                        <div class="actions clearfix">
                                            <ul role="menu" aria-label="Pagination">
                                                <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit('import')" role="menuitem">Guardar</a>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
        <template v-else-if="config.typeSelection.type === 1">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Nombre</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div :class="config.manualAdd.name.valid ? '' : 'has-error'" class="form-group">
                                <input class="form-control" v-on:keyup="config.validation('name')" v-model="config.manualAdd.name.value" type="text" name="Nombre" maxlength="64">
                                <span class="help-block">{{config.manualAdd.name.text}}</span>
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
                                <input id="searchAddStore" class="form-control" style="margin-top: 8px; width: 40%;" type="text" placeholder="Búsqueda">
                                <div id="mapFocusPositionAddStore" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                    <i class="icon-shrink3"></i>
                                </div>
                                <div id="mapAddStore" class="map-container map-basic"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-flat" style="display: block;">
                <div class="panel-heading">
                    <h5 class="panel-title">Horarios</h5>
                    <div class="heading-elements">
                        <div class="heading-form">
                            <div class="form-group">
                                <div class="checkbox checkbox-right checkbox-switchery text-center">
                                    <label v-on:click.prevent="config.manualAdd.sameConf = !config.manualAdd.sameConf; config.manualAdd.steps[0].active = true">
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
                    <div v-if="config.manualAdd.sameConf" class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="steps-basic wizard clearfix">
                                    <div class="content clearfix">
                                        <div style="padding-top: 20px"></div>
                                        <div class="row">
                                            <div style="padding-top: 20px"></div>
                                            <div v-if="config.manualAdd.steps[0].active" class="col-sm-12">
                                                <div class="form-group">
                                                    <label class="control-label col-md-4">Intervalos de atención</label>
                                                    <div class="col-md-8">
                                                        <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.manualAdd.steps[0].interval" type="number" min="1" :max="config.manualAdd.maxInterval" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="Intervalos de atención">
                                                        <span class="help-block">Máximo {{config.manualAdd.maxInterval}} intervalos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="config.manualAdd.steps[0].active" class="row">
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
                                            <template v-for="(interval, intervalIndex) in config.manualAdd.steps[0].schedule">
                                                <div class="col-sm-6">
                                                    <div :class="interval.validBegin ? '' : 'has-error'" class="form-group">
                                                        <input type="text" maxlength="8" v-model="interval.begin" v-on:keyup="interval.begin = mask('time', $event, interval.begin); config.validation('time-begin', intervalIndex)" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                        <span class="help-block">{{interval.textBegin}}</span>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div :class="interval.validEnd ? '' : 'has-error'" class="form-group">
                                                        <input type="text" maxlength="8" v-model="interval.end" v-on:keyup="interval.end = mask('time', $event, interval.end); config.validation('time-end', intervalIndex)" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                        <span class="help-block">{{interval.textEnd}}</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="actions clearfix">
                                        <ul role="menu" aria-label="Pagination">
                                            <li>
                                                <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit('manual')" role="menuitem">Guardar</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="steps-basic wizard clearfix">
                                    <div class="steps clearfix">
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
                                            <div style="padding-top: 20px"></div>
                                            <div :class="config.manualAdd.steps[config.manualAdd.actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                <div class="form-group">
                                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                        <label v-on:click.prevent="config.manualAdd.steps[config.manualAdd.actualStep].active = !config.manualAdd.steps[config.manualAdd.actualStep].active">
                                                            <span class="switchery switchery-default switchery-custom" :class="config.manualAdd.steps[config.manualAdd.actualStep].active ? 'active' : 'not-active'">
                                                                <small></small>
                                                            </span>
                                                            {{config.manualAdd.steps[config.manualAdd.actualStep].active ? 'Si' : 'No'}}
                                                        </label>
                                                        <span class="help-block">¿Opera en {{config.manualAdd.steps[config.manualAdd.actualStep].text}}?</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="config.manualAdd.steps[config.manualAdd.actualStep].active" class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-4">Intervalos de atención</label>
                                                    <div class="col-md-8">
                                                        <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.manualAdd.steps[config.manualAdd.actualStep].interval" type="number" min="1" :max="config.manualAdd.maxInterval" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="Intervalos de atención">
                                                        <span class="help-block">Máximo {{config.manualAdd.maxInterval}} intervalos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="config.manualAdd.steps[config.manualAdd.actualStep].active" class="row">
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
                                            <template v-for="(interval, intervalIndex) in config.manualAdd.steps[config.manualAdd.actualStep].schedule">
                                                <div class="col-sm-6">
                                                    <div :class="interval.validBegin ? '' : 'has-error'" class="form-group">
                                                        <input type="text" maxlength="8" v-model="interval.begin" v-on:keyup="interval.begin = mask('time', $event, interval.begin); config.validation('time-begin', intervalIndex)" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                        <span class="help-block">{{interval.textBegin}}</span>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div :class="interval.validEnd ? '' : 'has-error'" class="form-group">
                                                        <input type="text" maxlength="8" v-model="interval.end" v-on:keyup="interval.end = mask('time', $event, interval.end); config.validation('time-end', intervalIndex)" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                        <span class="help-block">{{interval.textEnd}}</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="actions clearfix">
                                        <ul role="menu" aria-label="Pagination">
                                            <li :class="config.manualAdd.actualStep === 0 ? 'disabled' : ''" aria-disabled="true">
                                                <a class="btn btn-default" href="#previous" v-on:click.prevent="config.manualAdd.actualStep > 0 ? config.changeStep(config.manualAdd.actualStep - 1) : ''" role="menuitem">Anterior</a>
                                            </li>
                                            <li v-if="config.manualAdd.actualStep < config.manualAdd.steps.length - 1">
                                                <a class="btn btn-info btn-customized" href="#next" v-on:click.prevent="config.changeStep(config.manualAdd.actualStep + 1)" role="menuitem">Siguiente</a>
                                            </li>
                                            <li v-else>
                                                <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit('manual')" role="menuitem">Guardar</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div v-if="config.importer.editIndex !== null" class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.importer.store[config.importer.editIndex].name.value}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <!--<input id="searchAddImportStore" class="form-control" style="margin-top: 8px; width: 40%;" type="text" placeholder="Búsqueda">-->
                                    <div id="mapFocusPositionAddImportStore" v-on:click="config.focusPosition()" class="map-focus-position text-center">
                                        <i class="icon-shrink3"></i>
                                    </div>
                                    <div id="mapAddImportStore" class="map-container-modal map-basic"></div>
                                </div>
                            </div>
                        </div>
                        <div v-if="config.importer.editIndex !== null" class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <div class="steps-basic wizard clearfix">
                                        <div class="steps clearfix">
                                            <ul role="tablist">
                                                <li v-for="(steps, stepIndex) in config.importer.store[config.importer.editIndex].steps" role="tab"
                                                :class="[stepIndex === 0 ? 'first' : '',
                                                        config.importer.store[config.importer.editIndex].actualStep === stepIndex ? 'current' : steps.seen ? 'done' : 'disabled']" aria-disabled="false" aria-selected="true">
                                                    <a href="#" v-on:click.prevent="steps.seen && config.importer.store[config.importer.editIndex].actualStep !== stepIndex ? config.changeStep(stepIndex) : ''">
                                                        <span class="number">{{stepIndex + 1}}</span> {{steps.text}}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="content clearfix">
                                            <div class="row">
                                                <div style="padding-top: 20px"></div>
                                                <div :class="config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active ? 'col-sm-6' : 'col-sm-12'">
                                                    <div class="form-group">
                                                        <div class="checkbox checkbox-right checkbox-switchery text-center">
                                                            <label v-on:click.prevent="config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active = !config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active">
                                                                <span class="switchery switchery-default switchery-custom" :class="config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active ? 'active' : 'not-active'">
                                                                    <small></small>
                                                                </span>
                                                                {{config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active ? 'Si' : 'No'}}
                                                            </label>
                                                            <span class="help-block">¿Opera en {{config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].text}}?</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active" class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-4">Intervalos de atención</label>
                                                        <div class="col-md-8">
                                                            <input class="form-control" v-on:keyup="config.setInterval()" v-on:change="config.setInterval()" v-model="config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].interval" type="number" min="1" :max="config.manualAdd.maxInterval" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="Intervalos de atención">
															<span class="help-block">Máximo {{config.manualAdd.maxInterval}} intervalos</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].active && Math.floor(parseInt(config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].interval)) > 0" class="row">
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
                                                <template v-for="(interval, intervalIndex) in config.importer.store[config.importer.editIndex].steps[config.importer.store[config.importer.editIndex].actualStep].schedule">
                                                    <div class="col-sm-6">
                                                        <div :class="interval.validBegin ? '' : 'has-error'" class="form-group">
                                                            <input type="text" maxlength="8" v-model="interval.begin" v-on:keyup="interval.begin = mask('time', $event, interval.begin); config.validation('import-time-begin', config.importer.editIndex, config.importer.store[config.importer.editIndex].actualStep, intervalIndex)" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                                            <span class="help-block">{{interval.textBegin}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div :class="interval.validEnd ? '' : 'has-error'" class="form-group">
                                                            <input type="text" maxlength="8" v-model="interval.end" v-on:keyup="interval.end = mask('time', $event, interval.end); config.validation('import-time-end', config.importer.editIndex, config.importer.store[config.importer.editIndex].actualStep, intervalIndex)" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                                            <span class="help-block">{{interval.textEnd}}</span>
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
    </div>
`;