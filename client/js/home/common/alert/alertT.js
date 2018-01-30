module.exports = `
  <div v-if="active">
    <div>
        <h3>{{description.title}}</h3>
    </div>
    <p><b v-html="description.text"></b></p>
    <div>
        <a href="#" v-on:click.prevent="active = !active"><span>{{description.ok}}</span></a>
    </div>
  </div>
`;