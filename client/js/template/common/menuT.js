module.exports = `
    <div>
        <div class="navbar navbar-default" id="navbar-second">
            <ul class="nav navbar-nav no-border visible-xs-block">
                <li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-second-toggle"><i class="icon-menu7"></i></a></li>
            </ul>
            
            <div class="navbar-collapse collapse" id="navbar-second-toggle">
                <ul class="nav navbar-nav" v-for="(menu, menuIndex) in config.menu">
                    <li :class="[active.first === menuIndex ? 'active' : '',
                                menu.dropdown.length > 0 ? 'dropdown' : '']">
                        <a href="#" v-on:click.prevent="menu.dropdown.length > 0 ? function(){} : setview({first: menuIndex, second: 0, third: 0})" :class="menu.dropdown.length > 0 ? 'dropdown-toogle' : ''"
                                    :data-toggle="menu.dropdown.length > 0 ? 'dropdown' : ''">
                            <i :class="menu.icon" class="position-left"></i> {{menu.title}}
                            <template v-if="menu.dropdown.length > 0">
                                <span class="caret"></span>
                            </template>
                        </a>
                        <ul v-if="menu.dropdown.length > 0" class="dropdown-menu width-200">
                            <template v-for="(dropdown, dropdownIndex) in menu.dropdown">
                                <li class="dropdown-header">{{dropdown.title}}</li>
                                <li v-for="(subs, subsIndex) in dropdown.subs">
                                    <a href="#" v-on:click.prevent="setview({first: menuIndex, second: dropdownIndex, third: subsIndex})">
                                        <i :class="subs.icon"></i> {{subs.title}}
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </li>                    
                </ul>
            </div>
        </div>
        
        <div class="page-header">
            <div class="page-header-content">
                <div class="page-title">
                    <h4>
                        <i class="icon-arrow-left52 position-left"></i>
                        <span class="text-semibold">
                            <b>{{config.menu[active.first].title}}</b>
                            {{config.menu[active.first].dropdown.length > 0 ? ' - ' + config.menu[active.first].dropdown[active.second].title : ''}}
                        </span>
                        <small v-if="active.first === 0 && active.second === 0 && active.third === 0" class="display-block">Buen día, Administrador!</small>
                    </h4>
                    <ul v-if="active.first !== 0 || active.second !== 0 || active.third !== 0" class="breadcrumb breadcrumb-caret position-right">
                        <li><a href="#" v-on:click.prevent="setview({first: 0, second: 0, third: 0})">{{config.menu[0].title}}</a></li>
                        <li><a href="#" v-on:click.prevent>{{config.menu[active.first].title}}</a></li>
                        <li v-if="config.menu[active.first].dropdown.length > 0"><a href="#" v-on:click.prevent>{{config.menu[active.first].dropdown[active.second].title}}</a></li>
                        <li v-if="config.menu[active.first].dropdown.length > 0" class="active">{{config.menu[active.first].dropdown[active.second].subs[active.third].title}}</li>
                    </ul>
                </div>
                
                <div class="heading-elements">
                    <div v-if="config.menu[active.first].dropdown.length > 0" class="heading-btn-group">
                        <a href="#" v-on:click.prevent="setview({first: active.first, second: active.second, third: subsIndex})"
                                    v-for="(subs, subsIndex) in config.menu[active.first].dropdown[active.second].subs" class="btn btn-link btn-float has-text">
                            <i :class="subs.icon" class="text-primary"></i><span>{{subs.title}}</span>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
`;