import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./Home.vue";
const Dashboard = resolve => {
  require.ensure(["./dashboard/Dashboard.vue"], () => {
    resolve(require("./dashboard/Dashboard.vue"));
  });
};
const Test = resolve => {
  require.ensure(["./test/Test.vue"], () => {
    resolve(require("./test/Test.vue"));
  });
};

Vue.use(VueRouter);
new Vue({
  el: '#home',
  router: new VueRouter({
    routes: [
      {
        title: "Inicio",
        path: "/",
        component: Dashboard
      },
      {
        title: "Test",
        path: "/test",
        component: Test
      }
    ]
  }),
  render: h => h(Home)
});