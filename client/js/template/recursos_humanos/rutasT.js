module.exports = `
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">{{config.client.name}}</h4>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(0)" title="Regresar"><i class="icon-history"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">Rutas ligadas</h4>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <div class="steps-basic wizard clearfix">
                                        <div class="steps clearfix">
                                            <ul role="tablist">
                                                <li v-for="(steps, stepIndex) in config.day.options" role="tab"
                                                :class="[stepIndex === 0 ? 'first' : '',
                                                        steps.value === config.day.value ? 'done active' : 'active']" aria-disabled="false" aria-selected="true">
                                                    <a href="#" v-on:click.prevent="config.day.index = stepIndex; config.day.value = steps.value; config.init(1);">
                                                        <span class="number">X</span> {{steps.text}}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="row">
                                <div style="padding-top: 20px"></div>
                                <template v-for="(interval, intervalIndex) in config.steps[config.day.index].schedule">
                                    <div class="col-sm-12">
                                        <div class="form-group text-center schedule-title">
                                            <label>Horario {{intervalIndex + 1}}</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input disabled="disabled" type="text" maxlength="8" v-model="interval.begin" class="form-control" :placeholder="'Inicio para intervalo ' + (intervalIndex + 1)">
                                            <span class="help-block">hh:mm:ss</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input disabled="disabled" type="text" maxlength="8" v-model="interval.end" class="form-control" :placeholder="'Final para intervalo ' + (intervalIndex + 1)">
                                            <span class="help-block">hh:mm:ss</span>
                                        </div>
                                    </div>
                                    <template v-for="(route, routeIndex) in interval.route">
                                        <div class="col-sm-12">
                                            <div class="main-info grid-row-customized grid-row-highlight-customized selected" style="padding: 6px; padding-bottom: 14px; margin-bottom: 20px">
                                                {{route.name}}
                                                <div class="pull-right">
                                                    <a href="#" v-on:click.prevent="config.setLink('seeLinked', intervalIndex, routeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                        <i aria-hidden="true" class="icon-eye"></i>
                                                    </a>
                                                    <a href="#" v-on:click.prevent="config.setLink('edit', intervalIndex, routeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Editar" data-toggle="modal" data-target="#edit">
                                                        <i aria-hidden="true" class="icon-pencil6"></i>
                                                    </a>
                                                    <a href="#" v-on:click.prevent="config.remove(route.id)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Eliminar">
                                                        <i aria-hidden="true" class="icon-unlink"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title text-center">Todas las rutas</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                <input type="text" v-model="config.data.search.route" v-on:keyup="config.init(1)" class="form-control" placeholder="Búsqueda">
                                <div class="form-control-feedback" style="width: 30px;">
                                    <i class="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
                                <tbody class="body-class">
                                    <tr v-for="(route, routeIndex) in config.route"
                                        :class="route.linked ? 'selected' : route.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td class="col-md-1">
                                            {{route.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.setLink('see', routeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('add', routeIndex)" :class="route.linked ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ligar" data-toggle="modal" data-target="#add">
                                                    <i class="icon-link" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    <!--<tr v-for="(route, routeIndex) in config.route"
                                        :draggable="route.selected"
                                        @dragstart="config.initDrag('add')"
                                        @dragend="config.alterLinkDef.masive.config.active = 0;"
                                        :class="route.linked ? 'selected' : route.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td v-on:click.self="route.linked ? '' : route.selected = !route.selected" class="col-md-1">
                                            {{route.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.setLink('see', routeIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('add', routeIndex)" :class="route.linked ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ligar" data-toggle="modal" data-target="#add">
                                                    <i class="icon-link" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <nav class="pull-right">
                            <ul class="pagination">
                                <li>
                                    <span><b>Mostrando {{config.route.length}} de {{config.data.page.route.totalCount}} filas en la página {{config.data.page.route.currentPage}} de {{config.data.page.route.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.route.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.route.pageCount <= 3">
                                    <li v-for="page in config.data.page.route.pageCount" :class="page === config.data.page.route.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.route.currentPage ? '' : config.init(1, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.route.currentPage < 3">
                                        <li :class="config.data.page.route.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.route.currentPage === 1 ? '' : config.init(1, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.route.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.route.currentPage === 2 ? '' : config.init(1, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.route.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.route.currentPage === 3 ? '' : config.init(1, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.route.currentPage > config.data.page.route.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.route.currentPage === config.data.page.route.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.route.currentPage === config.data.page.route.pageCount - 2 ? '' : config.init(1, config.data.page.route.pageCount - 2);">
                                                {{config.data.page.route.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.route.currentPage === config.data.page.route.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.route.currentPage === config.data.page.route.pageCount - 1 ? '' : config.init(1, config.data.page.route.pageCount - 1);">
                                                {{config.data.page.route.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.route.currentPage === config.data.page.route.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.route.currentPage === config.data.page.route.pageCount ? '' : config.init(1, config.data.page.route.pageCount);">
                                                {{config.data.page.route.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.route.currentPage - 1)">
                                                {{config.data.page.route.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.route.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.route.currentPage + 1)">
                                                {{config.data.page.route.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.route.pageCount === config.data.page.route.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, config.data.page.route.pageCount);">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Ligar ruta: {{config.alterLinkDef.add.route.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <h4 class="text-center">Horario de ruta</h4>
                        <div class="row">
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
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input disabled="disabled" type="text" maxlength="8" v-model="config.alterLinkDef.add.route.begin" class="form-control">
                                    <span class="help-block">hh:mm:ss</span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input disabled="disabled" type="text" maxlength="8" v-model="config.alterLinkDef.add.route.end" class="form-control">
                                    <span class="help-block">hh:mm:ss</span>
                                </div>
                            </div>
                            </template>
                        </div>
                        <div class="custom-divider"></div>
                        <div class="custom-divider"></div>
                        <h4 class="text-center">Horarios de empleado</h4>
                        <div class="row">
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
                                    <label>Selección</label>
                                </div>
                            </div>
                            <template v-for="(interval, intervalIndex) in  config.steps[config.day.index].schedule">
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <input disabled="disabled" type="text" maxlength="8" v-model="interval.begin" class="form-control">
                                        <span class="help-block">hh:mm:ss</span>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <input disabled="disabled" type="text" maxlength="8" v-model="interval.end" class="form-control">
                                        <span class="help-block">hh:mm:ss</span>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="checkbox checkbox-right checkbox-switchery text-center">
                                        <label v-on:click.prevent="config.alterLinkDef.add.scheduleIndex = intervalIndex; config.alterLinkDef.add.scheduleId = interval.id">
                                            <span class="switchery switchery-default switchery-custom" :class="config.alterLinkDef.add.scheduleIndex === intervalIndex ? 'active' : 'not-active'">
                                                <small></small>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="custom-divider"></div>
                        <div class="custom-divider"></div>
                        <div class="row">
                            <div class="col-sm-6">
                                <span><b>Fecha</b></span>
                            </div>
                            <div class="col-sm-6">
                                <div :class="config.alterLinkDef.add.date.valid ? '' : 'has-error'" class="form-group">
                                    <input v-model="config.alterLinkDef.add.date.value" v-on:change="config.validation('add')" name="Fecha" placeholder="Fecha" class="form-control" type="date">
                                    <span class="help-block">{{config.alterLinkDef.add.date.text}}</span>
                                </div>
                            </div>
                        </div>
                        <div style="height: 10px;"></div>
                    </div>
                    <div class="modal-footer modal-footer-custom">
                        <button type="button" v-on:click="config.add()" class="btn btn-default btn-customized">Ligar</button>
                        <button id="closeAdd" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="see" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.alterLinkDef.see.route.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div v-if="config.alterLinkDef.see.routeLinked.date !== null" class="row">
                            <div class="form-group">
                                <label class="control-label col-lg-2">Fecha</label>
                                <div class="col-lg-10">
                                    <input disabled="disabled" class="form-control" v-model="config.alterLinkDef.see.routeLinked.date" type="date" name="Fecha">
                                </div>
                            </div>
                        </div>
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
                                    <input disabled="disabled" type="text" maxlength="8" v-model="config.alterLinkDef.see.route.begin.value" class="form-control">
                                    <span class="help-block">{{config.alterLinkDef.see.route.begin.text}}</span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input disabled="disabled" type="text" maxlength="8" v-model="config.alterLinkDef.see.route.end.value" class="form-control">
                                    <span class="help-block">{{config.alterLinkDef.see.route.end.text}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <div class="steps-basic wizard clearfix">
                                        <div class="steps clearfix">
                                            <ul role="tablist">
                                                <li v-for="(steps, stepIndex) in config.alterLinkDef.see.route.day.options" role="tab"
                                                :class="[stepIndex === 0 ? 'first' : '',
                                                        steps.value === config.alterLinkDef.see.route.day.value ? 'done active' : 'active']" aria-disabled="false" aria-selected="true">
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
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <div id="mapFocusPositionSeeRoute" v-on:click="config.alterLinkDef.see.route.focusPosition()" class="map-focus-position text-center">
                                        <i class="icon-shrink3"></i>
                                    </div>
                                    <div id="mapSeeRoute" class="map-container-modal map-basic"></div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="row title-info">
                                    <div class="col-sm-12">
                                        <span>Distancia Total: {{config.alterLinkDef.see.route.store.data.totalDistance / 1000}} km.</span>
                                    </div>
                                    <div class="col-sm-12">
                                        <span>Tiempo Total: {{config.alterLinkDef.see.route.store.point.length > 0 ? config.alterLinkDef.see.route.store.data.totalTime : '00:00:00'}}.</span>
                                    </div>
                                </div>
                                <template v-if="config.alterLinkDef.see.route.store.point.length > 0">
                                    <template v-for="(store, storeIndex) in config.alterLinkDef.see.route.store.point" class="selected grid-row-customized grid-row-highlight-customized">
                                        <div class="row main-info grid-row-customized grid-row-highlight-customized selected" style="padding-top: 8px; padding-bottom: 8px;">
                                            <div class="col-sm-2">
                                                <img :src="store.main.getIcon().url">
                                                <div class="icon-label-toolbar">{{storeIndex + 1}}</div>
                                            </div>
                                            <div class="col-sm-10">
                                                {{store.name}}
                                            </div>
                                        </div>
                                    </template>
                                </template>
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
                        <h4 class="modal-title" id="myModalLabel">Editar ruta ligada: {{config.alterLinkDef.edit.routeName}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div class="row">
                            <div class="col-sm-6">
                                <span><b>Fecha</b></span>
                            </div>
                            <div class="col-sm-6">
                                <div :class="config.alterLinkDef.edit.date.valid ? '' : 'has-error'" class="form-group">
                                    <input v-model="config.alterLinkDef.edit.date.value" v-on:change="config.validation('edit')" name="Fecha" placeholder="Fecha" class="form-control" type="date">
                                    <span class="help-block">{{config.alterLinkDef.edit.date.text}}</span>
                                </div>
                            </div>
                        </div>
                        <div style="height: 10px;"></div>
                    </div>
                    <div class="modal-footer modal-footer-custom">
                        <button type="button" v-on:click="config.edit()" class="btn btn-default btn-customized">Editar</button>
                        <button id="closeEdit" type="button" class="btn btn-default btn-customized" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;