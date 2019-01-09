// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'
import { store } from './store/index';
import vuex from "vuex"
import baseURL from './axios-auth.js'

Vue.use(VueRouter)
Vue.use(vuex)

axios.defaults.baseURL = baseURL.baseURL;

//请求头加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers['Api-Token'] = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

Vue.prototype.axios = axios

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/index' || to.path === '/signin' || to.path === '/sign') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '' || token === null) {
      next('/login');
    } else {
      next();
    }
  }
})

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router: router,
  store: store,
})