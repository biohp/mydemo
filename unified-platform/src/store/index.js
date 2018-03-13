import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu.js'
import authority from './modules/authority.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu,
    authority
  },
})