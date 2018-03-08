import {vehicle ,manage} from '../common/menu.js'

function formatter(payload) {
  let path = '' 
  if(vehicle.includes(payload)){
    path = '/vehicle'
    if([vehicle[0],vehicle[1]].includes(payload)){
      path = path + '/car/' +payload
    } else if ([vehicle[2]].includes(payload)){
      path = path + '/monitor/' +payload
    }
  }else if(manage.includes(payload)){
    path = '/manage'
    if([manage[0],manage[1],manage[2]].includes(payload)){
      path = path + '/authority/' +payload
    } else if ([manage[3],manage[4]].includes(payload)){
      path = path + '/department/' +payload
    } else if ([manage[5],manage[6]].includes(payload)){
      path = path + '/dictionary/' +payload
    }
  }
  return { path }
}

export default {
  getPath(payload){
    return formatter(payload)
  }
}