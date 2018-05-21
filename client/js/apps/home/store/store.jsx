import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const Store = new Vuex.Store({
  state: {
    profile: {
      name: "Unknown",
      email: null
    },
    models: {
      profile: null
    },
    loader: {
      state: true
    },
    confirm: {
      state: true,
      action: function(){},
      description: {
        title: "Título de Confirmación",
        text: "Texto de confirmación",
        accept: "Aceptar",
        close: "Cancelar"
      }
    },
    alert: {
      state: true,
      description: {
        title: "Título de Alerta",
        text: "Texto de alerta",
        close: "Aceptar"
      }
    },
    year: new Date().getUTCFullYear()
  },
  mutations: {
    setProfile(state, o){
      for(let u in o)
        state.profile[u] = o[u];
    },
    open: function(state, o){
      if(o.name !== "loader"){
        state[o.name].description.title = o.title;
        state[o.name].description.text = o.text;
        state[o.name].description.close = o.close;
      }
      if(o.name === "confirm")
        state[o.name].description.accept = o.accept;
      state[o.name].state = true;
    },
    close: function(state, o){
      state[o.name].state = false;
    },
    onAccept: function(state, f){
      state.confirm.action = f;
    },
    accept: function(state){
      state.confirm.action();
      state.confirm.state = false;
    }
  },
  getters: {},
  actions: {}
});
