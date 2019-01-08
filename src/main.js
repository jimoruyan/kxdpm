// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'
import {store} from './store/index';
import vuex from "vuex"




axios.defaults.baseURL = 'https://wd8508069713buenzz.wilddogio.com/'
Vue.use(VueRouter)
Vue.use(vuex)

Vue.config.productionTip = false

const router = new VueRouter({
  routes:Routes,
})
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router,
  store:store,
})
