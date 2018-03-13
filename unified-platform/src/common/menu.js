const menuData = [
  {
    name : 'vehicle',
    value : '车辆查控',
    icon : 'model-s',
    children : [
      {
        name : 'car',
        value : '过车数据',
        icon : 'android-car',
        children : [
          {
            name : 'carQuery',
            value : '数据查询',
          },{
            name : 'carAnalysis',
            value : '数据统计',
          }
        ]
      },{
        name : 'monitor',
        value : '卡口管理',
        icon : 'android-pin',
        children : [
          {
            name : 'monitorManage',
            value : '卡口维护',
          }
        ]
      }
    ]
  },
  { 
    name : 'manage',
    value : '系统管理',
    icon : 'gear-a',
    children : [
      {
        name : 'authority',
        value : '用户管理',
        icon : 'android-person',
        children : [
          {
            name : 'userManage',
            value : '用户管理',
          },{
            name : 'roleManage',
            value : '角色管理',
          },{
            name : 'authorityManage',
            value : '权限管理',
          }
        ]
      },{
        name : 'department',
        value : '机构管理',
        icon : 'android-unlock',
        children : [
          {
            name : 'departmentManage',
            value : '机构管理',
          },{
            name : 'employeeManage',
            value : '人员管理',
          }
        ]
      },{
        name : 'dictionary',
        value : '数据字典',
        icon : 'android-list',
        children : [
          {
            name : 'dataDictionary',
            value : '数据字典',
          },{
            name : 'projectParameter',
            value : '系统参数',
          }
        ]
      }
    ]
  }
]

const _breadcrumbList = [
  {value : '车辆查控'},

  {value : '过车数据'},
  {value : '数据查询'},
  {value : '数据统计'},
  {value : '卡口管理'},
  {value : '卡口维护'},

  {value : '系统管理'},
  {value : '用户管理'},
  {value : '用户管理'},
  {value : '角色管理'},
  {value : '权限管理'},
  {value : '机构管理'},
  {value : '机构管理'},
  {value : '人员管理'},
  {value : '数据字典'},
  {value : '数据字典'},
  {value : '系统参数'}
]

const vehicle = [
  'carQuery',
  'carAnalysis',
  'monitorManage'
  ]
const manage = [
  'userManage',
  'roleManage',
  'authorityManage',
  'departmentManage',
  'employeeManage',
  'dataDictionary',
  'projectParameter'
]

function formatter(payload) {
  let submenuList = [] 
  let showSign = String
  if(vehicle.includes(payload)){
    submenuList.push(menuData[0])
    showSign = 'vehicle'
  }else if(manage.includes(payload)){
    submenuList.push(menuData[1])
    showSign = 'manage'
  }
  return { menuData , submenuList ,showSign }
}

function formatterBreadcrumb(payload) { 
  let breadcrumbList = []
  switch (payload){
    case 'carQuery':
      breadcrumbList.push(_breadcrumbList[0],_breadcrumbList[1],_breadcrumbList[2])
      break;
    case 'carAnalysis':
      breadcrumbList.push(_breadcrumbList[0],_breadcrumbList[1],_breadcrumbList[3])
      break;
    case 'monitorManage':
      breadcrumbList.push(_breadcrumbList[0],_breadcrumbList[4],_breadcrumbList[5])
      break;
    case 'userManage':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[7],_breadcrumbList[8])
      break;
    case 'roleManage':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[7],_breadcrumbList[9])
      break;
    case 'authorityManage':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[7],_breadcrumbList[10])
      break;
    case 'departmentManage':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[11],_breadcrumbList[12])
      break;
    case 'employeeManage':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[11],_breadcrumbList[13])
      break;
    case 'dataDictionary':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[14],_breadcrumbList[15])
      break;
    case 'projectParameter':
      breadcrumbList.push(_breadcrumbList[6],_breadcrumbList[14],_breadcrumbList[16])
      break;
  }
  return { breadcrumbList }
}

export {
  vehicle ,
  manage
}
export default {
  getMenuList(payload){
    return formatter(payload)
  },
  getBreadcrumbList(payload){
    return formatterBreadcrumb(payload)
  }
}