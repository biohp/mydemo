import router from '../../router.js'
import { INIT_MENU } from '../types.js'
import menu from '../../common/menu.js'

const state = {
  headerNavList : [],
  showSign : Number,
  submenuList : [],
  breadcrumbList :[]
}

// getters
const getters = {
  headerNavList: state => state.headerNavList,
  showSign: state => state.showSign,
  submenuList: state => state.submenuList,
  breadcrumbList: state => state.breadcrumbList
}

// actions
const actions = {
  initMenu(context,payload){
    let name = payload.name
    let menuList = menu.getMenuList(payload.name)
    let breadcrumbList = menu.getBreadcrumbList(payload.name)
    context.commit('INIT_MENU' , { menuList , breadcrumbList  })
  }
}

// mutations
const mutations = {
  [INIT_MENU] (state,data) {
    state.headerNavList = data.menuList.menuData,
    state.showSign = data.menuList.showSign,
    state.submenuList = data.menuList.submenuList[0].children,
    state.breadcrumbList = data.breadcrumbList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}