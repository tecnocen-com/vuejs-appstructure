import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./Home.vue";
import Dashboard from "./dashboard/Dashboard.vue";
import Test from "./test/Test.vue";

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