BUTO.templates = {
  loader: require("./template/common/loaderT.js"),
  confirm: require("./template/common/confirmT.js"),
  alert: require("./template/common/alertT.js"),
  
  heading: require("./template/common/headerT.js"),
  menu: require("./template/common/menuT.js"),
  breadcrumb: require("./template/common/breadcrumbT.js"),
  foot: require("./template/common/footerT.js"),

  dashboard: require("./template/dashboard/dashboardT.js"),
  test: require("./template/test/testT.js"),
};
Vue.component("loader", {
  template: BUTO.templates.loader,
  props: {
    config: Object
  }
});
Vue.component("confirm", {
  template: BUTO.templates.confirm,
  props: {
    config: Object
  }
});
Vue.component("alert", {
  template: BUTO.templates.alert,
  props: {
    config: Object
  }
});

Vue.component("heading", {
  template: BUTO.templates.heading,
  props: {
    profile: Object
  }
});
Vue.component("my-menu", {
  template: BUTO.templates.menu,
  props: {
    config: Object,
    active: Object,
    setview: Function
  }
});
Vue.component("breadcrumb", {
  template: BUTO.templates.breadcrumb,
  props: {
    config: Object,
    active: Object
  }
});
Vue.component("foot", {
  template: BUTO.templates.foot,
  props: {
    config: Object
  }
});
Vue.component("dashboard", {
  template: BUTO.templates.dashboard,
  props: {
    config: Object
  }
});

Vue.component("test", {
  template: BUTO.templates.test,
  props: {
    config: Object
  }
});
module.exports = `
  <div>
    <transition name="slide-fade">
      <loader :config="loader"></loader>
    </transition>
    <transition name="slide-fade">
      <confirm :config="confirm"></confirm>
    </transition>
    <transition name="slide-fade">
      <alert :config="alert"></alert>
    </transition>
    <heading :profile="profile"></heading>
    <my-menu
    :config="children.menu"
    :active="active"
    :setview="setView"></my-menu>
    <breadcrumb
    :config="children.menu"
    :active="active"
    :setview="setView"></breadcrumb>
    
    <div>
      <div>
        <template v-if="active.first === 0 && active.second === 0 && active.third === 0">
          <transition name="slide-fade">
            <dashboard :config="children.dashboard"></dashboard>
          </transition>
        </template>
        <template v-else-if="active.first === 1 && active.second === 0 && active.third === 0">
          <transition name="slide-fade">
            <test :config="children.test"></test>
          </transition>
        </template>
      </div>
    </div>
    <foot></foot>
  </div>
`;