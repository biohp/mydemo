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
	  		path: '/', 
	  		component: Login ,
	  	},{ 
	  		path: '/carQuery', 
	  		component: CarQuery ,
	  	},{ 
	  		path: '/carAnalysis', 
	  		component: CarAnalysis ,
	  	},{ 
	  		path: '/monitorManage', 
	  		component: MonitorManage ,
	  	},{ 
	  		path: '/adminManage', 
	  		component: AdminManage ,
	  	},{ 
	  		path: '/roleManage', 
	  		component: RoleManage ,
	  	},{ 
	  		path: '/departmentManage', 
	  		component: DepartmentManage ,
	  	},{ 
	  		path: '/employeeManage', 
	  		component: EmployeeManage ,
	  	},{ 
	  		path: '/authorityManage', 
	  		component: AuthorityManage ,
	  	},{ 
	  		path: '/dataDictionary', 
	  		component: DataDictionary ,
	  	},{ 
	  		path: '/projectParameter', 
	  		component: ProjectParameter ,
	  	}
    ]
})