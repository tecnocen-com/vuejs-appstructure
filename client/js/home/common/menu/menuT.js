module.exports = `
  <div>
    <ul>
      <li v-for="(menu, menuIndex) in menu">
        <router-link :to="menu.path">{{ menu.title }}</router-link>
      </li>
    </ul>
  </div>
`;