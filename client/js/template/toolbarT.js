module.exports = `
    <div class="col-sm-4">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Basic map</h5>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body">
                <div class="map-toolbar">
                    <div class="row title-info">
                        <div class="col-sm-12">
                            <span>Distancia Total: {{config.configuration.service.totalDistance / 1000}} km.</span>
                        </div>
                        <div class="col-sm-12">
                            <span>Tiempo Total: {{Math.floor((config.configuration.service.totalTime + config.configuration.service.deathTime * 60) / 60) + ' min. ' + Math.floor(((config.configuration.service.totalTime / 60) % 1) * 60) + ' seg.'}}</span>
                        </div>
                        <div class="col-sm-12 text-right">
                            <button v-on:click="config.collapse()" class="btn btn-info btn-small">
                                {{config.configuration.stepsHidden ? 'Expandir' : 'Colapsar'}} <i :class="config.configuration.stepsHidden ? 'fa-sort-desc' : 'fa-sort-asc'" class="fa" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <template v-if="config.configuration.service.travelDetails.legs.length > 0">
                        <template v-for="(data, dataIndex) in config.configuration.service.travelDetails.legs">
                            <div class="row main-info">
                                <div class="col-sm-2">
                                    <img :src="data.iconStart">
                                </div>
                                <div class="col-sm-10">
                                    <a href="#" v-on:click.prevent="data.hidden = !data.hidden">
                                        <span>{{data.start}}</span>
                                    </a>
                                </div>
                                <div class="col-sm-6">
                                    <span>Tiempo Muerto (minutos):</span>
                                </div>
                                <div class="col-sm-6">
                                    <input v-on:keyup="config.computeRoute(false)" class="form-control" v-model="data.deathTime" type="number" value="0">
                                </div>
                            </div>
                            <template v-for="steps in data.steps" v-if="!data.hidden">
                                <div class="row second-info">
                                    <div class="col-sm-12">
                                        <span>{{steps.instructions}}</span>
                                    </div>
                                    <div class="col-sm-12 value-info text-center">
                                        <span>(Distancia aproximada: {{steps.distance.text}}. Tiempo aproximado: {{steps.duration.text}})</span>
                                    </div>
                                </div>
                            </template>
                            <div v-if="config.configuration.service.travelDetails.legs.length - 1 === dataIndex" class="row main-info">
                                <div class="col-sm-1">
                                    <img :src="data.iconEnd">
                                </div>
                                <div class="col-sm-10">
                                    <span>{{data.end}}</span>
                                </div>
                            </div>
                        </template>
                        <div class="row warning-info">
                            <span>Notas:</span>
                            <div v-for="data in config.configuration.service.travelDetails.warnings" class="col-sm-12">
                                <span>{{data.text}}</span>
                            </div>
                        </div>
                        <div class="row copyright-info text-center">
                            <div class="col-sm-12">
                                <span>{{config.configuration.service.travelDetails.copyrights}}</span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
`;