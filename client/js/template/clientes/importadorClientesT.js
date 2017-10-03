module.exports = `
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Importación de datos</h5>
                    <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a href="#" v-on:click.prevent="config.reset('all')" title="Reinicializar"><i class="icon-reset"></i></i></a></li>
                    </ul>
                </div>
                </div>
                <div class="panel-body">
                    <p class="content-group">
                        
                    </p>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <div class="uploader">
                                <input id="importClient" name="import" type="file" v-on:change="config.changeFile" class="file-styled">
                                <span class="filename">{{config.file.text}}</span>
                                <span class="action btn btn-default import-file">Selecciona un archivo</span>
                                <a href="#" v-on:click.prevent class="input-info input-import"
                                data-toggle="popover"
                                data-trigger="focus"
                                data-placement="left"
                                data-content="¿Desconoces el formato apropiado para este importador?<br>Da click <a href='/download-import?type=client'>aquí</a> para obtenerlo."
                                data-html="true">
                                    <i class="icon-info22"></i>
                                </a>
                            </div>
                            <div v-if="config.file.value !== null" class="form-group">
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
        </div>
        <div v-if="config.client.length > 0" class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Datos importados</h5>
                </div>
                <div class="panel-body">
                    <p class="content-group">
                        
                    </p>
                    <div v-for="(client, clientIndex) in config.client" class="row">
                        <div :class="client.valid ? '' : 'has-error'" class="form-group">
                            <label class="control-label col-lg-2">Nombre cliente {{clientIndex + 1}}</label>
                            <div class="col-lg-10">
                                <input class="form-control" v-on:keyup="config.validation(clientIndex)" v-model="client.value" type="text" name="Nombre" maxlength="64">
                                <span class="help-block">{{client.text}}</span>
                                <div class="pull-right input-handler">
                                    <a href="#" v-on:click.prevent="config.remove(clientIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" :title="'Descartar ' + client.value">
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
                                            <a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.submit()" role="menuitem">Guardar</a>
                                        </ul>
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