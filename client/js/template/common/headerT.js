module.exports = `
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#" v-on:click.prevent="setview({first: 0, second: 0, third: 0})">
                <img src="/image/logo/techfor180-45.png" alt="">
            </a>

            <ul class="nav navbar-nav pull-right visible-xs-block">
                <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
            </ul>
        </div>

        <div class="navbar-collapse collapse" id="navbar-mobile">
            <p class="navbar-text"><span class="label bg-success-400">En línea</span></p>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown dropdown-user">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <img src="assets/images/placeholder.jpg" alt="">
                        <span>{{profile.name}}</span>
                        <i class="caret"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li><a href="#"><i class="icon-cog5"></i> Configuración </a></li>
                        <li class="divider"></li>
                        <li><a href="/logout"><i class="icon-switch2"></i> Cerrar Sesión </a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
`;