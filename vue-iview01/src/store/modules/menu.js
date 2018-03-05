import router from '../../router.js'
import { CHANGE_BREADCRUMB_ITEM , CHANGE_HOME_INFO} from '../types.js'
import menudata from '../../api/menudata.js'

const state = {
  showSign : true ,
  openNames : ['gcsj'],
  activeName :'',
  subMenuItem : [],
  breadcrumbItem : [],
}

// getters
const getters = {
  showSign: state => state.showSign,
  openNames: state => state.openNames,
  activeName: state => state.activeName,
  subMenuItem: state => state.subMenuItem,
  breadcrumbItem: state => state.breadcrumbItem,
}

// actions
const actions = {
  carControl(context){
    console.log(menudata.clkHeaderNav(1).activeName);
    context.commit('CHANGE_HOME_INFO' , menudata.clkHeaderNav(1));
  },
  sysManager(context){
    console.log(menudata.clkHeaderNav(2).activeName);

    context.commit('CHANGE_HOME_INFO' , menudata.clkHeaderNav(2));
  },
  refreshHome(context){
    console.log(menudata.refreshHome());
  	context.commit('CHANGE_HOME_INFO' , menudata.refreshHome());
  },
  homeSiderMenu (context,payload) {
  	const data=menudata.getBreadcrumbItem(payload);
  	router.push({ path: data.routerPath });
    console.log(data);
  	context.commit('CHANGE_BREADCRUMB_ITEM',data.breadcrumbItem);
  },
}

// mutations
const mutations = {
  [CHANGE_HOME_INFO] (state,data) {
    state.showSign = data.showSign;
  	state.openNames = data.openNames;
    state.activeName = data.activeName;
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