import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
export const store = new Vuex.Store({
  // strict:true,
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    count:2,
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    increase(state, n = 1) {
      state.count += n;
  },
  }
});