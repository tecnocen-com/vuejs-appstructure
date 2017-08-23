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
                                <tbody class="body-class">
                                    <tr v-for="store in config.storeLinked" class="grid-row-customized grid-row-highlight-customized">
                                        <td class="col-md-1">
                                            {{store.name}}
                                            <div class="pull-right">
                                                <a href="#" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Ver">
                                                    <i class="icon-eye" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" v-on:click.prevent="config.setLink('unlink', store.id)" v-on:click.prevent class="alert alert-info grid-handlers grid-custom-handlers grid-handlers-customized" title="Desligar">
                                                    <i class="icon-unlink" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;