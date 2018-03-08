const menuData = [
  {
    name : 'carControl',
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
    name : 'systemManage',
    value : '系统管理',
    icon : 'gear-a',
    children : [
      {
        name : 'admin',
        value : '用户管理',
        icon : 'android-person',
        children : [
          {
            name : 'adminManage',
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

function getBreadcrumbList(one,two,three) {
  let breadcrumbList = []
  const itemOne={
    name: menuData[one].name,
    value: menuData[one].value
  }
  const itemTwo={
    name: menuData[one].children[two].value,
    value: menuData[one].children[two].value
  }
  const itemThree={
    name: menuData[one].children[two].children[three].value,
    value: menuData[one].children[two].children[three].value
  }
  breadcrumbList.push(itemOne,itemTwo,itemThree)
  return breadcrumbList
}

function interpret(payload) {
  let route = Number
  let breadcrumbList =[]
  switch (payload){
    case 'carQuery' :
      route = 1 
      breadcrumbList=getBreadcrumbList(0,0,0)
      break;
    case 'carAnalysis' :
      route = 1
      breadcrumbList=getBreadcrumbList(0,0,1)
      break;
    case 'monitorManage' :
      route = 1
      breadcrumbList=getBreadcrumbList(0,1,0)
      break;
    case 'adminManage' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,0,0)
      break;
    case 'roleManage' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,0,1)
      break;
    case 'authorityManage' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,0,2)
      break;
    case 'departmentManage' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,1,0)
      break;
    case 'employeeManage' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,1,1)
      break;
    case 'dataDictionary' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,2,0)
      break;
    case 'projectParameter' :
      route = 2
      breadcrumbList=getBreadcrumbList(1,2,1)
      break;
  }
  return { route , breadcrumbList }
}

function formatter(payload) {
  let route = breadcrumbListroute
  let showSign = Boolean
  let menuItems = [] 
  let breadcrumbList = interpret(payload).breadcrumbList 
  if (route===1){
    showSign=true
    menuItems.push(menuData[0])
  } else if (route===2){
    showSign=false
    menuItems.push(menuData[1])
  }
  return { showSign , submenuList , breadcrumbList }
}

export default {
  getMenuData(payload){
    return formatter(payload)
  }
}