module.exports = `
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
`;