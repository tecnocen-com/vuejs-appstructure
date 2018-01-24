module.exports = `
  <div>
    <ul v-for="(menu, menuIndex) in config.menu">
      <li
      :class="[active.first === menuIndex ? 'active' : '',
      menu.dropdown.length > 0 ? 'dropdown' : '']">
        <a href="#"
        v-on:click.prevent="menu.dropdown.length > 0 ? function(){} : setview({first: menuIndex, second: 0, third: 0})"
        :class="menu.dropdown.length > 0 ? 'dropdown' : ''">
          {{menu.title}}
        </a>
        <ul v-if="menu.dropdown.length > 0" class="dropdown-menu">
          <template v-for="(dropdown, dropdownIndex) in menu.dropdown">
            <li class="dropdown-header">{{dropdown.title}}</li>
            <li v-for="(subs, subsIndex) in dropdown.subs">
              <a href="#" v-on:click.prevent="setview({first: menuIndex, second: dropdownIndex, third: subsIndex})">
                {{subs.title}}
              </a>
            </li>
          </template>
        </ul>
      </li>                    
    </ul>
  </div>
`;