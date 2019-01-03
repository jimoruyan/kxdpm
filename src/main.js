// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'

axios.defaults.baseURL = 'https://wd8910585934yneopr.wilddogio.com'
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes:Routes,
  // mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router
})
