import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/User/Login'
import BasicLayout from './layouts/BasicLayout'
import CarQuery from './views/Car/CarQuery'
import CarAnalysis from './views/Car/CarAnalysis'
import MonitorManage from './views/Monitor/MonitorManage'
import AdminManage from './views/Authority/AdminManage'
import RoleManage from './views/Authority/RoleManage'
import AuthorityManage from './views/Authority/AuthorityManage'
import DepartmentManage from './views/Department/DepartmentManage'
import EmployeeManage from './views/Department/EmployeeManage'
import DataDictionary from './views/Dictionary/DataDictionary'
import ProjectParameter from './views/Dictionary/ProjectParameter'

Vue.use(Router) 
export default new Router({
    routes : [
	  	{ 
	  		path: '/login', 
	  		component: Login ,
	  		alias: '/'
	  	},{
	  		path : '/vehicle/:open',
	  		component : BasicLayout,
	  		children : [
	  			{
	  				path : 'carQuery',
	  				component : CarQuery,
	  				name : 'carQuery'
	  			},{ 
			  		path: 'carAnalysis', 
			  		component: CarAnalysis ,
			  		name : 'carAnalysis'
			  	},{ 
			  		path: 'monitorManage', 
			  		component: MonitorManage ,
			  		name : 'monitorManage'
			  	}
	  		]
	  	},{
	  		path : '/manage/:open',
	  		component : BasicLayout,
	  		children : [
	  			{ 
			  		path: 'adminManage', 
			  		component: AdminManage ,
			  		name : 'adminManage'
			  	},{ 
			  		path: 'roleManage', 
			  		component: RoleManage ,
			  		name : 'roleManage'
			  	},{ 
			  		path: 'authorityManage', 
			  		component: AuthorityManage ,
			  		name : 'authorityManage'
			  	},{ 
			  		path: 'departmentManage', 
			  		component: DepartmentManage ,
			  		name : 'departmentManage'
			  	},{ 
			  		path: 'employeeManage', 
			  		component: EmployeeManage ,
			  		name : 'employeeManage'
			  	},{ 
			  		path: 'dataDictionary', 
			  		component: DataDictionary ,
			  		name : 'dataDictionary'
			  	},{ 
			  		path: 'projectParameter', 
			  		component: ProjectParameter ,
			  		name : 'projectParameter'
			  	}
	  		]
	  	}
    ]
})