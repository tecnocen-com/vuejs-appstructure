module.exports = `
  <div v-if="config.active">
    <div>
      <h3>{{config.description.title}}</h3>
    </div>
    <p><b v-html="config.description.text"></b></p>
    <div>
      <a href="#" v-on:click.prevent="config.onAccept()"><span>{{config.description.accept}}</span></a>
      <a href="#" v-on:click.prevent="config.active = !config.active"><span>{{config.description.cancel}}</span></a>
    </div>
  </div>
`;