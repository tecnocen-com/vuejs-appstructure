module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Tipo de Registro</h5>
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
                                    <a href="#" v-on:click="config.typeSelection.type = options.value" tabindex="0" data-tokens="null" role="option" aria-disabled="false" aria-selected="true">
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
                <h5 class="panel-title">{{config.typeSelection.options[config.typeSelection.type].text}}</h5>
            </div>
            <div class="panel-body">
                <p class="content-group">
                    
                </p>
            </div>
        </div>
        <div v-else-if="config.typeSelection.type === 1" class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">{{config.typeSelection.options[config.typeSelection.type].text}}</h5>
            </div>
            <div class="panel-body">
                <p class="content-group">
                    
                </p>
                <div class="checkbox checkbox-right checkbox-switchery">
                    <label v-on:click.prevent="config.manualAdd.active.mon = !config.manualAdd.active.mon">
                        <span class="switchery switchery-default switchery-custom" :class="config.manualAdd.active.mon ? 'active' : 'not-active'">
                            <small></small>
                        </span>
                        Checked switch
                    </label>
                </div>
            </div>
        </div>
    </div>
`;