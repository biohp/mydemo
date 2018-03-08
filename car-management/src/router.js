import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/User/Login'
import CarQuery from './views/Car/CarQuery'
import CarAnalysis from './views/Car/CarAnalysis'
import MonitorManage from './views/Monitor/MonitorManage'
import AdminManage from './views/Admin/AdminManage'
import RoleManage from './views/Admin/RoleManage'
import DepartmentManage from './views/Department/DepartmentManage'
import EmployeeManage from './views/Department/EmployeeManage'
import AuthorityManage from './views/Authority/AuthorityManage'
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
	  		component : CarQuery,
	  		props : true,
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
	  		component : AdminManage,
	  		props : true,
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
			  		path: 'departmentManage', 
			  		component: DepartmentManage ,
			  		name : 'departmentManage'
			  	},{ 
			  		path: 'employeeManage', 
			  		component: EmployeeManage ,
			  		name : 'employeeManage'
			  	},{ 
			  		path: 'authorityManage', 
			  		component: AuthorityManage ,
			  		name : 'authorityManage'
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