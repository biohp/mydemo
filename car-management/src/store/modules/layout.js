import router from '../../router.js'
import { CHANGE_MENU } from '../types.js'
import menu from '../../common/menu.js'

const state = {
  showSign : true ,
  menuItems : [],
  breadcrumbItem : [],
}

// getters
const getters = {
  showSign: state => state.showSign,
  menuItems: state => state.menuItems,
  breadcrumbItem: state => state.breadcrumbItem,
}

// actions
const actions = {
  onCurrentRoute(context,payload){
    context.commit('CHANGE_MENU' , menu.getMenuData(payload));
  },
  onSiderMenu(context,payload){
    console.log(payload);
    router.push({ path: '/'+ payload });
  },
}

// mutations
const mutations = {
  [CHANGE_MENU] (state,data) {
    state.showSign = data.showSign;
    state.menuItems = data.menuItems[0].children;
    state.breadcrumbItem = data.breadcrumbItem;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}