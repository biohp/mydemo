import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import CarControl from './components/CarControl.vue'
import SysManager from './components/SysManager.vue'
import DataQuery from './components/DataQuery.vue'

Vue.use(Router) 
export default new Router({
    routes : [
	  	{ 
	  		path: '/', 
	  		component: Login 
	  	},{ 
	  		path: '/home', 
	  		component: Home,
	  		children: [
		        { 
		        	path: '/carControl',
		        	component: CarControl ,
		        	children:[
		        		{ 
					  		path: '/dataQuery', 
					  		component: DataQuery 
					  	},
		        	]
		        },{ 
	  				path: '/sysManager', 
	  				component: SysManager 
	  			},
	        ]
	  	 },
	  
    ]
})