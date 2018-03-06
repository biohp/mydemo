import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/User/Login.vue'
import Home from './views/Home.vue'
import DataQuery from './components/CarControl/DataQuery.vue'
import BayonetInfo from './components/CarControl/BayonetInfo.vue'

Vue.use(Router) 
export default new Router({
    routes : [
	  	{ 
	  		path: '/', 
	  		name: 'login',
	  		component: Login ,
	  	},{ 
	  		path: '/home',
	  		name: 'home' ,
	  		component: Home,
	  		children: [
        		{ 
			  		path: '/dataQuery',
			  		name: 'dataQuery' ,
			  		component: DataQuery ,
			  	},
			  	{ 
			  		path: '/bayonetInfo', 
			  		name: 'bayonetInfo',
			  		component: BayonetInfo ,
			  	},
        	]     
	  	 },
	  
    ]
})