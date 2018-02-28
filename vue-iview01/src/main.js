import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from './router.js'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(iView)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
