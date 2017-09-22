module.exports = `
    <div class="page-header">
        <div class="page-header-content">
            <div class="page-title">
                <h4>
                    <a href="#"
						v-on:click.prevent="
							active.first === 1 && active.second === 0  && active.third === 0 ? clientesview(0) :
							active.first === 2 && active.second === 0  && active.third === 0 ? tiendasview(0) :
							active.first === 3 && active.second === 0  && active.third === 0 ? recursosview(0) :
							active.first === 4 && active.second === 0  && active.third === 0 ? rutasview(0) : ''
						"
					>
						<i class="icon-arrow-left52 position-left"></i>
					</a>
                    <span class="text-semibold">
                        <b>{{config.menu[active.first].title}}</b>
                        {{config.menu[active.first].dropdown.length > 0 ? ' - ' + config.menu[active.first].dropdown[active.second].title : ''}}
                    </span>
                    <small v-if="active.first === 0 && active.second === 0 && active.third === 0" class="display-block">Buen día, {{profile.name}}!</small>
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
`;