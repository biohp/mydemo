import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Option1 from './components/Option1.vue'
import Option2 from './components/Option2.vue'

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
		        	path: '/o1',
		        	component: Option1 
		        },{ 
	  				path: '/o2', 
	  				component: Option2 
	  			},
	        ]
	  	 },
	  
    ]
})