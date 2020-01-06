import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Authorization: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : ''
  },
  mutations: {
    // changeLogin(state, user) {
    //   state.Authorization = user.Authorization;
    //   console.log('运行至此store');
    //   localStorage.setItem('Authorization', user.Authorization);
    // }
  },
  actions: {
    // changeLogin(ctx, Authorization) {
    //   ctx.commit('changeLogin', Authorization);
    // }
  },
  modules: {}
});
