import router from '../../router.js'
import { INIT_MENU } from '../types.js'
import menu from '../../common/menu.js'

const state = {
  submenuList : [],
}

// getters
const getters = {
  submenuList: state => state.submenuList,
}

// actions
const actions = {
  initMenu(context,payload){
    context.commit('INIT_MENU' , menu.getMenuData(payload))
  }
}

// mutations
const mutations = {
  [INIT_MENU] (state,data) {
    state.submenuList = data.submenuList[0].children
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}