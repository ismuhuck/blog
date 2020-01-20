import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    type:'all',
    searchtext:''
  },
  mutations: {
    changesearch(state,newsearch){
      state.searchtext = newsearch
    },
    changetype(state,newtype){
      state.type = newtype
      // console.log(newtype)
    }
  },
  actions: {
    // changeLogin(ctx, Authorization) {
    //   ctx.commit('changeLogin', Authorization);
    // }
  },
  getters:{
    type:(state) => state.type,
    searchtext:(state) => state.searchtext
  },
  modules: {}
});
export default store
