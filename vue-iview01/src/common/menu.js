const _menuItems = [
  { id : 1 , name :'clck' , value : '车辆查控' , path : '' },
  { id : 2 , name :'xtgl' , value : '系统管理' , path : '' },
  { id : 3 , name :'gcsj' , value : '过车数据' , path : '' },
  { id : 4 , name :'sjcx' , value : '数据查询' , path : '/dataQuery' },
  { id : 5 , name :'sjtj' , value : '数据统计' , path : '' },
  { id : 6 , name :'kkxx' , value : '卡口信息' , path : '/bayonetInfo' },
  { id : 7 , name :'yhgl' , value : '用户管理' , path : '' },
  { id : 8 , name :'yhxx' , value : '用户信息' , path : '' },
  { id : 9 , name :'qxgl' , value : '权限管理' , path : '' },
  { id : 10 , name :'jsgl' , value : '角色管理' , path : '' },
  { id : 11 , name :'qxfp' , value : '权限分配' , path : '' },
  { id : 12 , name :'cssz' , value : '参数配置' , path : '' },
  { id : 13 , name :'sjzd' , value : '数据字典' , path : '' },
  { id : 14 , name :'csdy' , value : '参数定义' , path : '' },
]

const _iconItems = [
  'android-car',
  'android-person',
  'android-unlock',
  'android-list'
]

const _carControl = [{
    name : _menuItems[2].name ,
    value : _menuItems[2].value ,
    icon : _iconItems[0] ,
    children : [
      {
        name : _menuItems[3].name ,
        value : _menuItems[3].value ,
      },{
        name : _menuItems[4].name ,
        value : _menuItems[4].value ,
      },{
        name : _menuItems[5].name ,
        value : _menuItems[5].value ,
      }
    ]
}];

const _sysManager = [
    {
      name : _menuItems[6].name ,
      value : _menuItems[6].value ,
      icon : _iconItems[1] ,
      children : [
        {
          name : _menuItems[7].name ,
          value : _menuItems[7].value ,
        }
      ]
    },{
      name : _menuItems[8].name ,
      value : _menuItems[8].value ,
      icon : _iconItems[2] ,
      children : [
        {
          name : _menuItems[9].name ,
          value : _menuItems[9].value ,
        },{
          name : _menuItems[10].name ,
          value : _menuItems[10].value ,
        }
      ]
    },{
      name : _menuItems[11].name ,
      value : _menuItems[11].value ,
      icon : _iconItems[3] ,
      children : [
        {
          name : _menuItems[12].name ,
          value : _menuItems[12].value ,
        },{
          name : _menuItems[13].name ,
          value : _menuItems[13].value ,
        }
      ]
    }
]

function formatter(data) {
  return ;
}

export default {
  clkHeaderNav(payload){
    let showSign = true ;
    const openNames = [] ;
    let activeName = String ;
    let subMenuItem = [];
    const breadcrumbItem = [];
    if(payload===1){
      showSign = true;
      openNames.push(_menuItems[2].name) ;
      activeName = _menuItems[3].name ;
      subMenuItem = _carControl ;
      breadcrumbItem.push(_menuItems[0] , _menuItems[2] , _menuItems[3]) ;
      return { showSign , openNames , activeName , subMenuItem , breadcrumbItem } ;
    } else if (payload===2){
      showSign = false;
      openNames.push(_menuItems[8].name) ;
      activeName = _menuItems[7].name ;
      subMenuItem = _sysManager ;
      breadcrumbItem.push(_menuItems[1] , _menuItems[6] , _menuItems[7]) ;
      return { showSign , openNames , activeName , subMenuItem , breadcrumbItem } ;
    }
  },
  refreshHome(){
    const showSign = true;
    const openNames = [] ;
    openNames.push(_menuItems[2].name) ;
    let activeName = _menuItems[3].name ;
    let subMenuItem = [];
    subMenuItem = _carControl ;
    const breadcrumbItem = [];
    breadcrumbItem.push(_menuItems[0] , _menuItems[2] , _menuItems[3]);
    return { showSign , openNames , activeName , subMenuItem , breadcrumbItem };
  },
  getBreadcrumbItem (name) {
    const breadcrumbItem=[];
    let routerPath=String;
    switch (name){
        case "sjcx":
          routerPath=_menuItems[3].path;
          breadcrumbItem.push(_menuItems[0] , _menuItems[2] , _menuItems[3]);
          return {routerPath , breadcrumbItem};
        case "sjtj":
          routerPath=_menuItems[3].path;
          breadcrumbItem.push(_menuItems[0] , _menuItems[2] , _menuItems[4]);
          return {routerPath , breadcrumbItem};
        case "kkxx":
          routerPath=_menuItems[5].path;
          breadcrumbItem.push(_menuItems[0] , _menuItems[2] , _menuItems[5]);
          return {routerPath , breadcrumbItem};
        case "yhxx":
          routerPath=_menuItems[5].path;
          breadcrumbItem.push(_menuItems[1] , _menuItems[6] , _menuItems[7]);
          return {routerPath , breadcrumbItem};
        case "jsgl":
          routerPath=_menuItems[5].path;
          breadcrumbItem.push(_menuItems[1] , _menuItems[8] , _menuItems[9]);
          return {routerPath , breadcrumbItem};
        case "qxfp":
          routerPath=_menuItems[5].path;
          breadcrumbItem.push(_menuItems[1] , _menuItems[8] , _menuItems[10]);
          return {routerPath , breadcrumbItem};
        case "sjzd":
          routerPath=_menuItems[5].path;
          breadcrumbItem.push(_menuItems[1] , _menuItems[11] , _menuItems[12]);
          return {routerPath , breadcrumbItem};
        case "csdy":
          routerPath=_menuItems[5].path;
          breadcrumbItem.push(_menuItems[1] , _menuItems[11] , _menuItems[13]);
          return {routerPath , breadcrumbItem};
    }

   },

}