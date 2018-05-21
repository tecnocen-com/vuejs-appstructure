import Vue from "vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';
import { Store } from "./store/store.jsx";
import Index from "./Index.vue";

Vue.use(BootstrapVue);
new Vue({
  el: '#index',
  store: Store,
  render: h => h(Index)
});
