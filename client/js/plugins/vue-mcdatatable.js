var mcdatatableT = `
    <div class="container grid-container">
        <div class="row">
            <div class="btn-group pull-right">
                <button type="button" class="btn btn-primary dropdown-toggle btn-customized" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span> {{config.style.noText ? '' : config.style.languageItems[config.style.language].buttons.column}} <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right dropdown-menu-custom">
                    <div v-for="(head, indexHead) in config.head" v-if="head.title !== 'id'" class="row">
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon input-columns-hidden">
                                    <input type="checkbox" :checked="head.hidden ? 0 : 1" v-on:change="config.setVisible(head.hidden, head.title)">
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group-addon span-columns-hidden">
                                {{config.prettyTitle(indexHead)}}
                            </div>
                        </div>
                    </div>
                    <li class="text-center"><a href="#" v-on:click.prevent="config.resetColumns()" style="padding-left: 6px"><span class="glyphicon glyphicon-flag" aria-hidden="true"></span> {{config.style.languageItems[config.style.language].handlers.columns.reset}}</a></li>
                </ul>
            </div>
            <div v-if="config.shouldGroup()" class="btn-group pull-right">
                <button type="button" class="btn btn-warning dropdown-toggle btn-customized" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> {{config.style.noText ? '' : config.style.languageItems[config.style.language].buttons.group}} <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right dropdown-menu-custom">
                    <div v-for="(head, indexHead) in config.head" v-if="head.groupable" class="row">
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon input-columns-hidden">
                                    <input type="radio" :checked="head._groupedBy ? 1 : 0" v-on:click="config.groupBy(head.title)">
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group-addon span-columns-hidden">
                                {{config.prettyTitle(indexHead)}}
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
            <div v-if="config.handlers.add.active" class="btn-group pull-left">
                <template v-if="config.handlers.add.type === 'inline'">
                    <button type="button" v-on:click="config.initAdd()" class="btn btn-success btn-customized" :class="[config.handlers.add.active ? '' : 'disabled']">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{config.style.noText ? '' : config.style.languageItems[config.style.language].buttons.add}}
                    </button>
                </template>
                <template v-else-if="typeof config.handlers.add === 'object' && config.handlers.add.type === 'modal'">
                    <button type="button" class="btn-circle btn btn-success btn-customized" :class="[config.handlers.add.active ? '' : 'disabled']" data-toggle="modal" :data-target="'#' + config.id + '-addModal'">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{config.style.noText ? '' : config.style.languageItems[config.style.language].buttons.add}}
                    </button>
                    <div class="modal fade" :id="config.id+ '-addModal'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-custom">
                                    <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                                </div>
                                <div class="modal-body modal-body-custom">
                                    <template v-for="(head, indexHead) in config.head" v-if="head.title !== 'id'">
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <span><b>{{config.prettyTitle(indexHead)}}:</b></span>
                                            </div>
                                            <div class="col-sm-7">
                                                <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                                    <select v-if="head.input.type === 'select'" v-model="head._dataAdd.value" class="grid-input grid-select form-control">
                                                        <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                                    </select>
                                                    <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="number">
                                                    <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="email">
                                                    <input v-else v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="text">
                                                </template>
                                                <template v-else>
                                                    <input v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="text">
                                                </template>
                                            </div>
                                        </div>
                                        <div style="height: 10px;"></div>
                                    </template>
                                </div>
                                <div class="modal-footer modal-footer-custom">
                                    <button :id="config.id+ '-closeAddModal'" type="button" v-on:click="config.cancelAdd()" class="btn btn-default btn-customized" data-dismiss="modal">{{config.style.languageItems[config.style.language].handlers.cancel}}</button>
                                    <button type="button" v-on:click="config.addRow()" class="btn btn-primary btn-customized">{{config.style.languageItems[config.style.language].handlers.accept}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div v-if="typeof config.style.pagination === 'object' && typeof config.style.pagination.rowPerPage === 'number' && config.style.pagination.rowPerPage > 0" class="btn-group pull-left">
                <button type="button" class="btn btn-warning dropdown-toggle btn-customized" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> {{config.style.noText ? '' : config.style.languageItems[config.style.language].buttons.selectPagination}} <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon input-columns-hidden">
                                    <input type="radio" :checked="config.style.pagination.rowPerPage === 25" v-on:click="config.updatePageRows(25)">
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group-addon span-columns-hidden">
                                25
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon input-columns-hidden">
                                    <input type="radio" :checked="config.style.pagination.rowPerPage === 50" v-on:click="config.updatePageRows(50)">
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group-addon span-columns-hidden">
                                50
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon input-columns-hidden">
                                    <input type="radio" :checked="config.style.pagination.rowPerPage === 75" v-on:click="config.updatePageRows(75)">
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group-addon span-columns-hidden">
                                75
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon input-columns-hidden">
                                    <input type="radio" :checked="config.style.pagination.rowPerPage === 100" v-on:click="config.updatePageRows(100)">
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="input-group-addon span-columns-hidden">
                                100
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
        <div class="row">
            <div :class="[ config.style.responsive ? 'table-responsive' : '' ]" style="min-height: 300px;">
                <table :class="[ config.style.general ? config.style.general.join(' ') : '' ]">
                    <thead :class="[ config.style.head ? config.style.head.join(' ') : '' ]">
                        <tr>
                            <template v-for="(head, indexHead) in config.head">
                                <th v-if="!head.hidden" :id="head.title" class="no-padding table-width" :draggable="config.style.draggable" @dragstart="config.initSortColumns">
                                    <div class="btn-group full-large-group inline">
                                        <template v-if="head.orderable">
                                            <div class="btn" @dragover.prevent @drop="config.sortColumns" v-on:click.prevent="config.sortList(head._order === 'asc' ? 'desc' : 'asc', head.title, false)">
                                                <span v-if="head._order === 'desc'" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                                <span v-if="head._order === 'asc'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                                <b :id="head.title">{{ config.prettyTitle(indexHead) }}</b>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="btn" @dragover.prevent @drop="config.sortColumns">
                                                <span v-if="head._order === 'desc'" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                                <span v-if="head._order === 'asc'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                                <b :id="head.title">{{ config.prettyTitle(indexHead) }}</b>
                                            </div>
                                        </template>
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="caret"></span>
                                        </button>
                                        
                                        <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                            <li :class="[(head.orderable) ? '' : 'disabled not-active']"><a href="#" v-on:click.prevent="config.sortList('asc', head.title, false)" style="padding-left: 6px"><span class="glyphicon glyphicon-sort-by-alphabet" aria-hidden="true"></span> {{config.style.languageItems[config.style.language].handlers.columns.asc}}</a></li>
                                            <li :class="[(head.orderable) ? '' : 'disabled not-active']"><a href="#" v-on:click.prevent="config.sortList('desc', head.title, false)" style="padding-left: 6px"><span class="glyphicon glyphicon-sort-by-alphabet-alt" aria-hidden="true"></span> {{config.style.languageItems[config.style.language].handlers.columns.desc}}</a></li>
                                            <li role="separator" class="divider"></li>
                                            <li :class="[(head.searchable.active) ? 'dropdown-submenu' : 'dropdown-submenu disabled not-active']">
                                                <a tabindex="-1" href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> {{config.style.languageItems[config.style.language].handlers.columns.search}}</a>
                                                <ul v-if="head.searchable.active" class="dropdown-menu">
                                                    <li v-if="head.searchable.type === 'filter'">
                                                        <div class="input-group">
                                                            <span class="input-group-addon" id="searchGrid"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span>
                                                            <input type="text" class="form-control" :value="head._searchData" :placeholder="config.style.languageItems[config.style.language].handlers.columns.filter" aria-describedby="searchGrid" v-on:keyup="config.search($event.target.value, head.title)">
                                                        </div>
                                                    </li>
                                                    <li v-if="head.searchable.type === 'status'">
                                                        <div v-for="status in head._searchStatusValues" class="row">
                                                            <div class="col-sm-3">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon input-columns-hidden">
                                                                        <input type="radio" :checked="status === head._searchData ? 1 : 0" v-on:click="config.search(status === head._searchData ? '' : status, head.title)">
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <div class="input-group-addon span-columns-hidden">
                                                                    {{status}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                  <!--<li><a tabindex="-1" href="#">Second level</a></li>
                                                    <li class="dropdown-submenu">
                                                        <a href="#">Even More..</a>
                                                        <ul class="dropdown-menu">
                                                            <li><a href="#">3rd level</a></li>
                                                            <li><a href="#">3rd level</a></li>
                                                        </ul>
                                                    </li>-->
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </th>
                            </template>
                            <th :colspan="config.existsCustomHandlers ? 2 : 1" class="no-padding table-width" :class="config.existsCustomHandlers ? 'grid-handler-title-container-custom' : 'grid-handler-title-container'">
                                <div class="btn-group full-large-group inline">
                                    <div class="btn grid-handler-title">
                                        <b>{{config.style.languageItems[config.style.language].handlers.title}}</b>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <template v-if="config.body.length > 0 && !config.body[0]._ofuscate">
                        <tbody :class="[ config.style.body ? config.style.body.join(' ') : '' ]">
                            <template v-if="typeof config.dataGrouping === 'object' && config.dataGrouping.isGrouped">
                                <tr v-if="config.adding">
                                    <td v-if="!head.hidden" v-for="(head, indexHead) in config.head" class="col-md-1">
                                        <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                            <select v-if="head.input.type === 'select'" v-model="head._dataAdd.value" class="grid-input grid-select form-control">
                                                <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                            </select>
                                            <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="number">
                                            <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="email">
                                            <input v-else v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="text">
                                        </template>
                                        <template v-else>
                                            <input v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="[config.head[indexHead]._dataAdd.validation === true ? 'grid-input-unvalidated' : '', 'grid-input', 'form-control']" type="text">
                                        </template>
                                    </td>
                                    <td class="col-md-1 text-center">
                                        <a href="#" v-on:click.prevent="config.addRow()" class="alert alert-success grid-handlers" :title="config.style.languageItems[config.style.language].handlers.accept">
                                            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                        </a>
                                        <a href="#" v-on:click.prevent="config.cancelAdd()" class="alert alert-warning grid-handlers" :title="config.style.languageItems[config.style.language].handlers.cancel">
                                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
                                        </a>
                                    </td>
                                </tr>
                                <template v-for="(groupBy, indexHead2) in config.head" v-if="groupBy._groupedBy">
                                    <template v-for="(dataGrouping, index) in config.dataGrouping.state">
                                        <tr>
                                            <td :colspan="config.groupColSpan() + 1" class="col-md-1">
                                                <a href="#" v-on:click.prevent="config.changeGroupVisibility(index, indexHead2)" class="alert alert-info grid-handlers" :title="[dataGrouping[1] ? config.style.languageItems[config.style.language].handlers.group.show : config.style.languageItems[config.style.language].handlers.group.hide]">
                                                    <span :class="[dataGrouping[1] ? 'glyphicon glyphicon-plus' : 'glyphicon glyphicon-minus']" aria-hidden="true"></span>
                                                </a>
                                                <b>{{ dataGrouping[0] }}</b>
                                            </td>
                                        </tr>
                                        <tr v-for="(data, semiIndex) in config.body" v-if="!data._hidden && !data._ofuscate" :class="[ typeof config.style.row === 'object' && config.style.row.active === true && typeof config.style.row.styleClass === 'object' ? config.style.row.styleClass.join(' ') : '', config.highlightHandlers && data._highlight ? config.style.highlight.styleClass.join(' ') : '' ]">
                                            <template v-if="typeof groupBy.input === 'object' && groupBy.input.type === 'select'">
                                                <template v-if="config.getSelectData(semiIndex, indexHead2) === dataGrouping[0]">
                                                    <td v-if="!head.hidden" v-for="(head, indexHead) in config.head" class="col-md-1">
                                                        <template v-if="config.handlers.edit.type === 'inline' && data._editing && head.editable">
                                                            <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                                                <select v-if="head.input.type === 'select'" v-model="data[head.title]" class="grid-input grid-select form-control">
                                                                    <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                                                </select>
                                                                <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="number">
                                                                <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="email">
                                                                <input v-else v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                                            </template>
                                                            <template v-else>
                                                                <input v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                                            </template>
                                                        </template>
                                                        <template v-else-if="config.existsFullHandler()[0]">
                                                            <a href="#" v-on:click.prevent="config.customHandlers[config.existsFullHandler()[1]].handler(data); config.highlightRow(semiIndex, config.existsFullHandler()[1])" :class="typeof config.customHandlers[config.existsFullHandler()[1]].anchorCellClass === 'object' ? config.customHandlers[config.existsFullHandler()[1]].anchorCellClass.join(' ') : ''">
                                                                <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                                    {{ config.getSelectData(semiIndex, indexHead) }}
                                                                </template>
                                                                <template v-else>
                                                                    {{ data[head.title] }}
                                                                </template>
                                                            </a>
                                                        </template>
                                                        <template v-else>
                                                            <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                                {{ config.getSelectData(semiIndex, indexHead) }}
                                                            </template>
                                                            <template v-else>
                                                                {{ data[head.title] }}
                                                            </template>
                                                        </template>
                                                    </td>
                                                    <td class="col-md-1 text-center">
                                                        <template v-if="config.handlers.watch.type === 'modal'">
                                                            <a href="#" v-on:click.prevent="config.watchRow(semiIndex)" class="alert alert-info grid-handlers" :title="config.style.languageItems[config.style.language].handlers.watch" data-toggle="modal" :data-target="'#' + config.id + '-watchModal'">
                                                                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                            </a>
                                                        </template>
                                                        <template v-else-if="config.handlers.watch.type === 'template'">
                                                            <a href="#" v-on:click.prevent="config.templateWatch(data.id, semiIndex)" class="alert alert-info grid-handlers" :title="config.style.languageItems[config.style.language].handlers.watch">
                                                                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                            </a>
                                                        </template>
                                                        <template v-if="config.handlers.edit.active">
                                                            <template v-if="config.handlers.edit.type === 'inline'">
                                                                <template v-if="!data._editing">
                                                                    <a href="#" v-on:click.prevent="config.initEdit(semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit">
                                                                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                                    </a>
                                                                </template>
                                                                <template v-else>
                                                                    <a href="#" v-on:click.prevent="config.finishEdit(data, semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-warning grid-handlers' : 'alert alert-warning grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.accept">
                                                                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                                                    </a>
                                                                </template>
                                                            </template>
                                                            <template v-else-if="config.handlers.edit.type === 'modal'">
                                                                <a href="#" v-on:click.prevent="config.initEdit(semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit" data-toggle="modal" :data-target="'#' + config.id + '-editModal'">
                                                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                                </a>
                                                            </template>
                                                            <template v-else-if="config.handlers.edit.type === 'template'">
                                                                <a href="#" v-on:click.prevent="config.templateEdit(data.id, semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit">
                                                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                                </a>
                                                            </template>
                                                        </template>
                                                        <a v-if="config.handlers.remove.active" href="#" v-on:click.prevent="config.confirmRemove(data, semiIndex)" :class="[config.handlers.remove.active ? 'alert alert-danger grid-handlers' : 'alert alert-danger grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.remove">
                                                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                        </a>
                                                    </td>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <template v-if="data[groupBy.title] === dataGrouping[0]">
                                                    <td v-if="!head.hidden" v-for="(head, indexHead) in config.head" class="col-md-1">
                                                        <template v-if="config.handlers.edit.type === 'inline' && data._editing && head.editable">
                                                            <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                                                <select v-if="head.input.type === 'select'" v-model="data[head.title]" class="grid-input grid-select form-control">
                                                                    <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                                                </select>
                                                                <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="number">
                                                                <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="email">
                                                                <input v-else v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                                            </template>
                                                            <template v-else>
                                                                <input v-on:keyup="config.reValidateEdit(semiIndex, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                                            </template>
                                                        </template>
                                                        <template v-else-if="config.existsFullHandler()[0]">
                                                            <a href="#" v-on:click.prevent="config.customHandlers[config.existsFullHandler()[1]].handler(data); config.highlightRow(semiIndex, config.existsFullHandler()[1])" :class="[typeof config.customHandlers[config.existsFullHandler()[1]].anchorCellClass === 'object' ? config.customHandlers[config.existsFullHandler()[1]].anchorCellClass.join(' ') : '']">
                                                                <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                                    {{ config.getSelectData(semiIndex, indexHead) }}
                                                                </template>
                                                                <template v-else>
                                                                    {{ data[head.title] }}
                                                                </template>
                                                            </a>
                                                        </template>
                                                        <template v-else>
                                                            <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                                {{ config.getSelectData(semiIndex, indexHead) }}
                                                            </template>
                                                            <template v-else>
                                                                {{ data[head.title] }}
                                                            </template>
                                                        </template>
                                                    </td>
                                                    <td class="col-md-1 text-center">
                                                        <template v-if="config.handlers.watch.active">
                                                            <template v-if="config.handlers.watch.type === 'modal'">
                                                                <a href="#" v-on:click.prevent="config.watchRow(semiIndex)" class="alert alert-info grid-handlers" :title="config.style.languageItems[config.style.language].handlers.watch" data-toggle="modal" :data-target="'#' + config.id + '-watchModal'">
                                                                    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                                </a>
                                                            </template>
                                                            <template v-else-if="config.handlers.watch.type === 'template'">
                                                                <a href="#" v-on:click.prevent="config.templateWatch(data.id, semiIndex)" class="alert alert-info grid-handlers" :title="config.style.languageItems[config.style.language].handlers.watch">
                                                                    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                                </a>
                                                            </template>
                                                        </template>
                                                        <template v-if="config.handlers.edit.active">
                                                            <template v-if="config.handlers.edit.type === 'inline'">
                                                                <template v-if="!data._editing">
                                                                    <a href="#" v-on:click.prevent="config.initEdit(semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit">
                                                                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                                    </a>
                                                                </template>
                                                                <template v-else>
                                                                    <a href="#" v-on:click.prevent="config.finishEdit(data, semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-warning grid-handlers' : 'alert alert-warning grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.accept">
                                                                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                                                    </a>
                                                                </template>
                                                            </template>
                                                            <template v-else-if="config.handlers.edit.type === 'modal'">
                                                                <a href="#" v-on:click.prevent="config.initEdit(semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit" data-toggle="modal" :data-target="'#' + config.id + '-editModal'">
                                                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                                </a>
                                                            </template>
                                                            <template v-else-if="config.handlers.edit.type === 'template'">
                                                                <a href="#" v-on:click.prevent="config.templateEdit(data.id, semiIndex)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit">
                                                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                                </a>
                                                            </template>
                                                        </template>
                                                        <a v-if="config.handlers.remove.active" href="#" v-on:click.prevent="config.confirmRemove(data, semiIndex)" :class="[config.handlers.remove.active ? 'alert alert-danger grid-handlers' : 'alert alert-danger grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.remove">
                                                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                        </a>
                                                    </td>
                                                    <td v-if="config.existsCustomHandlers" class="col-md-1 text-center">
                                                        <a v-for="(customH, customIndex) in config.customHandlers" href="#" v-on:click.prevent="customH.handler(data); config.highlightRow(semiIndex, customIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" :title="customH.title">
                                                            <span :class="['glyphicon', customH.glyphiconClass]" aria-hidden="true"></span>
                                                        </a>
                                                    </td>
                                                </template>
                                            </template>
                                        </tr>
                                    </template>
                                </template>
                            </template>
                            <template v-else>
                                <tr v-if="config.adding">
                                    <td v-if="!head.hidden" v-for="(head, indexHead) in config.head" class="col-md-1">
                                        <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                            <select v-if="head.input.type === 'select'" v-model="head._dataAdd.value" class="grid-input grid-select form-control">
                                                <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                            </select>
                                            <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="{ 'grid-input-unvalidated': config.head[indexHead]._dataAdd.validation }" class="grid-input form-control" type="number">
                                            <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="{ 'grid-input-unvalidated': config.head[indexHead]._dataAdd.validation }" class="grid-input form-control" type="email">
                                            <input v-else v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="{ 'grid-input-unvalidated': config.head[indexHead]._dataAdd.validation }" class="grid-input form-control" type="text">
                                        </template>
                                        <template v-else>
                                            <input v-on:keyup="config.reValidateAdd(indexHead)" v-model="head._dataAdd.value" :class="{ 'grid-input-unvalidated': config.head[indexHead]._dataAdd.validation }" class="grid-input form-control" type="text">
                                        </template>
                                    </td>
                                    <td class="col-md-1 text-center">
                                        <a href="#" v-on:click.prevent="config.addRow()" class="alert alert-success grid-handlers" :title="config.style.languageItems[config.style.language].handlers.accept">
                                            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                        </a>
                                        <a href="#" v-on:click.prevent="config.cancelAdd()" class="alert alert-warning grid-handlers" :title="config.style.languageItems[config.style.language].handlers.cancel">
                                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
                                        </a>
                                    </td>
                                </tr>
                                <tr v-for="(data, index) in config.body" v-if="!data._hidden && !data._ofuscate" :class="[ typeof config.style.row === 'object' && config.style.row.active === true && typeof config.style.row.styleClass === 'object' ? config.style.row.styleClass.join(' ') : '', config.highlightHandlers && data._highlight ? config.style.highlight.styleClass.join(' ') : '' ]">
                                    <td v-if="!head.hidden" v-for="(head, indexHead) in config.head" class="col-md-1">
                                        <template v-if="config.handlers.edit.type === 'inline' && data._editing && head.editable">
                                            <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                                <select v-if="head.input.type === 'select'" v-model="data[head.title]" class="grid-input grid-select form-control">
                                                    <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                                </select>
                                                <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateEdit(index, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="number">
                                                <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateEdit(index, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="email">
                                                <input v-else v-on:keyup="config.reValidateEdit(index, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                            </template>
                                            <template v-else>
                                                <input v-on:keyup="config.reValidateEdit(index, indexHead)" v-model="data[head.title]" :placeholder="data[head.title]" :class="[data['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                            </template>
                                        </template>
                                        <template v-else-if="config.existsFullHandler()[0]">
                                            <a href="#" v-on:click.prevent="config.customHandlers[config.existsFullHandler()[1]].handler(data); config.highlightRow(index, config.existsFullHandler()[1])" :class="[typeof config.customHandlers[config.existsFullHandler()[1]].anchorCellClass === 'object' ? config.customHandlers[config.existsFullHandler()[1]].anchorCellClass.join(' ') : '']">
                                                <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                    {{ config.getSelectData(index, indexHead) }}
                                                </template>
                                                <template v-else>
                                                    {{ data[head.title] }}
                                                </template>
                                            </a>
                                        </template>
                                        <template v-else>
                                            <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                {{ config.getSelectData(index, indexHead) }}
                                            </template>
                                            <template v-else>
                                                {{ data[head.title] }}
                                            </template>
                                        </template>
                                    </td>
                                    <td class="col-md-1 text-center">
                                        <template v-if="config.handlers.watch.active">
                                            <template v-if="config.handlers.watch.type === 'modal'">
                                                <a href="#" v-on:click.prevent="config.watchRow(index)" class="alert alert-info grid-handlers" :title="config.style.languageItems[config.style.language].handlers.watch" data-toggle="modal" :data-target="'#' + config.id + '-watchModal'">
                                                    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                </a>
                                            </template>
                                            <template v-else-if="config.handlers.watch.type === 'template'">
                                                <a href="#" v-on:click.prevent="config.templateWatch(data.id, index)" class="alert alert-info grid-handlers" :title="config.style.languageItems[config.style.language].handlers.watch">
                                                    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                </a>
                                            </template>
                                        </template>
                                        <template v-if="config.handlers.edit.active">
                                            <template v-if="config.handlers.edit.type === 'inline'">
                                                <template v-if="!data._editing">
                                                    <a href="#" v-on:click.prevent="config.initEdit(index)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit">
                                                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </a>
                                                </template>
                                                <template v-else>
                                                    <a href="#" v-on:click.prevent="config.finishEdit(data, index)" :class="[config.handlers.edit.active ? 'alert alert-warning grid-handlers' : 'alert alert-warning grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.accept">
                                                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                                    </a>
                                                </template>
                                            </template>
                                            <template v-else-if="config.handlers.edit.type === 'modal'">
                                                <a href="#" v-on:click.prevent="config.initEdit(index)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit" data-toggle="modal" :data-target="'#' + config.id + '-editModal'">
                                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                </a>
                                            </template>
                                            <template v-else-if="config.handlers.edit.type === 'template'">
                                                <a href="#" v-on:click.prevent="config.templateEdit(data.id, index)" :class="[config.handlers.edit.active ? 'alert alert-success grid-handlers' : 'alert alert-success grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.edit">
                                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                </a>
                                            </template>
                                        </template>
                                        <a v-if="config.handlers.remove.active" href="#" v-on:click.prevent="config.confirmRemove(data, index)" :class="[config.handlers.remove.active ? 'alert alert-danger grid-handlers' : 'alert alert-danger grid-handlers not-active']" :title="config.style.languageItems[config.style.language].handlers.remove">
                                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        </a>
                                    </td>
                                    <td v-if="config.existsCustomHandlers" class="col-md-1 text-center">
                                        <a v-for="(customH, customIndex) in config.customHandlers" href="#" v-on:click.prevent="customH.handler(data); config.highlightRow(index, customIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" :title="customH.title">
                                            <span :class="['glyphicon', customH.glyphiconClass]" aria-hidden="true"></span>
                                        </a>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </table>
                <template v-if="(config.body.length === 1 && config.body[0]._ofuscate === true) || config.body.length === 0">
                    <p class="text-center">
                        <i>Actualmente no existen registros para mostrar.</i>
                    </p>
                </template>
                <template v-if="typeof config.handlers.edit === 'object' && config.handlers.edit.type === 'modal'">
                    <div class="modal fade" :id="config.id+ '-editModal'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-custom">
                                    <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                                </div>
                                <div class="modal-body modal-body-custom">
                                    <template v-for="(head, indexHead) in config.head" v-if="head.title !== 'id'">
                                        <div class="row" v-if="head.editable">
                                            <div class="col-sm-5">
                                                <span><b>{{config.prettyTitle(indexHead)}}:</b></span>
                                            </div>
                                            <div class="col-sm-7">
                                                <template v-if="typeof head.input === 'object' && typeof head.input.type === 'string'">
                                                    <select v-if="head.input.type === 'select'" v-model="config.editingBody[head.title]" class="grid-input grid-select form-control">
                                                        <option v-for="options in head.input.options" :value="options.value">{{options.text}}</option>
                                                    </select>
                                                    <input v-else-if="head.input.type === 'number'" v-on:keyup="config.reValidateEdit(null, indexHead)" v-model="config.editingBody[head.title]" :placeholder="config.editingBody[head.title]" :class="[config.editingBody['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="number">
                                                    <input v-else-if="head.input.type === 'email'" v-on:keyup="config.reValidateEdit(null, indexHead)" v-model="config.editingBody[head.title]" :placeholder="config.editingBody[head.title]" :class="[config.editingBody['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="email">
                                                    <input v-else v-on:keyup="config.reValidateEdit(null, indexHead)" v-model="config.editingBody[head.title]" :placeholder="config.editingBody[head.title]" :class="[config.editingBody['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                                </template>
                                                <template v-else>
                                                    <input v-on:keyup="config.reValidateEdit(null, indexHead)" v-model="config.editingBody[head.title]" :placeholder="config.editingBody[head.title]" :class="[config.editingBody['_unvalidated-'+indexHead] === true ? 'grid-input form-control grid-input-unvalidated' : 'grid-input form-control']" type="text">
                                                </template>
                                            </div>
                                        </div>
                                        <div style="height: 10px;"></div>
                                    </template>
                                </div>
                                <div class="modal-footer modal-footer-custom">
                                    <button :id="config.id+ '-closeEditModal'" type="button" class="btn btn-default btn-customized" data-dismiss="modal">{{config.style.languageItems[config.style.language].handlers.cancel}}</button>
                                    <button type="button" v-on:click="config.finishEdit(null, null)" class="btn btn-primary btn-customized">{{config.style.languageItems[config.style.language].handlers.accept}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="modal fade" :id="config.id+ '-watchModal'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header modal-header-custom">
                                <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                            </div>
                            <div class="modal-body modal-body-custom">
                                <template v-for="(head, indexHead) in config.head" v-if="head.title !== 'id'">
                                    <div class="row" v-if="head.title !== 'id'">
                                        <div class="col-sm-6">
                                            <span><b>{{config.prettyTitle(indexHead)}}:</b></span>
                                        </div>
                                        <div class="col-sm-6">
                                            <template v-if="typeof head.input === 'object' && head.input.type === 'select'">
                                                {{ config.getSelectData(config.watchBody.actualIndex, indexHead) }}
                                            </template>
                                            <template v-else>
                                                {{ config.watchBody[head.title] }}
                                            </template>
                                        </div>
                                    </div>
                                    <div style="height: 10px;"></div>
                                </template>
                            </div>
                            <div class="modal-footer modal-footer-custom">
                                <button type="button" class="btn btn-default btn-customized" data-dismiss="modal">{{config.style.languageItems[config.style.language].alert.ok}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="typeof config.style.pagination === 'object' && typeof config.style.pagination.rowPerPage === 'number' && config.style.pagination.rowPerPage > 0" class="row">
            <nav v-if="typeof config.webService === 'object' && typeof config.webService.model === 'object' && config.webService.active" class="pull-right">
                <ul class="pagination">
                    <li>
                        <span><b>{{ config.style.languageItems[config.style.language].pagination.information[0] + config.recordsPagination(0) + config.style.languageItems[config.style.language].pagination.information[1] + config.style.pagination.totalRowCount + config.style.languageItems[config.style.language].pagination.information[2] + config.recordsPagination(2) + config.style.languageItems[config.style.language].pagination.information[3] + config.recordsPagination(3) }}.</b></span>
                    </li>
                    <li :class="[ config.dataPagination[0][0] ? 'disabled not-active' : '' ]">
                        <a href="#" v-on:click.prevent="config.updatePages(1, true)" :title="config.style.languageItems[config.style.language].handlers.first">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li>
                        <span v-if="config.dataPagination.length > 7 && config.notAllPages(true)" aria-hidden="true">...</span>
                    </li>
                    <li v-for="data in config.dataPagination" v-if="data[0] !== null" :class="[ data[0] ? 'active' : '' ]"><a href="#" v-on:click.prevent="config.updatePages(data[1], true)">{{data[1]}}</a></li>
                    <li>
                        <span v-if="config.dataPagination.length > 7 && config.notAllPages(false)" aria-hidden="true">...</span>
                    </li>
                    <li :class="[ config.dataPagination[config.dataPagination.length - 1][0] ? 'disabled not-active' : '' ]">
                        <a href="#" v-on:click.prevent="config.updatePages(config.dataPagination.length, true)" :title="config.style.languageItems[config.style.language].handlers.last">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <nav v-else class="pull-right">
                <ul class="pagination">
                    <li>
                        <span><b>{{ config.style.languageItems[config.style.language].pagination.information[0] + config.recordsPagination(0) + config.style.languageItems[config.style.language].pagination.information[1] + config.recordsPagination(1) + config.style.languageItems[config.style.language].pagination.information[2] + config.recordsPagination(2) + config.style.languageItems[config.style.language].pagination.information[3] + config.recordsPagination(3) }}.</b></span>
                    </li>
                    <li :class="[ config.dataPagination[0][0] ? 'disabled not-active' : '' ]">
                        <a href="#" v-on:click.prevent="config.updatePages(1)" :title="config.style.languageItems[config.style.language].handlers.first">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li>
                        <span v-if="config.dataPagination.length > 7 && config.notAllPages(true)" aria-hidden="true">...</span>
                    </li>
                    <li v-for="data in config.dataPagination" v-if="data[0] !== null" :class="[ data[0] ? 'active' : '' ]"><a href="#" v-on:click.prevent="config.updatePages(data[1])">{{data[1]}}</a></li>
                    <li>
                        <span v-if="config.dataPagination.length > 7 && config.notAllPages(false)" aria-hidden="true">...</span>
                    </li>
                    <li :class="[ config.dataPagination[config.dataPagination.length - 1][0] ? 'disabled not-active' : '' ]">
                        <a href="#" v-on:click.prevent="config.updatePages(config.dataPagination.length)" :title="config.style.languageItems[config.style.language].handlers.last">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
`;
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//config in head:
//    orderable (true || false)
//    searchable ->type (filter, status)
//                -> active (true || false)
//    editable (true || false)
//    hidden (true || false)
//    groupable (true || false)
//    input -> type (email, text, number, select (true || false) <-> options : Object-> (value, text) <-> model : Object-> (source, value, text)))
//          -> required (true || false)

//config in style:
//    noText (true || false) To hide or show texts of main buttons
//    general (array of styles)
//    head (array of styles)
//    body (array of styles)
//    row -> active (true || false)
//        -> styleClass (array of styles)
//    highlight -> active (true || false)
//        -> styleClass (array of styles)
//    responsive (true || false)
//    pagination -> rowPerPage (>0)
//    draggable (true || false)
//    language: 'spa' || 'eng'

//config in handlers:
//    watch -> type (modal, template)
//         -> active (true || false)
//    add -> type (modal, inline, template)
//        -> active (true || false)
//    edit -> type (modal, inline, template)
//         -> active (true || false)
//         -> highlight (true || false) -> To highlight row selected
//    remove -> active (true || false)
//config in customHandlers: This must be an Array of Objects, each object has:
//    active (true || false)
//    title (string)
//    glyphiconClass (string of glyphicon class, not general, just specific icon)
//    fullHandler (true || false) -> To know what handler will be fired by all the row
//    highlight (true || false) -> To highlight row selected
//    anchorCellClass -> (array of styles for anchor of customHandler)
//    handler (function) -> return data of clicked row
// config root, callbacks:
//    templateWatch (function) -> called on watch of template type
//    templateEdit (function) -> called on edit of template type
//    beforeEdit (function) -> called before edit
//    beforeAdd (function) -> called before add
//    beforeRemove (function) -> called before remove, return data confirm message and success function to run onAccept of confirm
//    onEdit (function) -> return data of edited row
//    onAdd (function) -> return data of new row
//    onRemove (function) -> return data of removed row
//    onDragEnd (function) -> return head columns with order updated
//    onChangeColumns (function) -> return hidden status of columns
//    setVisibilityColumns (function) -> Send array of booleans with equal length of grid columns (TRUE hide, FALSE show)
//    setSortColumns (function) -> Send object of columns names equal to positions

//WebService methods
//    editDelimiters (function) -> alter delimiters table within a sended value
//    updatePagination (function) -> update mcdatatable values
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var mcdatatable = function(configuration){
    if(typeof configuration === "object" &&
       typeof configuration.head === "object" && configuration.head.length > 0 &&
       ((typeof configuration.body === "object" && configuration.body.length > 0) ||
        (typeof configuration.webService === "object" && typeof configuration.webService.model === "object" && configuration.webService.active)) &&
       typeof configuration.style === "object"){
        
        var bodySqueleton = {};
            bodySqueleton._editing = false;
            bodySqueleton._hidden = false;
            bodySqueleton._highlight = false;
            bodySqueleton._ofuscate = true;
        var bodyEditingSqueleton = {};
            bodyEditingSqueleton._editing = false;
            bodyEditingSqueleton._hidden = false;
            bodyEditingSqueleton._highlight = false;
            bodyEditingSqueleton._ofuscate = true;
        var bodyWatchSqueleton = {};
        configuration.initHeadStatus = [];
        for(var indexHead in configuration.head){
            if(typeof configuration.head[indexHead].input === "object" &&
               typeof configuration.head[indexHead].input.type === "string" &&
               configuration.head[indexHead].input.type === "number"){
                bodySqueleton[configuration.head[indexHead].title] = 0;
                bodyEditingSqueleton[configuration.head[indexHead].title] = 0;
                bodyWatchSqueleton[configuration.head[indexHead].title] = 0;
            }
            else{
                bodySqueleton[configuration.head[indexHead].title] = "";
                bodyEditingSqueleton[configuration.head[indexHead].title] = "";
                bodyWatchSqueleton[configuration.head[indexHead].title] = "";
            }
            if(configuration.head[indexHead].editable){
                bodySqueleton['_unvalidated-'+indexHead] = false;
                bodyEditingSqueleton['_unvalidated-'+indexHead] = false;
            }
            
            if(typeof configuration.head[indexHead].input === "object" &&
               typeof configuration.head[indexHead].input.type === "string" &&
               configuration.head[indexHead].input.type === "select" &&
               typeof configuration.head[indexHead].input.model === "object")
                configuration.head[indexHead].input.options = [{value: null, text: null}];
            
            configuration.initHeadStatus[configuration.head[indexHead].title] = configuration.head[indexHead].hidden === true ? configuration.head[indexHead].hidden : false;
        }
        configuration.watchBody = bodyWatchSqueleton;
        configuration.watchBody.actualIndex = 0;
        if(typeof configuration.webService === "object" &&
        typeof configuration.webService.model === "object" &&
        configuration.webService.active){
            configuration.body = [];
            configuration.body.push(bodySqueleton);
            
            if(!(typeof configuration.style.pagination === 'object' &&
            typeof configuration.style.pagination.rowPerPage === 'number' &&
             configuration.style.pagination.rowPerPage > 0))
                configuration.style.pagination = {
                    currentPage: 1,
                    pageCount: 1,
                    rowPerPage: 10,
                    totalRowCount: 1
                };
            else{
                configuration.style.pagination.currentPage = 1;
                configuration.style.pagination.pageCount = 1;
                configuration.style.pagination.totalRowCount = 1;
            }
        }
        
        var groupable = false,
            editable = false;
        var beforeEdit = null,
            beforeAdd = null,
            beforeRemove = null,
            templateEdit = null,
            templateWatch = null,
            onEdit = null,
            onAdd = null,
            onRemove = null,
            onDragEnd = null,
            onChangeColumns = null;
        if(typeof configuration.style.draggable === "undefined" ||
           configuration.style.draggable !== true)
            configuration.style.draggable = false;
        if(configuration.style.draggable)
            configuration.dataDragged = null;
        if(configuration.style.draggable && typeof configuration.onDragEnd === "function")
            onDragEnd = configuration.onDragEnd;
        else
            onDragEnd = function(){};
        if(typeof configuration.onChangeColumns === "function")
            onChangeColumns = configuration.onChangeColumns;
        else
            onChangeColumns = function(){};
        if(typeof configuration.handlers === "undefined" || typeof configuration.handlers !== "object")
            configuration.handlers = {
                add: {active: false, type: "inline"},
                edit: {active: false, type: "inline"},
                remove: {active: false, type: "inline"}
            };
        else if(typeof configuration.handlers === "object"){
            if(typeof configuration.handlers.add === "undefined" || configuration.handlers.add.active !== true)
                configuration.handlers.add = {active: false, type: "inline"};
            if(typeof configuration.handlers.add.type === "undefined" || (configuration.handlers.add.type !== "inline" &&
               configuration.handlers.add.type !== "template" && configuration.handlers.add.type !== "modal"))
                configuration.handlers.add.type = "inline";
            if(typeof configuration.handlers.edit === "undefined" || configuration.handlers.edit.active !== true)
                configuration.handlers.edit = {active: false, type: "inline"};
            if(typeof configuration.handlers.edit.type === "undefined" || (configuration.handlers.edit.type !== "inline" &&
               configuration.handlers.edit.type !== "template" && configuration.handlers.edit.type !== "modal"))
                configuration.handlers.edit.type = "inline";
            if(typeof configuration.handlers.remove === "undefined" || configuration.handlers.remove.active !== true)
                configuration.handlers.remove = {active: false};
        }
        for(var index in configuration.head){
            if(typeof configuration.head[index].orderable === "undefined")
                configuration.head[index].orderable = false;
            if(typeof configuration.head[index].searchable === "undefined" ||
               configuration.head[index].searchable.active !== true)
                configuration.head[index].searchable = {
                    active: false
                };
            else if(configuration.head[index].searchable.active === true &&
                    (configuration.head[index].searchable.type !== "filter" && configuration.head[index].searchable.type !== "status"))
                configuration.head[index].searchable.type = "filter";
            if(configuration.head[index].searchable.active === true)
                configuration.head[index]._searchData = "";
            if(configuration.head[index].searchable.type === "status")
                configuration.head[index]._searchStatusValues = [];
            if(typeof configuration.head[index].groupable === "undefined")
                configuration.head[index].groupable = false;
            if(configuration.head[index].groupable === true){
                configuration.head[index]._groupedBy = false;
                groupable = true;
            }
            if(typeof configuration.handlers.edit === "undefined" || configuration.handlers.edit.active !== true ||
               configuration.head[index].editable !== true)
                configuration.head[index].editable = false;
                
            if(typeof configuration.head[index].hidden === "undefined")
                configuration.head[index].hidden = false;
            configuration.head[index]._order = null;
            if(configuration.style.draggable)
                configuration.head[index]._position = parseInt(index);
        }
        for(index in configuration.head)
            if(configuration.head[index].editable)
                editable = true;
        configuration.handlers.edit.active = editable;
        if(configuration.handlers.edit.type === "modal"){
            configuration.editingBody = bodyEditingSqueleton;
            configuration.editingBody.actualIndex = 0;
        }
        if(configuration.handlers.edit.active && typeof configuration.beforeEdit === "function")
            beforeEdit = configuration.beforeEdit;
        else
            beforeEdit = function(){};
        if(configuration.handlers.watch.active && typeof configuration.templateWatch === "function")
            templateWatch = configuration.templateWatch;
        else
            templateWatch = function(){}; 
        if(configuration.handlers.edit.active && typeof configuration.templateEdit === "function")
            templateEdit = configuration.templateEdit;
        else
            templateEdit = function(){}; 
        if(configuration.handlers.edit.active && typeof configuration.onEdit === "function")
            onEdit = configuration.onEdit;
        else
            onEdit = function(){};
        if(configuration.handlers.add.active && typeof configuration.beforeAdd === "function")
            beforeAdd = configuration.beforeAdd;
        else
            beforeAdd = function(){};
        if(configuration.handlers.add.active && typeof configuration.onAdd === "function")
            onAdd = configuration.onAdd;
        else
            onAdd = function(){};
        if(configuration.handlers.add.active){
            configuration.adding = false;
            for(index in configuration.head)
                configuration.head[index]._dataAdd = {
                    value: "",
                    validation: false
                };
        }
        if(configuration.handlers.remove.active && typeof configuration.beforeRemove === "function")
            beforeRemove = configuration.beforeRemove;
        else
            beforeRemove = function(){};
        if(configuration.handlers.remove.active && typeof configuration.onRemove === "function")
            onRemove = configuration.onRemove;
        else
            onRemove = function(){};
        delete configuration.beforeAdd;
        delete configuration.beforeRemove;
        delete configuration.beforeEdit;
        delete configuration.templateWatch;
        delete configuration.templateEdit;
        delete configuration.onEdit;
        delete configuration.onAdd;
        delete configuration.onRemove;
        delete configuration.onDragEnd;
        delete configuration.onChangeColumns;
        
        configuration.existsCustomHandlers = false;
        configuration.highlightHandlers = false;
        if(typeof configuration.customHandlers === "object" &&
           configuration.customHandlers.length > 0)
            for(index in configuration.customHandlers){
                if(configuration.customHandlers[index].active)
                    configuration.existsCustomHandlers = true;
                if(typeof configuration.style.highlight === "object" &&
                   typeof configuration.style.highlight.styleClass === "object" &&
                   configuration.style.highlight.active === true)
                    configuration.highlightHandlers = true;
            }
        
        for(index in configuration.body){
            configuration.body[index]._hidden = false;
            if(configuration.handlers.edit.active)
                configuration.body[index]._editing = false;
            if(configuration.highlightHandlers)
                configuration.body[index]._highlight = false;
        }
        for(indexHead in configuration.head)
            if(configuration.head[indexHead].editable)
                for(index in configuration.body)
                    configuration.body[index]['_unvalidated-'+indexHead] = false;
        
        if(typeof configuration.style.pagination === 'object' &&
           typeof configuration.style.pagination.rowPerPage === 'number' &&
            configuration.style.pagination.rowPerPage > 0){
            if(typeof configuration.webService === "object" &&
            typeof configuration.webService.model === "object" &&
            configuration.webService.active){
                var b = 1;
                configuration.dataPagination = [];
                for(var index in configuration.body)
                    configuration.dataPagination.push([(b === 1), b++]);
            }
            else{
                var a = 1;
                configuration.dataPagination = [];
                for(var index in configuration.body)
                    if(index % configuration.style.pagination.rowPerPage === 0)
                        configuration.dataPagination.push([(a === 1), a++]);
                
                if(groupable)   //We need a temp for pagination
                    configuration.tempPagination = {
                        style: configuration.style.pagination,
                        data: configuration.dataPagination
                    };
            }
        }
        if(groupable)   //We need a temp for pagination
            configuration.dataGrouping = {
                isGrouped : false,
                state: []
            };
        if(typeof configuration.style.language !== "undefined"){
            if(configuration.style.language !== "eng")
                configuration.style.language = "spa";
        }
        else
            configuration.style.language = "spa";
        configuration.style.languageItems = {
            eng: {
                handlers: {
                    columns: {
                        asc: "Ascendant order",
                        desc: "Descendant order",
                        search: "Search",
                        filter: "Filter",
                        reset: "Reset"
                    },
                    edit: "Edit",
                    remove: "Remove",
                    accept: "Save",
                    watch: "See",
                    cancel: "Cancel",
                    title: "Handlers",
                    group: {
                        hide: "Hide",
                        show: "Show"
                    }
                },
                buttons: {
                    add: "Add record",
                    group: "Group by",
                    column: "Columns",
                    selectPagination: "Rows per page"
                },
                pagination: {
                    information: [
                        "Showing ",
                        " of ",
                        " rows from page ",
                        " of "
                    ],
                    buttons: {
                        last: "Last",
                        first: "First"
                    }
                },
                alert: {
                    title: "Validation errors",
                    text: "There are some errors on input data, try again.",
                    ok: "Accept"
                },
                confirm: {
                    title: "Deletion confirmation",
                    text: "¿Are you sure you want to erase this row?",
                    accept: "Accept",
                    cancel: "Cancel"
                }
            },
            spa: {
                handlers: {
                    columns: {
                        asc: "Orden ascendente",
                        desc: "Orden descendente",
                        search: "Búsqueda",
                        filter: "Filtro",
                        reset: "Reinicializar"
                    },
                    edit: "Editar",
                    remove: "Eliminar",
                    accept: "Guardar",
                    watch: "Ver",
                    cancel: "Cancelar",
                    title: "Acciones",
                    group: {
                        hide: "Esconder",
                        show: "Mostrar"
                    }
                },
                buttons: {
                    add: "Nuevo registro",
                    group: "Agrupar por",
                    column: "Columnas",
                    selectPagination: "Filas por página"
                },
                pagination: {
                    information: [
                        "Mostrando ",
                        " de ",
                        " filas en la página ",
                        " de "
                    ],
                    buttons: {
                        last: "Última",
                        first: "Primera"
                    }
                },
                alert: {
                    title: "Errores en validación",
                    text: "Existen algunos errores en los datos de entrada, inténtalo de nuevo.",
                    ok: "Aceptar"
                },
                confirm: {
                    title: "Confirmación de borrado",
                    text: "¿Deseas borrar el registro seleccionado?",
                    accept: "Aceptar",
                    cancel: "Cancelar"
                }
            }
        };
        this.table = new Vue({
            data: configuration,
            methods: {
                onChangeColumns: onChangeColumns,
                setVisibilityColumns: function(e){
                    for(var i in this.head)
                        this.head[i].hidden = e[this.head[i].title];
                },
                setSortColumns: function(e){
                    for(var i in e)
                        for(var j in this.head)
                            if(this.head[j].title === i)
                                this.head[j]._position = e[i];
                    this.head.sort(function(a, b){
                        return (a._position > b._position) ? 1 :
                                (a._position < b._position) ? -1 : 0;
                    });
                },
                resetColumns: function(){
                    var data = {};
                    for(var i in this.head){
                        this.head[i].hidden = this.initHeadStatus[this.head[i].title];
                        data[this.head[i].title] = this.initHeadStatus[this.head[i].title];
                    }
                    this.onChangeColumns(data);
                },
                highlightRow: function(index, customIndex){
                    if(this.highlightHandlers &&
                        (typeof customIndex === "undefined" || this.customHandlers[customIndex].highlight === true))
                        for(var i in this.body)
                            if(parseInt(i) === parseInt(index))
                                this.body[i]._highlight = true;
                            else
                                this.body[i]._highlight = false;
                },
                existsFullHandler: function(){
                    var lastIndex = false;
                    for(var i in this.customHandlers)
                        if(this.customHandlers[i].fullHandler === true)
                            lastIndex = i;
                    return [
                        lastIndex === false ? lastIndex : true,
                        lastIndex
                    ];
                },
                prettyTitle: function(index){
                    var prettyTitle = this.head[index].title.charAt(0).toUpperCase();
                    prettyTitle += this.head[index].title.replace("_id", "").slice(1);
                    return prettyTitle.replace(new RegExp("_", "g"), " ");
                },
                getSelectData: function(index, indexHead){
                    if(this.body.length > 0){
                        var selectData = null;
                        for(var indexOptions in this.head[indexHead].input.options)
                            if(this.head[indexHead].input.options[indexOptions].value === this.body[index][this.head[indexHead].title])
                                selectData = this.head[indexHead].input.options[indexOptions].text;
                        return selectData;
                    }
                },
                getSelectValue: function(indexHead){
                    var selectData = null;
                    for(var indexOptions in this.head[indexHead].input.options)
                        if(this.head[indexHead].input.options[indexOptions].text === this.head[indexHead]._searchData)
                            selectValue = this.head[indexHead].input.options[indexOptions].value;
                    return selectValue;
                },
                fieldValidation: function(element){
                    var validator = false;
                    if(typeof element === "string"){
                        validator += ((element.indexOf('#') !== -1)) ? true : false;
                        validator += ((element.indexOf('!') !== -1)) ? true : false;
                        validator += ((element.indexOf('$') !== -1)) ? true : false;
                        validator += ((element.indexOf('%') !== -1)) ? true : false;
                        validator += ((element.indexOf('/') !== -1)) ? true : false;
                        validator += ((element.indexOf('(') !== -1)) ? true : false;
                        validator += ((element.indexOf(')') !== -1)) ? true : false;
                        validator += ((element.indexOf('=') !== -1)) ? true : false;
                        validator += ((element.indexOf('<') !== -1)) ? true : false;
                        validator += ((element.indexOf('>') !== -1)) ? true : false;
                        validator += ((element.indexOf('¡') !== -1)) ? true : false;
                        validator += ((element.indexOf('\'') !== -1)) ? true : false;
                        validator += ((element.indexOf('´') !== -1)) ? true : false;
                        validator += ((element.indexOf('*') !== -1)) ? true : false;
                        validator += ((element.indexOf('[') !== -1)) ? true : false;
                        validator += ((element.indexOf(']') !== -1)) ? true : false;
                        validator += ((element.indexOf('{') !== -1)) ? true : false;
                        validator += ((element.indexOf('}') !== -1)) ? true : false;
                        validator += ((element.indexOf('+') !== -1)) ? true : false;
                        validator += ((element.indexOf('"') !== -1)) ? true : false;
                        validator += ((element.indexOf('|') !== -1)) ? true : false;
                        validator += ((element.indexOf('°') !== -1)) ? true : false;
                        validator += ((element.indexOf('&') !== -1)) ? true : false;
                        if(validator)
                            validator = true;
                        else
                            validator = false;
                    }
                    return validator;
                },
                sortList: function(sortType, column, auto){
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        var me = this;
                        if(auto){
                            for(index in this.head)
                                if(this.head[index]._order !== null){
                                    sortType = this.head[index]._order;
                                    column = this.head[index].title;
                                }
                            return (sortType) ? sortType === "asc" ? column : "-" + column : null;
                        }
                        else{
                            for(index in this.head)
                                if(this.head[index].title === column)
                                    this.head[index]._order = sortType;
                                else
                                    this.head[index]._order = null;
                            this.getService({"per-page": this.style.pagination.rowPerPage, "page": this.style.pagination.currentPage, "sort": sortType === "asc" ? column : "-" + column },
                            function(success){
                                if(typeof me.dataGrouping === 'object')
                                    me.groupBy(null, true);
                            },
                            function(error){
                                console.log(error);
                            },
                            true,       //Redefine body
                            false);     //Redefine pagination
                        }
                    }
                    else{
                        /***************Used only in pagination mode*****************/
                        var actualVisible = [],
                            index = null;
                        /************************************************************/
                        var headSelect = false;
                        if(auto){
                            for(index in this.head)
                                if(this.head[index]._order !== null){
                                    sortType = this.head[index]._order;
                                    column = this.head[index].title;
                                    if(typeof this.head[index].input === "object" &&
                                       this.head[index].input.type === "select")
                                        headSelect = this.head[index].input.options;
                                }
                        }
                        else{
                            for(index in this.head)
                                if(this.head[index].title === column){
                                    this.head[index]._order = sortType;
                                    if(typeof this.head[index].input === "object" &&
                                       this.head[index].input.type === "select")
                                        headSelect = this.head[index].input.options;
                                }
                                else
                                    this.head[index]._order = null;
                        }
                        var data = this.body;
                        
                        /***************Used only in pagination mode*****************/
                        if(typeof this.style.pagination === 'object' &&
                        typeof this.style.pagination.rowPerPage === 'number' &&
                        this.style.pagination.rowPerPage > 0){
                            for(index in data)  //Obtain actual hidden
                                actualVisible.push(data[index]._hidden);
                            for(index in data)  //Show everything
                                data[index]._hidden = false;
                        }
                        /************************************************************/
                        
                        switch(sortType){
                            case "asc":
                                if(headSelect){
                                    data.sort(function(a, b){
                                        var semiA = "",
                                            semiB = "";
                                        for(index in headSelect){
                                            if(headSelect[index].value === a[column])
                                                semiA = headSelect[index].text;
                                            else if(headSelect[index].value === b[column])
                                                semiB = headSelect[index].text;
                                        }
                                        return (semiA.toLowerCase() > semiB.toLowerCase()) ? 1 :
                                         (semiA.toLowerCase() < semiB.toLowerCase()) ? -1 : 0;
                                    });
                                }
                                else{
                                    data.sort(function(a, b){
                                        if(typeof a[column] === "string" &&
                                            typeof b[column] === "string")
                                               return (a[column].toLowerCase() > b[column].toLowerCase()) ? 1 :
                                                (a[column].toLowerCase() < b[column].toLowerCase()) ? -1 : 0;
                                        else
                                           return (a[column] > b[column]) ? 1 :
                                            (a[column] < b[column]) ? -1 : 0;
                                    });
                                }
                                break;
                            case "desc":
                                if(headSelect){
                                    data.sort(function(a, b){
                                        var semiA = "",
                                            semiB = "";
                                        for(index in headSelect){
                                            if(headSelect[index].value === a[column])
                                                semiA = headSelect[index].text;
                                            else if(headSelect[index].value === b[column])
                                                semiB = headSelect[index].text;
                                        }
                                        return (semiA.toLowerCase() > semiB.toLowerCase()) ? -1 :
                                         (semiA.toLowerCase() < semiB.toLowerCase()) ? 1 : 0;
                                    });
                                }
                                else{
                                    data.sort(function(a, b){
                                        if(typeof a[column] === "string" &&
                                            typeof b[column] === "string")
                                               return (a[column].toLowerCase() > b[column].toLowerCase()) ? -1 :
                                                (a[column].toLowerCase() < b[column].toLowerCase()) ? 1 : 0;
                                        else
                                            return (a[column] > b[column]) ? -1 :
                                             (a[column] < b[column]) ? 1 : 0;
                                    });
                                }
                                break;
                            default:
                                break;
                        }
                        
                        /***************Used only in pagination mode*****************/
                        if(typeof this.style.pagination === 'object' &&
                        typeof this.style.pagination.rowPerPage === 'number' &&
                        this.style.pagination.rowPerPage > 0)
                            for(index in data)  //Hide with same sequence, and new order
                                data[index]._hidden = actualVisible[index];
                        /************************************************************/
                        /***************Used only in group mode*****************/
                        if(typeof this.dataGrouping === 'object')
                            if(this.dataGrouping.isGrouped && this.dataGrouping.column === column)
                                switch(sortType){
                                    case "asc":
                                        this.dataGrouping.state.sort(function(a, b){ return a[0] > b[0]; });
                                        break;
                                    case "desc":
                                        this.dataGrouping.state.sort(function(a, b){ return a[0] < b[0]; });
                                        break;
                                }
                        /************************************************************/
                    }
                },
                setVisible: function(hidden, column){
                    var data = {};
                    for(var index in this.head){
                        if(this.head[index].title === column)
                            this.head[index].hidden = !hidden;
                        data[this.head[index].title] = this.head[index].hidden;
                    }
                    this.onChangeColumns(data);
                },
                search: function(value, column){
                    var data = null,
                        headSelect = false,
                        index = null;
                    /***************Used only in pagination mode*****************/
                    if(typeof this.style.pagination === 'object' &&
                    typeof this.style.pagination.rowPerPage === 'number' &&
                    this.style.pagination.rowPerPage > 0 &&
                    (!(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active))){
                        data = [];
                        var elementsPerPage = this.style.pagination.rowPerPage;
                        var actualPage = 1;
                        for(index in this.dataPagination)
                            if(this.dataPagination[index][0])
                                actualPage = parseInt(index) + 1;
                        for(index in this.body){
                            if(parseInt(index) >= (elementsPerPage*actualPage) - elementsPerPage &&
                               parseInt(index) <  elementsPerPage*actualPage)
                                data.push(this.body[index]);
                            else
                                this.body[index]._hidden = true;
                        }
                    }
                    /************************************************************/
                    else
                        data = this.body;
                    for(var semiIndex in this.head)
                        if(this.head[semiIndex].title === column)
                            this.head[semiIndex]._searchData = value;
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        this.updatePagination();
                    }
                    else{
                        var weDontSearch = true;
                        for(semiIndex in this.head)
                            if(this.head[semiIndex].searchable.active)
                                if(this.head[semiIndex]._searchData !== "")
                                    weDontSearch *= false;
                        for(index in data)
                            if(weDontSearch){
                                for(index in data)
                                    data[index]._hidden = false;
                            }
                            else{
                                var visible = true;
                                for(semiIndex in this.head){
                                    if(typeof this.head[semiIndex].searchable === "object" && this.head[semiIndex].searchable.active && this.head[semiIndex]._searchData !== ""){
                                        headSelect = false;
                                        if(typeof this.head[semiIndex].input === "object" &&
                                            this.head[semiIndex].input.type === "select")
                                            headSelect = this.head[semiIndex].input.options;
                                        if(headSelect){
                                            var actualValue = "";
                                            for(var indexSelect in headSelect)
                                                if(headSelect[indexSelect].value === data[index][this.head[semiIndex].title])
                                                    actualValue = headSelect[indexSelect].text;
                                            if(this.head[semiIndex].searchable.type === "status"){
                                                if(actualValue != this.head[semiIndex]._searchData)
                                                    visible = false;
                                            }
                                            else{
                                                if(actualValue.toLowerCase().indexOf(this.head[semiIndex]._searchData.toLowerCase()) < 0)
                                                    visible = false;
                                            }
                                        }
                                        else{
                                            switch(typeof data[index][this.head[semiIndex].title]){
                                                case "number":
                                                    if(this.head[semiIndex].searchable.type === "status"){
                                                        if(data[index][this.head[semiIndex].title] != this.head[semiIndex]._searchData)
                                                            visible = false;
                                                    }
                                                    else{
                                                        if(data[index][this.head[semiIndex].title].toString().indexOf(this.head[semiIndex]._searchData) < 0)
                                                            visible = false;
                                                    }
                                                    break;
                                                case "string":
                                                    if(this.head[semiIndex].searchable.type === "status"){
                                                        if(data[index][this.head[semiIndex].title] != this.head[semiIndex]._searchData)
                                                            visible = false;
                                                    }
                                                    else{
                                                        if(data[index][this.head[semiIndex].title].toLowerCase().indexOf(this.head[semiIndex]._searchData.toLowerCase()) < 0)
                                                            visible = false;
                                                    }
                                                    break;
                                                default:
                                                    visible = false;
                                                    break;
                                            }
                                        }
                                    }
                                }
                                data[index]._hidden = !visible;
                            }
                    }
                },
                watchRow: function(index){
                    this.watchBody.actualIndex = index;
                    for(var indexHead in this.head)
                        this.watchBody[this.head[indexHead].title] = this.body[index][this.head[indexHead].title];
                    this.highlightRow(index);
                },
                initEdit: function(index){
                    var indexHead = null;
                    switch(this.handlers.edit.type){
                        case "inline":
                            for(indexHead in this.head)
                                this.reValidateEdit(index, indexHead);
                            this.body[index]._editing = true;
                            break;
                        case "modal":
                            this.editingBody.actualIndex = index;
                            for(indexHead in this.head)
                                this.editingBody[this.head[indexHead].title] = this.body[index][this.head[indexHead].title];
                            break;
                    }
                    if(this.handlers.edit.highlight)
                        this.highlightRow(index);
                },
                reValidateEdit: function(index, indexHead){
                    if(!(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active)){
                        switch(this.handlers.edit.type){
                            case "inline":
                                this.body[index]['_unvalidated-'+indexHead] = true;
                                if(this.head[indexHead].editable && typeof this.head[indexHead].input !== "undefined"){  //editable column and text with validations
                                    if(this.head[indexHead].input.required)
                                        this.body[index]['_unvalidated-'+indexHead] *= this.body[index][this.head[indexHead].title] !== '' ? true : false;
                                    if(this.head[indexHead].input.type === 'email'){
                                        var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        this.body[index]['_unvalidated-'+indexHead] *= emailTest.test(this.body[index][this.head[indexHead].title]) ? true : false;
                                    }
                                }
                                this.body[index]['_unvalidated-'+indexHead] *= !this.fieldValidation(this.body[index][this.head[indexHead].title]);
                                this.body[index]['_unvalidated-'+indexHead] = !this.body[index]['_unvalidated-'+indexHead];
                                break;
                            case "modal":
                                this.editingBody['_unvalidated-'+indexHead] = true;
                                if(this.head[indexHead].editable && typeof this.head[indexHead].input !== "undefined"){  //editable column and text with validations
                                    if(this.head[indexHead].input.required)
                                        this.editingBody['_unvalidated-'+indexHead] *= this.editingBody[this.head[indexHead].title] !== '' ? true : false;
                                    if(this.head[indexHead].input.type === 'email'){
                                        var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        this.editingBody['_unvalidated-'+indexHead] *= emailTest.test(this.editingBody[this.head[indexHead].title]) ? true : false;
                                    }
                                }
                                this.editingBody['_unvalidated-'+indexHead] *= !this.fieldValidation(this.editingBody[this.head[indexHead].title]);
                                this.editingBody['_unvalidated-'+indexHead] = !this.editingBody['_unvalidated-'+indexHead];
                                break;
                        }
                    }
                },
                templateWatch: templateWatch,
                beforeEdit: beforeEdit,
                templateEdit: templateEdit,
                onEdit: onEdit,
                finishEdit: function(data, index){
                    this.beforeEdit();
                    var sendData = {},
                        indexHead = null;
                    switch(this.handlers.edit.type){
                        case "inline":
                            for(var indexHead in this.head)
                                if(typeof this.head[indexHead].input !== "undefined" &&
                                   typeof this.head[indexHead].input.type !== "undefined" &&
                                   this.head[indexHead].input.type === "number")
                                    if(data[indexHead] === "")
                                        sendData[this.head[indexHead].title] = 0;
                                    else
                                        sendData[this.head[indexHead].title] = parseFloat(data[this.head[indexHead].title]);
                                else
                                    sendData[this.head[indexHead].title] = data[this.head[indexHead].title];
                            break;
                        case "modal":
                            for(var indexHead in this.head)
                                if(typeof this.head[indexHead].input !== "undefined" &&
                                   typeof this.head[indexHead].input.type !== "undefined" &&
                                   this.head[indexHead].input.type === "number")
                                    if(this.editingBody[this.head[indexHead].title] === "")
                                        sendData[this.head[indexHead].title] = 0;
                                    else
                                        sendData[this.head[indexHead].title] = parseFloat(this.editingBody[this.head[indexHead].title]);
                                else
                                    sendData[this.head[indexHead].title] = this.editingBody[this.head[indexHead].title];
                            break;
                    }
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        var me = this,
                            params = {},
                            body = {},
                            delimiters = [];
                        for(var myIndex in sendData)
                            if(myIndex !== "id")
                                params[myIndex] = sendData[myIndex];
                        if(typeof this.webService.delimiters === "number")
                           delimiters.push(this.webService.delimiters);
                        else if(typeof this.webService.delimiters === "object")
                            for(myIndex in this.webService.delimiters)
                                delimiters.push(this.webService.delimiters[myIndex]);
                        delimiters.push(sendData.id);
                        body.params = params;
                        body.delimiters = delimiters;
                        this.webService.model.patch(body,
                        function(success){
                            if(me.handlers.edit.type === "inline")
                                me.body[index]._editing = false;
                            me.updatePagination();
                            me.onEdit(sendData, true);
                            if(typeof me.handlers.edit === "object" && me.handlers.edit.type === 'modal')
                                document.getElementById(me.id + "-closeEditModal").click();
                        },
                        function(error){
                            var errors = "";
                            for(index in error.body){
                                errors += error.body[index].message + "<br>";
                            }
                            var messageErrors = {
                                title: "Errores en Edición de Registro",
                                text: errors,
                                ok: "Aceptar",
                                active: true
                            };
                            me.onEdit(messageErrors, false);
                        });
                    }
                    else{
                        var validator = true;
                        switch(this.handlers.edit.type){
                            case "inline":
                                for(indexHead in this.head){
                                    this.body[index]['_unvalidated-'+indexHead] = true;
                                    if(this.head[indexHead].editable && typeof this.head[indexHead].input !== "undefined"){  //editable column and text with validations
                                        switch(this.head[indexHead].input.required){
                                            case true:
                                                validator *= this.body[index][this.head[indexHead].title] !== '' ? true : false;
                                                this.body[index]['_unvalidated-'+indexHead] *= this.body[index][this.head[indexHead].title] !== '' ? true : false;
                                                break;
                                            default:
                                                break;
                                        }
                                        switch(this.head[indexHead].input.type){
                                            case 'email':
                                                var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                validator *= emailTest.test(this.body[index][this.head[indexHead].title]) ? true : false;
                                                this.body[index]['_unvalidated-'+indexHead] *= emailTest.test(this.body[index][this.head[indexHead].title]) ? true : false;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if(this.head[indexHead].editable){
                                        validator *= !this.fieldValidation(this.body[index][this.head[indexHead].title]);
                                        this.body[index]['_unvalidated-'+indexHead] *= !this.fieldValidation(this.body[index][this.head[indexHead].title]);
                                    }
                                    this.body[index]['_unvalidated-'+indexHead] = !this.body[index]['_unvalidated-'+indexHead];
                                }
                                if(validator){
                                    this.body[index]._editing = false;
                                    this.sortList(null, null, true);
                                    this.onEdit(sendData, true);
                                }
                                else{
                                    var messageErrors = {
                                        title: this.style.languageItems[configuration.style.language].alert.title,
                                        text: this.style.languageItems[configuration.style.language].alert.text,
                                        ok: this.style.languageItems[configuration.style.language].alert.ok,
                                        active: true
                                    };
                                    this.onEdit(messageErrors, false);
                                }
                                break;
                            case "modal":
                                for(indexHead in this.head){
                                    this.editingBody['_unvalidated-'+indexHead] = true;
                                    if(this.head[indexHead].editable && typeof this.head[indexHead].input !== "undefined"){  //editable column and text with validations
                                        switch(this.head[indexHead].input.required){
                                            case true:
                                                validator *= this.editingBody[this.head[indexHead].title] !== '' ? true : false;
                                                this.editingBody['_unvalidated-'+indexHead] *= this.editingBody[this.head[indexHead].title] !== '' ? true : false;
                                                break;
                                            default:
                                                break;
                                        }
                                        switch(this.head[indexHead].input.type){
                                            case 'email':
                                                var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                validator *= emailTest.test(this.editingBody[this.head[indexHead].title]) ? true : false;
                                                this.editingBody['_unvalidated-'+indexHead] *= emailTest.test(this.editingBody[this.head[indexHead].title]) ? true : false;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if(this.head[indexHead].editable){
                                        validator *= !this.fieldValidation(this.editingBody[this.head[indexHead].title]);
                                        this.editingBody['_unvalidated-'+indexHead] *= !this.fieldValidation(this.editingBody[this.head[indexHead].title]);
                                    }
                                    this.editingBody['_unvalidated-'+indexHead] = !this.editingBody['_unvalidated-'+indexHead];
                                }
                                if(validator){
                                    for(indexHead in this.head)
                                        this.body[this.editingBody.actualIndex][this.head[indexHead].title] = this.editingBody[this.head[indexHead].title];
                                    this.sortList(null, null, true);
                                    this.onEdit(sendData, true);
                                    document.getElementById(this.id + "-closeEditModal").click();
                                }
                                else{
                                    var messageErrors = {
                                        title: this.style.languageItems[configuration.style.language].alert.title,
                                        text: this.style.languageItems[configuration.style.language].alert.text,
                                        ok: this.style.languageItems[configuration.style.language].alert.ok,
                                        active: true
                                    };
                                    this.onEdit(messageErrors, false);
                                }
                                break;
                            }
                    }
                },
                beforeRemove: beforeRemove,
                onRemove: onRemove,
                confirmRemove(data, index){
                    var me = this;
                    var messageConfirm = {
                        title: this.style.languageItems[configuration.style.language].confirm.title,
                        text: this.style.languageItems[configuration.style.language].confirm.text,
                        accept: this.style.languageItems[configuration.style.language].confirm.accept,
                        cancel: this.style.languageItems[configuration.style.language].confirm.cancel,
                        active: true
                    };
                    this.beforeRemove(messageConfirm,
                        function(){
                            me.removeRow(data, index);
                        }
                    );
                },
                removeRow: function(data, index){
                    var sendData = {};
                    for(var indexHead in this.head)
                        sendData[this.head[indexHead].title] = this.body[index][this.head[indexHead].title];
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        var me = this,
                            delimiters = [];
                        if(typeof this.webService.delimiters === "number")
                           delimiters.push(this.webService.delimiters);
                        else if(typeof this.webService.delimiters === "object")
                            for(var index in this.webService.delimiters)
                                delimiters.push(this.webService.delimiters[index]);
                        delimiters.push(sendData.id);
                        this.webService.model.remove({
                            delimiters: delimiters,
                        },
                        function(success){
                            me.updatePagination();
                            me.onRemove(sendData);
                        },
                        function(error){
                            console.log(error);
                        });
                    }
                    else{
                        
                        var groupable = false;
                        var newBody = [];
                        for(var semiIndex in this.body)
                            if(parseInt(semiIndex) !== parseInt(index))
                                newBody.push(this.body[semiIndex]);
                        this.body = newBody;
                        
                        /***************Used only in pagination mode*****************/
                        if(typeof this.style.pagination === 'object' &&
                        typeof this.style.pagination.rowPerPage === 'number' &&
                        this.style.pagination.rowPerPage > 0)
                            this.updatePagination();
                        /************************************************************/
                        for(index in this.head)
                            if(typeof this.head[index].groupable !== "undefined" &&
                               this.head[index].groupable === true &&
                               this.dataGrouping.isGrouped === true)
                                groupable = true;
                        if(groupable){
                            this.groupBy(null, true);
                        }
                        this.onRemove(sendData);
                    }
                },
                initAdd: function(){
                    for(var index in this.head)
                        this.reValidateAdd(index);
                    this.adding = true;
                },
                cancelAdd: function(){
                    for(var index in this.head)
                        this.head[index]._dataAdd.value = "";
                    this.adding = false;
                },
                beforeAdd: beforeAdd,
                onAdd: onAdd,
                reValidateAdd: function(indexHead){
                    if(!(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active)){
                        var newData = {};
                        for(var index in this.head)
                            newData[this.head[index].title] = this.head[index]._dataAdd.value;
                        this.head[indexHead]._dataAdd.validation = true;
                        if(typeof this.head[indexHead].input !== "undefined"){  //editable column and text with validations
                            if(this.head[indexHead].input.required)
                                this.head[indexHead]._dataAdd.validation *= newData[this.head[indexHead].title] !== '' ? true : false;
                            if(this.head[indexHead].input.type === "email"){
                                var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                this.head[indexHead]._dataAdd.validation *= emailTest.test(newData[this.head[indexHead].title]) ? true : false;
                            }
                        }
                        this.head[indexHead]._dataAdd.validation *= !this.fieldValidation(newData[this.head[indexHead].title]);
                        this.head[indexHead]._dataAdd.validation = !this.head[indexHead]._dataAdd.validation;
                    }
                },
                addRow: function(){
                    this.beforeAdd();
                    var newData = {};
                    var sendData = {};
                    newData._editing = false;
                    newData._hidden = false;
                    newData._highlight = false;
                    for(var indexHead in this.head)
                        if(this.head[indexHead].editable)
                            newData['_unvalidated-'+indexHead] = false;
                    for(var index in this.head)
                        if(typeof this.head[index].input !== "undefined" &&
                           typeof this.head[index].input.type !== "undefined" &&
                           this.head[index].input.type === "number"){
                            if(this.head[index]._dataAdd.value === ""){
                                newData[this.head[index].title] = 0;
                                sendData[this.head[index].title] = 0;
                            }
                            else{
                                newData[this.head[index].title] = parseFloat(this.head[index]._dataAdd.value);
                                sendData[this.head[index].title] = parseFloat(this.head[index]._dataAdd.value);
                            }
                        }
                        else{
                            newData[this.head[index].title] = this.head[index]._dataAdd.value;
                            sendData[this.head[index].title] = this.head[index]._dataAdd.value;
                        }
                    
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        var postData = {},
                            me = this,
                            body = {};
                        for(index in sendData)
                            if(index !== "id")
                                postData[index] = sendData[index];
                        body.params = postData;
                        if(typeof this.webService.delimiters !== "undefined")
                           body.delimiters = this.webService.delimiters;
                        this.webService.model.post(body,
                        function(success){
                            me.adding = false;
                            for(index in me.head)
                                me.head[index]._dataAdd.value = "";
                            me.updatePagination();
                            me.onAdd(sendData, true);
                            if(typeof me.handlers.add === "object" && me.handlers.add.type === 'modal')
                                document.getElementById(me.id + "-closeAddModal").click();
                        },
                        function(error){
                            var errors = "";
                            for(index in error.body){
                                errors += error.body[index].message + "<br>";
                            }
                            var messageErrors = {
                                title: "Errores en Nuevo Registro",
                                text: errors,
                                ok: "Aceptar",
                                active: true
                            };
                            me.onAdd(messageErrors, false);
                        });
                    }
                    else{
                        var validator = true;
                        for(indexHead in this.head){
                            this.head[indexHead]._dataAdd.validation = true;
                            if(typeof this.head[indexHead].input !== "undefined"){  //editable column and text with validations
                                switch(this.head[indexHead].input.required){
                                    case true:
                                        validator *= this.head[indexHead]._dataAdd.value !== '' ? true : false;
                                        this.head[indexHead]._dataAdd.validation = this.head[indexHead]._dataAdd.value !== '' ? true : false;
                                        break;
                                    default:
                                        break;
                                }
                                switch(this.head[indexHead].input.type){
                                    case 'email':
                                        var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        validator *= emailTest.test(this.head[indexHead]._dataAdd.value) ? true : false;
                                        this.head[indexHead]._dataAdd.validation = emailTest.test(this.head[indexHead]._dataAdd.value) ? true : false;
                                        break;
                                    default:
                                        break;
                                }
                            }
                            else{
                                validator *= !this.fieldValidation(this.head[indexHead]._dataAdd.value);
                                this.head[indexHead]._dataAdd.validation *= !this.fieldValidation(newData[this.head[indexHead].title]);
                            }
                            this.head[indexHead]._dataAdd.validation = !this.head[indexHead]._dataAdd.validation;
                        }
                        if(validator){
                            var groupable = false;
                            this.body.push(newData);
                            this.adding = false;
                            for(index in this.head)
                                this.head[index]._dataAdd.value = "";
                            /***************Used only in pagination mode*****************/
                            if(typeof this.style.pagination === 'object' &&
                            typeof this.style.pagination.rowPerPage === 'number' &&
                            this.style.pagination.rowPerPage > 0)
                                this.updatePagination();
                            /************************************************************/
                            this.sortList(null, null, true);
                            for(var index in this.head)
                                if(typeof this.head[index].groupable !== "undefined" &&
                                   this.head[index].groupable === true &&
                               this.dataGrouping.isGrouped === true)
                                    groupable = true;
                            if(groupable)
                                this.groupBy(null, true);
                            this.onAdd(sendData, true);
                            if(typeof this.handlers.add === "object" && this.handlers.add.type === 'modal')
                                document.getElementById(this.id + "-closeAddModal").click();
                        }
                        else{
                            var messageErrors = {
                                title: this.style.languageItems[configuration.style.language].alert.title,
                                text: this.style.languageItems[configuration.style.language].alert.text,
                                ok: this.style.languageItems[configuration.style.language].alert.ok,
                                active: true
                            };
                            this.onAdd(messageErrors, false);
                        }
                    }
                },
                updatePagination: function(init){
                    var a = 1,
                        activeIndex = null;
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        if(this.body.length > 0){
                            for(var index in this.dataPagination)
                                if(this.dataPagination[index][0])
                                    activeIndex = parseInt(index);
                            this.updatePagesService(init ? 1 : parseInt(activeIndex) + a);
                        }
                    }
                    else{
                        if(this.body.length > 0){
                            for(var index in this.dataPagination)
                                if(this.dataPagination[index][0])
                                    activeIndex = parseInt(index);
                            this.dataPagination = [];
                            for(index in this.body)
                                if(index % this.style.pagination.rowPerPage === 0)
                                    this.dataPagination.push([(parseInt(index) === parseInt(activeIndex)), a++]);
                            a = (parseInt(activeIndex) === this.dataPagination.length) ? 0 : 1;
                            this.updatePages(init ? 1 : parseInt(activeIndex) + a);
                        }
                    }
                },
                recordsPagination: function(val){
                    var data = 0;
                    switch(val){
                        case 0:
                            for(var index in this.body)
                                if(!this.body[index]._hidden && !this.body[index]._ofuscate)
                                    data++;
                            break;
                        case 1:
                            data = this.body.length;
                            break;
                        case 2:
                            for(var index in this.dataPagination)
                                if(this.dataPagination[index][0])
                                    data = parseInt(index) + 1;
                            break;
                        default:
                            data = this.dataPagination.length;
                    }
                    return data;
                },
                notAllPages: function(beggining){
                    var shouldSight = false;
                    for(var index in this.dataPagination)
                        if(this.dataPagination[index][0])
                            if(beggining && parseInt(index) + 1 > 4)  //Showing from beggining
                                    shouldSight = true;
                            else if(!beggining && parseInt(index) + 1 < this.dataPagination.length - 3)
                                    shouldSight = true;
                    return shouldSight;
                },
                updatePages: function(active, redefine){
                    var elementsPerPage = this.style.pagination.rowPerPage;
                    var actualPage = 1;
                    var limits = [4, 4];
                    for(var index in this.dataPagination){
                        if(this.dataPagination[index][1] === active){
                            this.dataPagination[index][0] = true;
                            actualPage = parseInt(index) + 1;
                        }
                        else
                            this.dataPagination[index][0] = false;
                    }
                    if(actualPage <= 4){
                        limits[0] = actualPage;
                        limits[1] = 8 - actualPage;
                    }
                    if(actualPage >= this.dataPagination.length - 3){
                        limits[0] = 8 - (this.dataPagination.length + 1 - actualPage);
                        limits[1] = this.dataPagination.length + 1 - actualPage;
                    }
                    for(index in this.dataPagination){
                        if((parseInt(index) <= (actualPage - 1 - limits[0]) || parseInt(index) >= (actualPage - 1 + limits[1])) && parseInt(index) !== actualPage - 1)
                            this.dataPagination[index][0] = null;
                    }
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        var me = this;
                        var params = {
                            "per-page": this.style.pagination.rowPerPage,
                            "page": actualPage
                        },
                            sortType = null,
                            column = null;
                        for(index in this.head)
                            if(this.head[index]._order !== null){
                                sortType = this.head[index]._order;
                                column = this.head[index].title;
                            }
                        var sort = this.sortList(null, null, true);
                        if(sort)
                            params["sort"] = sort;
                        this.getService(params,
                        function(success){
                            for(var index in me.head)
                                if(typeof me.head[index].groupable !== "undefined" &&
                                   me.head[index].groupable === true &&
                               me.dataGrouping.isGrouped === true)
                                    groupable = true;
                            if(groupable)
                                me.groupBy(null, true);
                        },
                        function(error){
                            console.log(error);
                        },
                        true,       //Redefine body
                        redefine ? true : false);     //Redefine pagination
                    }
                    else{
                        for(index in this.body){
                            if(parseInt(index) >= (elementsPerPage*actualPage) - elementsPerPage &&
                               parseInt(index) <  elementsPerPage*actualPage)
                                this.body[index]._hidden = false;
                            else
                                this.body[index]._hidden = true;
                        }
                        this.search(null, null);
                    }
                },
                updatePagesService: function(active){
                    var me = this;
                    var actualPage = 1;
                    var limits = [4, 4];
                    for(var index in this.dataPagination){
                        if(this.dataPagination[index][1] === active){
                            this.dataPagination[index][0] = true;
                            actualPage = parseInt(index) + 1;
                        }
                        else
                            this.dataPagination[index][0] = false;
                    }
                    var params = {
                        "per-page": this.style.pagination.rowPerPage,
                        "page": actualPage
                    };
                    for(index in this.head)
                        if(this.head[index]._searchData !== null && this.head[index]._searchData !== "" &&
                           this.head[index]._searchData !== undefined){
                            if(typeof this.head[index].input === "object" &&
                               this.head[index].input.type === "select")
                                params[this.head[index].title] = this.getSelectValue(index);
                            else
                                params[this.head[index].title] = this.head[index]._searchData;
                        }
                    var sort = this.sortList(null, null, true);
                    if(sort)
                        params["sort"] = sort;
                    this.getService(params,
                    function(success){
                        if(success.body.length > 0){
                            var b = 1;
                            me.dataPagination = [];
                            for(var i = 0; i < parseInt(success.headers.map[me.webService.headers.pageCount]); i++)
                                me.dataPagination.push([(parseInt(success.headers.map[me.webService.headers.pageCount]) < actualPage) ? b === actualPage -1 : b === actualPage, b++]);
                            if(actualPage <= 4){
                                limits[0] = actualPage;
                                limits[1] = 8 - actualPage;
                            }
                            if(actualPage >= me.dataPagination.length - 3){
                                limits[0] = 8 - (me.dataPagination.length + 1 - actualPage);
                                limits[1] = me.dataPagination.length + 1 - actualPage;
                            }
                            for(index in me.dataPagination){
                                if((parseInt(index) <= (actualPage - 1 - limits[0]) || parseInt(index) >= (actualPage - 1 + limits[1])) && parseInt(index) !== actualPage - 1)
                                    me.dataPagination[index][0] = null;
                            }
                            for(var index in me.head)
                                if(typeof me.head[index].groupable !== "undefined" &&
                                   me.head[index].groupable === true &&
                               me.dataGrouping.isGrouped === true)
                                    groupable = true;
                            if(groupable)
                                me.groupBy(null, true);
                        }
                        else
                            me.body[0]._ofuscate = true;
                    },
                    function(error){
                        console.log(error);
                    },
                    true,       //Redefine body
                    true);     //Redefine pagination
                },
                updatePageRows: function(rowsPerPage){
                    this.style.pagination.rowPerPage = rowsPerPage;
                    this.updatePagination(true);
                },
                shouldGroup: function(){    //Some column was defined as groupable
                    var shouldGroup = false;
                    for(index in this.head)
                        if(this.head[index].groupable)
                            shouldGroup = true;
                    return shouldGroup;
                },
                groupBy: function(column, auto){  //On click of radio grouping input
                    var semiIndex = null,
                        index = null,
                        lastGroupIndex = null;
                    for(var index in this.head)
                        if(!auto)
                            if(this.head[index].title === column){
                                if(this.head[index]._groupedBy)
                                    lastGroupIndex = index;
                                this.head[index]._groupedBy = !this.head[index]._groupedBy;
                                this.head[index].hidden = this.head[index]._groupedBy;
                                this.dataGrouping.isGrouped = this.head[index]._groupedBy;
                            }
                            else{
                                if(this.head[index]._groupedBy)
                                    this.head[index].hidden = false;
                                this.head[index]._groupedBy = false;
                            }
                        else{
                            if(typeof this.head[index]._groupedBy !== "undefined" &&
                               this.head[index]._groupedBy)
                                lastGroupIndex = index;
                        }
                    if(this.dataGrouping.isGrouped){    //Is grouped by some column
                        /***************Used only in pagination mode*****************/
                        if(typeof this.style.pagination === 'object' &&
                        typeof this.style.pagination.rowPerPage === 'number' &&
                        this.style.pagination.rowPerPage > 0){
                            if(!(typeof this.webService === "object" &&
                            typeof this.webService.model === "object" &&
                            this.webService.active)){
                                delete this.style.pagination;  //Delete pagination if exists
                                delete this.dataPagination;
                                for(index in this.body)
                                    this.body[index]._hidden = false;
                                this.search(null, null);
                            }
                        }
                        /************************************************************/
                        var groups = [],
                            hidden = [],
                            state = [];
                        for(index in this.head)
                            if(this.head[index]._groupedBy){
                                for(semiIndex in this.body){
                                    if(typeof this.head[index].input === "object" && this.head[index].input.type === "select"){
                                        if(groups.indexOf(this.getSelectData(semiIndex, index)) === -1 && !this.body[semiIndex]._ofuscate){
                                            groups.push(this.getSelectData(semiIndex, index));
                                            hidden.push(false);
                                            state.push([this.getSelectData(semiIndex, index), false]);
                                        }
                                    }
                                    else{
                                        if(groups.indexOf(this.body[semiIndex][this.head[index].title]) === -1 && !this.body[semiIndex]._ofuscate){
                                            groups.push(this.body[semiIndex][this.head[index].title]);
                                            hidden.push(false);
                                            state.push([this.body[semiIndex][this.head[index].title], false]);
                                        }
                                    }
                                }
                                if(!auto)
                                    this.dataGrouping.column = column;
                                this.dataGrouping.state = state;
                            }
                    }
                    else{      //No grouping
                        /***************Used only in pagination mode*****************/
                        if(typeof this.tempPagination === 'object' &&
                           typeof this.tempPagination.style === 'object' &&
                        typeof this.tempPagination.style.rowPerPage === 'number' &&
                        this.tempPagination.style.rowPerPage > 0){
                            if(!(typeof this.webService === "object" &&
                            typeof this.webService.model === "object" &&
                            this.webService.active)){
                                this.style.pagination = this.tempPagination.style;  //Reasign pagination
                                this.dataPagination = this.tempPagination.data;
                                this.updatePages(1);
                                this.updatePagination();
                            }
                        }
                        /************************************************************/
                        if(!(typeof this.webService === "object" &&
                            typeof this.webService.model === "object" &&
                            this.webService.active)){
                            for(index in this.body)
                                for(semiIndex in this.dataGrouping.state)
                                    if(this.dataGrouping.state[semiIndex][0] === this.body[index][this.head[lastGroupIndex].title] && this.body[index]._hidden)
                                        this.body[index]._hidden = !this.body[index]._hidden;
                            this.search(null, null);
                        }
                    }
                    if(typeof this.webService === "object" &&
                            typeof this.webService.model === "object" &&
                            this.webService.active)
                        return this.dataGrouping.isGrouped;
                },
                groupColSpan: function(){
                    var colspan = 0;
                    for(var index in this.head)
                        if(!this.head[index].hidden)
                            colspan++;
                    return colspan;
                },
                changeGroupVisibility: function(index, indexHead){
                    this.dataGrouping.state[index][1] = !this.dataGrouping.state[index][1];
                    for(var semiIndex in this.body){
                        if(typeof this.head[indexHead].input === "object" &&
                            this.head[indexHead].input.type === "select"){
                            if(this.getSelectData(semiIndex, indexHead) === this.dataGrouping.state[index][0])
                                this.body[semiIndex]._hidden = this.dataGrouping.state[index][1];
                        }
                        else
                            if(this.body[semiIndex][this.dataGrouping.column] === this.dataGrouping.state[index][0])
                                this.body[semiIndex]._hidden = this.dataGrouping.state[index][1];
                    }
                },
                initSortColumns: function(dragElem){
                    for(var index in this.head)
                        if(this.head[index].title === dragElem.srcElement.id)
                            this.dataDragged = this.head[index];
                },
                onDragEnd: onDragEnd,
                sortColumns: function(dropElem){
                    var idDropped = null,
                        dataDropped = null,
                        allOrder = [],
                        sendData = {};
                    if(dropElem.srcElement.tagName === "B")
                        idDropped = dropElem.srcElement.id;
                    else
                        idDropped = dropElem.srcElement.getElementsByTagName('b')[0].id;
                    for(var index in this.head)
                        if(this.head[index].title === idDropped)
                            dataDropped = this.head[index]._position;
                    for(index in this.head)
                        allOrder.push(this.head[index]._position);
                    for(index in this.head)
                        if(this.dataDragged._position < dataDropped){
                            if(allOrder[index] <= dataDropped && allOrder[index] > this.dataDragged._position)
                                this.head[index]._position -= 1;
                        }
                        else if(this.dataDragged._position > dataDropped){
                            if(allOrder[index] >= dataDropped && allOrder[index] < this.dataDragged._position)
                                this.head[index]._position += 1;
                        }
                    this.dataDragged._position = dataDropped;
                    this.head.sort(function(a, b){
                        return (a._position > b._position) ? 1 :
                                            (a._position < b._position) ? -1 : 0;
                    });
                    
                    for(index in this.head)
                        sendData[this.head[index].title] = this.head[index]._position;
                    this.onDragEnd(sendData);
                },
                getService: function(params, customSuccess, error, redefineBody, redefinePagination){
                    if(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active){
                        var me = this;
                        var body = {};
                        if(typeof this.webService.delimiters !== "undefined")
                           body.delimiters = this.webService.delimiters;
                        if(typeof params === "object")
                            body.params = params;
                        this.webService.model.get(body,
                        function(success){
                            //////////////////////////Redefine body///////////////////////////////
                            if(redefineBody){
                                me.body[0]._ofuscate = false;
                                var newData = null;
                                var index = null,
                                    semiIndex = null;
                                if(me.body.length > success.body.length){
                                    newData = [];
                                    newData[0] = me.body[0];
                                    for(index in me.body)
                                        if(success.body.length > parseInt(index))
                                            newData[index] = me.body[index];
                                    for(index in success.body){
                                        for(semiIndex in success.body[index])
                                            if(newData[index][semiIndex])
                                            newData[index][semiIndex] = success.body[index][semiIndex];
                                    }
                                    me.body = newData;
                                }
                                else if(me.body.length < success.body.length){
                                    for(index in success.body){
                                        if(me.body.length > parseInt(index)){
                                            for(semiIndex in success.body[index])
                                                if(typeof me.body[index][semiIndex] !== "undefined")
                                                    me.body[index][semiIndex] = success.body[index][semiIndex];
                                        }
                                        else{
                                            newData = {};
                                            newData._editing = false;
                                            newData._hidden = false;
                                            newData._highlight = false;
                                            for(var indexHead in me.head)
                                                if(me.head[indexHead].editable)
                                                    newData['_unvalidated-'+indexHead] = false;
                                            for(semiIndex in success.body[index])
                                                newData[semiIndex] = success.body[index][semiIndex];
                                            me.body.push(newData);
                                        }
                                    }
                                }
                                else{
                                    for(index in success.body){
                                        for(semiIndex in success.body[index]){
                                            if(typeof me.body[index][semiIndex] !== "undefined")
                                                me.body[index][semiIndex] = success.body[index][semiIndex];
                                        }
                                    }
                                }
                            }
                            ////////////////////////Redefine of pagination///////////////////////////
                            if(redefinePagination){
                                me.style.pagination.currentPage = parseInt(success.headers.map[me.webService.headers.currentPage][0]);
                                me.style.pagination.pageCount = parseInt(success.headers.map[me.webService.headers.pageCount][0]);
                                me.style.pagination.totalRowCount = parseInt(success.headers.map[me.webService.headers.totalRowCount][0]);
                            }
                            
                            customSuccess(success);
                        }, error);
                    }
                },
                editDelimiters: function(delimiters){
                    this.webService.delimiters = delimiters;
                }
            },
            beforeCreate: function(){
                
            },
            created: function(){
                var index = null
                    me = this;
                /***************Used only in pagination mode*****************/
                if(typeof this.style.pagination === 'object' &&
                typeof this.style.pagination.rowPerPage === 'number' &&
                this.style.pagination.rowPerPage > 0){
                    if(!(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active))
                        this.updatePages(1);
                }
                /************************************************************/
                /***************Used only in drag and drop mode**************/
                if(this.style.draggable)
                    this.head.sort(function(a, b){
                        return (a._position > b._position) ? 1 :
                                            (a._position < b._position) ? -1 : 0;
                    });
                /************************************************************/
                /***************Used only in status type search**************/
                if(!(typeof this.webService === "object" &&
                    typeof this.webService.model === "object" &&
                    this.webService.active))
                    for(index in this.head)
                        if(this.head[index].searchable.type === "status"){
                            for(var semiIndex in this.body)
                                if(typeof this.head[index].input === "object" &&
                                    this.head[index].input.type === "select" &&
                                    typeof this.head[index].input.model === "undefined"){
                                    if(this.head[index]._searchStatusValues.indexOf(this.getSelectData(semiIndex, index)) === -1)
                                        this.head[index]._searchStatusValues.push(this.getSelectData(semiIndex, index));
                                }
                                else if(typeof this.head[index].input === "object" &&
                                    this.head[index].input.type !== "select"){
                                    if(this.head[index]._searchStatusValues.indexOf(this.body[semiIndex][this.head[index].title]) === -1)
                                        this.head[index]._searchStatusValues.push(this.body[semiIndex][this.head[index].title]);
                                }
                        }
                /************************************************************/
                /************Used only in select model service type**********/
                for(var index in this.head)
                    if(typeof this.head[index].input === "object" &&
                        typeof this.head[index].input.type === "string" &&
                        this.head[index].input.type === "select" &&
                        typeof this.head[index].input.model === "object")
                        (function(index){
                            var ownHead = me.head[index];
                            me.head[index].input.model.source.get({
                                    params: {
                                        "per-page": 100
                                    }
                                },
                                function(success){
                                    if(success.body.length > 0){
                                        for(var indexBody in success.body){
                                            if(parseInt(indexBody) === 0){
                                                ownHead.input.options[indexBody].value = success.body[indexBody][ownHead.input.model.value];
                                                ownHead.input.options[indexBody].text = success.body[indexBody][ownHead.input.model.text];
                                            }
                                            else
                                                ownHead.input.options.push(
                                                    {
                                                        value: success.body[indexBody][ownHead.input.model.value],
                                                        text: success.body[indexBody][ownHead.input.model.text]
                                                    }
                                                );
                                            if(typeof ownHead.searchable === "object" &&
                                               ownHead.searchable.type === "status"){
                                                ownHead._searchStatusValues.push(success.body[indexBody][ownHead.input.model.text]);
                                            }
                                        }
                                    }
                                },
                                function(error){
                                    
                                }
                            );
                        })(index);
                    else if(typeof this.head[index].input === "object" &&
                        typeof this.head[index].input.type === "string" &&
                        this.head[index].input.type === "select" &&
                        typeof this.head[index].input.model !== "object"){
                        if(typeof this.head[index].searchable === "object" &&
                        this.head[index].searchable.type === "status")
                            for(var indexOptions in this.head[index].input.options)
                                this.head[index]._searchStatusValues.push(this.head[index].input.options[indexOptions].text);
                    }
                    this.updatePagination();
            }
        });
        return this.table;
    }
    else{
        if(typeof configuration.head !== "object" || configuration.head.length === 0)
            console.log("ERROR: Something wrong in your datatable HEAD definition");
        else if(typeof configuration.body !== "object" || configuration.body.length === 0)
            console.log("ERROR: Something wrong in your datatable BODY definition");
        else if(typeof configuration.style !== "object")
            console.log("ERROR: Something wrong in your datatable STYLE definition");
        else
            console.log("ERROR: Something wrong in your datatable definition");
    }
};

module.exports = {
    component: mcdatatable,
    template: mcdatatableT
};