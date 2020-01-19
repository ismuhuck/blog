import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    type:'all'
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
  getters:{
    type:(state) => state.type
  },
  modules: {}
});
export default store
