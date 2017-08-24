module.exports = `
    <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">{{config.client.name}}</h4>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(1)" title="Tiendas"><span aria-hidden="true" class="glyphicon glyphicon-tags"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(2)" title="Recursos humanos"><span aria-hidden="true" class="glyphicon glyphicon-briefcase"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(3)" title="Rutas"><span aria-hidden="true" class="glyphicon glyphicon-road"></span></a></li>
                            <li class="flat-handler-custom"><a href="#" v-on:click.prevent="setview(0)" title="Regresar"><i class="icon-history"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">Todas las tiendas</h4>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                <input type="text" v-model="config.data.search.store" v-on:keyup="config.init(1)" class="form-control" placeholder="Búsqueda">
                                <div class="form-control-feedback" style="width: 30px;">
                                    <i class="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
                                <tbody class="body-class">
                                    <tr v-for="store in config.store" :class="store.selected ? 'selected' : ''" class="grid-row-customized grid-row-highlight-customized">
                                        <td class="col-md-1">
                                            {{store.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('link', store.id)" :class="store.selected ? 'not-active' : ''" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ligar">
                                                    <i class="icon-link" aria-hidden="true"></i>
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
                                    <span><b>Mostrando {{config.store.length}} de {{config.data.page.store.totalCount}} filas en la página {{config.data.page.store.currentPage}} de {{config.data.page.store.pageCount}}.</b></span>
                                </li>
                                <li  :class="config.data.page.store.currentPage === 1 ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, 1);">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="config.data.page.store.pageCount <= 3">
                                    <li v-for="page in config.data.page.store.pageCount" :class="page === config.data.page.store.currentPage ? 'active' : ''">
                                        <a href="#" v-on:click.prevent="page === config.data.page.store.currentPage ? '' : config.init(1, page);">
                                            {{page}}
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="config.data.page.store.currentPage < 3">
                                        <li :class="config.data.page.store.currentPage === 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === 1 ? '' : config.init(1, 1);">
                                                1
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === 2 ? '' : config.init(1, 2);">
                                                2
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === 3 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === 3 ? '' : config.init(1, 3);">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                    <template v-else-if="config.data.page.store.currentPage > config.data.page.store.pageCount - 2">
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === config.data.page.store.pageCount - 2 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === config.data.page.store.pageCount - 2 ? '' : config.init(1, config.data.page.store.pageCount - 2);">
                                                {{config.data.page.store.pageCount - 2}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === config.data.page.store.pageCount - 1 ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === config.data.page.store.pageCount - 1 ? '' : config.init(1, config.data.page.store.pageCount - 1);">
                                                {{config.data.page.store.pageCount - 1}}
                                            </a>
                                        </li>
                                        <li :class="config.data.page.store.currentPage === config.data.page.store.pageCount ? 'active' : ''">
                                            <a href="#" v-on:click.prevent="config.data.page.store.currentPage === config.data.page.store.pageCount ? '' : config.init(1, config.data.page.store.pageCount);">
                                                {{config.data.page.store.pageCount}}
                                            </a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.store.currentPage - 1)">
                                                {{config.data.page.store.currentPage - 1}}
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" v-on:click.prevent>
                                                {{config.data.page.store.currentPage}}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" v-on:click.prevent="config.init(1, config.data.page.store.currentPage + 1)">
                                                {{config.data.page.store.currentPage + 1}}
                                            </a>
                                        </li>
                                        <li>
                                            <span aria-hidden="true">...</span>
                                        </li>
                                    </template>
                                </template>
                                <li :class="config.data.page.store.pageCount === config.data.page.store.currentPage ? 'not-active disabled' : ''">
                                    <a href="#" v-on:click.prevent="config.init(1, config.data.page.store.pageCount);">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title text-center">Tiendas ligadas</h4>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-12 grid-relation">
                            <table class="table table-bordered">
                                <!--<thead>
                                    <tr>
                                        <div class="form-group has-feedback has-feedback-left" style="margin-bottom: 2px;">
                                            <input type="text" class="form-control" placeholder="Búsqueda">
                                            <div class="form-control-feedback" style="width: 30px;">
                                                <i class="icon-search4 text-size-base"></i>
                                            </div>
                                        </div>
                                    </tr>
                                </thead>-->
                                <tbody class="body-class">
                                    <tr v-for="store in config.storeLinked" class="grid-row-customized grid-row-highlight-customized">
                                        <td class="col-md-1">
                                            {{store.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('unlink', store.id)" class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Desligar">
                                                    <i class="icon-unlink" aria-hidden="true"></i>
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
                                    <span><b>Mostrando {{config.storeLinked.length}} de {{config.data.page.storeLinked.totalCount}} filas en la página {{config.data.page.storeLinked.currentPage}} de {{config.data.page.storeLinked.pageCount}}.</b></span>
                                </li>
                                <li class="disabled not-active">
                                    <a href="#" v-on:click.prevent>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li>
                                    <span aria-hidden="true">...</span>
                                </li>
                                <li class="active">
                                    <a href="#" v-on:click.prevent>
                                        1
                                    </a>
                                </li>
                                <li>
                                    <a href="#" v-on:click.prevent>
                                        2
                                    </a>
                                </li>
                                <li>
                                    <span aria-hidden="true">...</span>
                                </li>
                                <li>
                                    <a href="#" v-on:click.prevent>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;