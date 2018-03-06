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

function formatter(payload) {
  let route = payload.route;
  let showSign = Boolean;
  let menuItems = [] ;
  let breadcrumbItem = [];
  if (route<50){
    showSign=true;
    menuItems.push(menuData[0]);
    switch (route) {
      case 1 :
      breadcrumbItem.push(
        menuData[0].value,
        menuData[0].children[0].value,
        menuData[0].children[0].children[0].value
        );
      break;
      case 2 :
      breadcrumbItem.push(
        menuData[0].value,
        menuData[0].children[0].value,
        menuData[0].children[0].children[1].value
        );
      break;
      case 3 :
      breadcrumbItem.push(
        menuData[0].value,
        menuData[0].children[1].value,
        menuData[0].children[1].children[0].value
        );
      break;
    }
  } else if (route>50){
    showSign=false;
    menuItems.push(menuData[1]);
    switch (route) {
      case 51 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[0].value,
        menuData[1].children[0].children[0].value
        );
      break;
      case 52 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[0].value,
        menuData[1].children[0].children[1].value
        );
      break;
      case 53 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[0].value,
        menuData[1].children[0].children[2].value
        );
      break;
      case 54 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[1].value,
        menuData[1].children[1].children[0].value
        );
      break;
      case 55 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[1].value,
        menuData[1].children[1].children[1].value
        );
      break;
      case 56 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[2].value,
        menuData[1].children[2].children[0].value
        );
      break;
      case 57 :
      breadcrumbItem.push(
        menuData[1].value,
        menuData[1].children[2].value,
        menuData[1].children[2].children[1].value
        );
      break;
      
    }
  }
  return { showSign , menuItems , breadcrumbItem };
}

export default {
  getMenuData(payload){
    return formatter(payload);
  }
}