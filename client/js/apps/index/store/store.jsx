import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export const Store = new Vuex.Store({
  state: {
    username: "",
    password: "",

    loading: false,
    error: 0,
    alertMessage: ""
  },
  mutations: {
    update: function(state, o){
      for(var i in o)
        state[i] = o[i];
    },
    login: function(state){
      var validator = state.username === "" ? 0 :
        state.password === "" ? 1 : 2;
      switch(validator){
        case 0:
          state.error = 0;
          state.alertMessage = "Error, se requiere un nombre de usuario.";
          setTimeout(() => { state.alertMessage = ""; }, 1500);
          break;
        case 1:
          state.error = 1;
          state.alertMessage = "Error, se requiere una contraseña.";
          setTimeout(() => { state.alertMessage = ""; }, 1500);
          break;
        default:
          state.loading = true;
          axios.post("/login", {
            user: state.username,
            pass: state.password
          }).then(response => {
            if(response.status === 200 && response.data.status !== 401)
              window.location = "/";
            else{
              state.error = 2;
              state.alertMessage = "Error, nombre de usuario y/o contraseña inválidos.";
              state.loading = false;
              setTimeout(() => { state.alertMessage = ""; }, 1500);
            }
          });
          break;
      }
    }
  },
  getters: {},
  actions: {}
});
