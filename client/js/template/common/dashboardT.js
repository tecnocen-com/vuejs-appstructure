module.exports = `
    <div class="row">
        <div class="col-sm-5">
            <div class="panel panel-flat" style="background-color: transparent; box-shadow: none;">
                <div class="panel-body">
                    <div :style="{ 'max-height': config.height + 'px', height: config.width + 'px'} ">
                        <div class="dashboard-menu"
                            :style="{
                                'width': (config.width > config.height ? config.height : config.width) + 'px',
                                height: (config.width > config.height ? config.height : config.width) + 'px'
                            } ">
                            <div class="dashboard-menu-inner" :style="{top: config.innerStyle + 'px', left: config.innerStyle + 'px', right: config.innerStyle + 'px', bottom: config.innerStyle + 'px'} ">
                            </div>
                            <a href="#" v-on:click.prevent="setview({first: 1, second: 0, third: 0})" title="Clientes">
                                <div class="dashboard-icon dashboard-client" :style="{'width': config.iconStyle + 'px', height: config.iconStyle + 'px', transform: 'translate(' + config.translateClientX + 'px, -' + config.translateClientY + 'px)'} ">
                                </div>
                            </a>
                            <a href="#" v-on:click.prevent="setview({first: 2, second: 0, third: 0})" title="Tiendas">
                                <div class="dashboard-icon dashboard-store" :style="{'width': config.iconStyle + 'px', height: config.iconStyle + 'px', transform: 'translate(' + config.translateStoreX + 'px, ' + config.translateStoreY + 'px)'} ">
                                </div>
                            </a>
                            <a href="#" v-on:click.prevent="setview({first: 3, second: 0, third: 0})" title="Recursos Humanos">
                                <div class="dashboard-icon dashboard-resource" :style="{'width': config.iconStyle + 'px', height: config.iconStyle + 'px', transform: 'translate(' + config.translateResourceX + 'px, ' + config.translateResourceY + 'px)'} ">
                                </div>
                            </a>
                            <a href="#" v-on:click.prevent="setview({first: 4, second: 0, third: 0})" title="Rutas">
                                <div class="dashboard-icon dashboard-route" :style="{'width': config.iconStyle + 'px', height: config.iconStyle + 'px', transform: 'translate(' + config.translateRouteX + 'px, ' + config.translateRouteY + 'px)'} ">
                                </div>
                            </a>
                            <a href="#" v-on:click.prevent="setview({first: 5, second: 0, third: 0})" title="Reportes">
                                <div class="dashboard-icon dashboard-report" :style="{'width': config.iconStyle + 'px', height: config.iconStyle + 'px', transform: 'translate(' + config.translateReportX + 'px, ' + config.translateReportY + 'px)'} ">
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-7">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <h4 class="panel-title">Resumen general de usuario</h4>
                </div>
                <div class="panel-body">
                    <p class="content-group">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sem in sodales congue. Etiam aliquet efficitur massa, sed iaculis nulla molestie eget. Aenean tincidunt facilisis sapien scelerisque vestibulum. Duis laoreet purus turpis, sed sollicitudin ligula varius at. Mauris malesuada rhoncus nunc interdum porttitor. Aliquam erat volutpat. Integer imperdiet dapibus varius. Nunc sollicitudin bibendum rutrum.
                        <br><br>
                        Praesent condimentum sem nec turpis scelerisque consectetur. Cras quis urna dignissim, pharetra libero nec, sollicitudin ante. Suspendisse cursus lacinia massa a auctor. In at eleifend mi, non egestas mauris. Sed commodo luctus venenatis. Nullam odio ipsum, tempus id auctor sit amet, dictum vitae nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eleifend elit nec nulla venenatis, non porta tellus vulputate. Vivamus porta ante in efficitur commodo. Vivamus interdum nibh in egestas rhoncus. Nulla at varius nisi, sit amet iaculis sem. Phasellus porta quis urna at mollis. Nullam hendrerit nulla sit amet felis pulvinar, tincidunt luctus ligula ultricies. Quisque luctus, mi vitae pharetra blandit, sem justo tempor eros, eget volutpat augue leo vitae lorem. Aenean id lectus non ipsum blandit tristique.
                        <br><br>
                        Integer accumsan eget felis eget faucibus. Nullam congue sed leo ac lacinia. Ut id semper mi, vel varius turpis. Etiam non quam ut nisi efficitur facilisis vitae vitae nunc. Sed finibus, enim eget aliquet accumsan, magna lectus tristique ligula, et fermentum dolor justo tristique lectus. Fusce facilisis fermentum placerat. Nullam convallis quis metus maximus fringilla. Aenean luctus nisi ut tristique luctus. Suspendisse felis dolor, consequat vel malesuada non, sagittis eu ipsum. Suspendisse ut lacinia ante, nec auctor leo. Ut sodales lobortis eros, nec pretium ex congue eu. Quisque convallis suscipit lacus, in maximus ante ultricies vel. Vestibulum rhoncus orci venenatis leo dignissim maximus. Sed mollis lacus ut fringilla congue. Morbi pellentesque tellus vel varius pharetra.
                        <br><br>
                        Vestibulum sagittis, tellus at aliquet consectetur, mi eros maximus lacus, non hendrerit diam mauris et ante. Integer mattis et risus id iaculis. Donec erat felis, faucibus vel dolor eget, facilisis hendrerit lorem. Phasellus viverra efficitur enim nec tincidunt. Curabitur blandit auctor lacus eu posuere. Fusce mattis elit vitae leo viverra, pellentesque mattis velit finibus. Nam eget libero sed tortor accumsan imperdiet. Duis justo est, mollis dignissim ligula at, vulputate fermentum purus. Etiam vitae fermentum urna, id eleifend nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec mollis libero.
                        <br><br>
                        Nunc est ipsum, euismod non tristique in, porttitor eget orci. Sed id porta turpis. Aliquam erat volutpat. Vivamus vitae metus interdum nisi gravida bibendum vitae quis ligula. Donec eu ex vel lectus pellentesque rhoncus. Sed consequat sed sapien eget vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce ac congue arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut quis auctor velit. Pellentesque pharetra maximus tristique. Curabitur fermentum luctus nibh, at vulputate ante elementum vel. Sed eget lorem eu orci ullamcorper ornare in rutrum sapien.
                        <br><br>
                        Donec quis sagittis mi, a auctor magna. Donec rutrum mi quis massa eleifend tincidunt. Integer et sagittis mauris. Nulla sagittis augue sed lobortis imperdiet. Donec sed sapien vel neque placerat suscipit. Nam ornare eros vel justo malesuada sollicitudin. Vivamus sollicitudin erat lorem, a faucibus sem dictum quis.
                        <br><br>
                        Pellentesque at dui eget diam feugiat mollis. Morbi eget imperdiet nunc, dictum lobortis elit. Quisque fermentum eros elit, non dignissim diam ultrices vitae. Duis in enim non felis tincidunt interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec interdum neque vitae velit pellentesque hendrerit. Praesent feugiat magna nec felis lacinia sollicitudin. Nullam vel finibus magna, ut iaculis mauris. Pellentesque est neque, scelerisque et eleifend quis, blandit non dui.
                        <br><br>
                        Nam justo mauris, rhoncus vitae fringilla bibendum, feugiat vel magna. Vestibulum finibus id eros ac tincidunt. Etiam malesuada at justo vel cursus. Nulla volutpat, libero id sollicitudin commodo, est ex pellentesque ipsum, ultrices pretium erat massa sed est. Curabitur at pretium nisl, quis pellentesque sapien. Aenean fermentum varius lorem, ac mattis lacus. Ut non semper ipsum. Curabitur non ligula et lacus fringilla tempor id eget tellus. Proin at sodales justo.
                    </p>
                </div>
            </div>
        </div>
    </div>
`;