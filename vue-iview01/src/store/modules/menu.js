import router from '../../router.js'
import { CHANGE_BREADCRUMB_ITEM , CHANGE_HOME_INFO} from '../types.js'
import menu from '../../common/menu.js'

const state = {
  subMenuItem : [],
  breadcrumbItem : [],
}

// getters
const getters = {
  subMenuItem: state => state.subMenuItem,
  breadcrumbItem: state => state.breadcrumbItem,
}

// actions
const actions = {
  carControl(context){
    console.log(menu.clkHeaderNav(1).activeName);
    context.commit('CHANGE_HOME_INFO' , menu.clkHeaderNav(1));
  },
  sysManager(context){
    console.log(menu.clkHeaderNav(2).activeName);

    context.commit('CHANGE_HOME_INFO' , menu.clkHeaderNav(2));
  },
  refreshHome(context){
    console.log(menu.refreshHome());
  	context.commit('CHANGE_HOME_INFO' , menu.refreshHome());
  },
  homeSiderMenu (context,payload) {
  	const data=menu.getBreadcrumbItem(payload);
  	router.push({ path: data.routerPath });
    console.log(data);
  	context.commit('CHANGE_BREADCRUMB_ITEM',data.breadcrumbItem);
  },
}

// mutations
const mutations = {
  [CHANGE_HOME_INFO] (state,data) {
    state.subMenuItem = data.subMenuItem;
  	state.breadcrumbItem = data.breadcrumbItem;
    
  },
  [CHANGE_BREADCRUMB_ITEM] (state,data) {
    state.breadcrumbItem = data;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}