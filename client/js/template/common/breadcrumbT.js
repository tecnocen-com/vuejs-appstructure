module.exports = `
  <div>
    <div>
      <div v-if="active.first !== 0">
        <h4><b>Breadcrumb</b></h4>
        <ul>
          <li>{{config.menu[0].title}}</li>
          <li>{{config.menu[active.first].title}}</li>
          <li v-if="config.menu[active.first].dropdown.length > 0">{{config.menu[active.first].dropdown[active.second].title}}</li>
          <li v-if="config.menu[active.first].dropdown.length > 0" class="active">{{config.menu[active.first].dropdown[active.second].subs[active.third].title}}</li>
        </ul>
      </div>
    </div>
  </div>
`;