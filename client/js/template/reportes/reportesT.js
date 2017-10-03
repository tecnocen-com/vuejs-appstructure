module.exports = `
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Filtro</h5>
                </div>
                <div class="panel-body">
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group text-center">
								<div class="checker border-indigo-600 text-indigo-800">
									<span :class="config.filter.type === false ? 'checked' : ''">
										<input v-on:click="config.filter.type = false; config.initInputDate()" type="checkbox" class="control-custom" checked="checked">
									</span>
								</div>
								<span class="help-block">Filtrar por rango</span>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group text-center">
								<div class="checker border-indigo-600 text-indigo-800">
									<span :class="config.filter.type === true ? 'checked' : ''">
										<input v-on:click="config.filter.type = true; config.initInputDate()" type="checkbox" class="control-custom" checked="checked">
									</span>
								</div>
								<span class="help-block">Filtrar manualmente</span>
							</div>
						</div>
					</div>
					<div style="height: 10px;"></div>
                    <div v-if="config.filter.type" class="row">
						<div class="col-sm-12">
							<div class="form-group">
								<label class="control-label col-lg-2">Fechas</label>
								<div class="col-lg-10">
									<input id="random" class="hidden" type="text" onkeypress="return false">
									<input readonly="readonly" id="randomShown" v-model="config.filter.randomDate.text" v-on:click="config.handleMulti(true)" name="Fechas" placeholder="Fechas" class="form-control" type="text">
								</div>
							</div>
						</div>
                    </div>
					<div v-else class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<label class="control-label col-lg-2">Fecha de inicio</label>
								<div class="col-lg-10">
									<input readonly="readonly" id="begin" v-model="config.filter.rangeDate.begin.value" name="Fecha de inicio" placeholder="Fecha de inicio" class="form-control" type="text">
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label class="control-label col-lg-2">Fecha de término</label>
								<div class="col-lg-10">
									<input readonly="readonly" :disabled="config.filter.rangeDate.begin.value === null" id="end" v-model="config.filter.rangeDate.end.value" name="Fecha de término" placeholder="Fecha de término" class="form-control" type="text">
								</div>
							</div>
						</div>
                    </div>
					<div style="height: 10px;"></div>
					<div v-if="(config.filter.randomDate.value.length > 0 && config.filter.type) || (config.filter.rangeDate.begin.value !== null && config.filter.rangeDate.end.value !== null && !config.filter.type)" class="row">
						<div class="col-sm-12">
							<div class="form-group">
								<div class="steps-basic wizard clearfix">
									<div class="actions clearfix">
										<ul role="menu" aria-label="Pagination">
											<li>
												<a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.initTemplate(0, 1);" role="menuitem">Filtrar</a>
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
        <div v-if="config.step === 1" class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h5 class="panel-title">Proyecciones</h5>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
								<thead class="table-inverse">
									<tr>
										<th class="text-center"><b>Ruta</b></th>
										<th class="text-center"><b>Fecha</b></th>
										<th class="text-center"><b>Día</b></th>
										<th class="text-center"><b>Empleado</b></th>
									</tr>
								</thead>
                                <tbody class="body-class">
                                    <tr v-for="(proyection, proyectionIndex) in config.proyection"
                                        :class="proyection.linked ? 'selected' : proyection.selected ? 'link-row-select' : ''"
                                        class="grid-row-customized grid-row-highlight-customized">
                                        <td v-on:click.self="config.setToExport(proyectionIndex)" class="col-md-1">
                                            {{proyection.route.name}}
                                        </td>
										<td v-on:click.self="config.setToExport(proyectionIndex)" class="col-md-1">
                                            {{proyection.day.date}}
                                        </td>
										<td v-on:click.self="config.setToExport(proyectionIndex)" class="col-md-1">
                                            {{proyection.day.name}}
                                        </td>
										<td v-on:click.self="config.setToExport(proyectionIndex)" class="col-md-1">
                                            {{proyection.resource.name}}
											<div class="pull-right">
                                                <a href="#" v-on:click.prevent="config.seeRoute(proyectionIndex)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver" data-toggle="modal" data-target="#see">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <nav class="pull-right">
                            <ul class="pagination">
                                <li>
                                    <span><b>Mostrando {{config.proyection.length}} de {{config.data.page.proyection.totalCount}} filas en la página {{config.data.page.proyection.currentPage}} de {{config.data.page.proyection.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.proyection.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.initTemplate(1, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.proyection.pageCount <= 3">
                                    <li v-for="page in config.data.page.proyection.pageCount" :class="page === config.data.page.proyection.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.proyection.currentPage ? '' : config.initTemplate(1, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.proyection.currentPage < 3">
                                        <li :class="config.data.page.proyection.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.proyection.currentPage === 1 ? '' : config.initTemplate(1, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.proyection.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.proyection.currentPage === 2 ? '' : config.initTemplate(1, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.proyection.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.proyection.currentPage === 3 ? '' : config.initTemplate(1, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.proyection.currentPage > config.data.page.proyection.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.proyection.currentPage === config.data.page.proyection.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.proyection.currentPage === config.data.page.proyection.pageCount - 2 ? '' : config.initTemplate(1, config.data.page.proyection.pageCount - 2);">
                                                {{config.data.page.proyection.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.proyection.currentPage === config.data.page.proyection.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.proyection.currentPage === config.data.page.proyection.pageCount - 1 ? '' : config.initTemplate(1, config.data.page.proyection.pageCount - 1);">
                                                {{config.data.page.proyection.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.proyection.currentPage === config.data.page.proyection.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.proyection.currentPage === config.data.page.proyection.pageCount ? '' : config.initTemplate(1, config.data.page.proyection.pageCount);">
                                                {{config.data.page.proyection.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.initTemplate(1, config.data.page.proyection.currentPage - 1)">
                                                {{config.data.page.proyection.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.proyection.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.initTemplate(1, config.data.page.proyection.currentPage + 1)">
                                                {{config.data.page.proyection.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.proyection.pageCount === config.data.page.proyection.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.initTemplate(1, config.data.page.proyection.pageCount);">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
					<div style="height: 10px;"></div>
					<div v-if="config.proyectionToExport.length > 0" class="row">
						<div class="col-sm-12">
							<div class="form-group">
								<div class="steps-basic wizard clearfix">
									<div class="actions clearfix">
										<ul role="menu" aria-label="Pagination">
											<li>
												<a class="btn btn-info btn-customized" href="#finish" v-on:click.prevent="config.doExport()" role="menuitem">Exportar</a>
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
		<div class="modal fade" id="see" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <button type="button" class="close modal-buttom-custom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{config.see.route.name}}</h4>
                    </div>
                    <div class="modal-body modal-body-custom">
                        <div v-if="config.see.date !== null" class="row">
                            <div class="form-group">
                                <label class="control-label col-lg-2">Fecha</label>
                                <div class="col-lg-10">
                                    <input disabled="disabled" class="form-control" v-model="config.see.date" type="date" name="Fecha">
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
                                    <input disabled="disabled" type="text" maxlength="8" v-model="config.see.route.begin.value" class="form-control">
                                    <span class="help-block">{{config.see.route.begin.text}}</span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input disabled="disabled" type="text" maxlength="8" v-model="config.see.route.end.value" class="form-control">
                                    <span class="help-block">{{config.see.route.end.text}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <div class="steps-basic wizard clearfix">
                                        <div class="steps clearfix">
                                            <ul role="tablist">
                                                <li v-for="(steps, stepIndex) in config.see.route.day.options" role="tab"
                                                :class="[stepIndex === 0 ? 'first' : '',
                                                        steps.value === config.see.route.day.value ? 'done active' : 'active']" aria-disabled="false" aria-selected="true">
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
                                    <div id="mapFocusPositionSeeRoute" v-on:click="config.see.route.focusPosition()" class="map-focus-position text-center">
                                        <i class="icon-shrink3"></i>
                                    </div>
                                    <div id="mapSeeRoute" class="map-container-modal map-basic"></div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="row title-info">
                                    <div class="col-sm-12">
                                        <span>Distancia Total: {{config.see.route.store.data.totalDistance / 1000}} km.</span>
                                    </div>
                                    <div class="col-sm-12">
                                        <span>Tiempo Total: {{config.see.route.store.point.length > 0 ? config.see.route.store.data.totalTime : '00:00:00'}}.</span>
                                    </div>
                                </div>
                                <template v-if="config.see.route.store.point.length > 0">
                                    <template v-for="(store, storeIndex) in config.see.route.store.point" class="selected grid-row-customized grid-row-highlight-customized">
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
    </div>
`;