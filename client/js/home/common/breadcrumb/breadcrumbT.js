module.exports = `
  <div>
    <div>
      <div>
        <h4><b>Breadcrumb</b></h4>
        <ul>
          <li>{{ home }}</li>
          <li v-for="p in path" v-if="p !== ''">{{ p }}</li>
        </ul>
      </div>
    </div>
  </div>
`;