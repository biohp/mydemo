let arrNumber = ['0','1','2','3','4','5','6','7','8','9']
let arrLetter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

function judge(payload){
	let arr = payload.split("");
	let passwordPercent = Number ;
	let passwordStatus = String;
	if(arr.length>=6&&arr.length<10){
		passwordPercent = 33;
		passwordStatus = 'wrong';
		for (let i = 0; i < arr.length; i++) {
			if(arrLetter.includes(arr[i])){
				passwordPercent = 66;
				passwordStatus = 'active';
			}
		}
	}else if (arr.length>=10){
		passwordPercent = 66;
		passwordStatus = 'active';
		for (let i = 0; i < arr.length; i++) {
			if(arrLetter.includes(arr[i])){
				passwordPercent = 100;
				passwordStatus = 'success';
			}
		}
	}else {
		passwordPercent = 0;
		passwordStatus = 'wrong';
	}
	return { passwordPercent , passwordStatus }
}

export default {
  getPercentStatus(payload){
    return judge(payload);
  }
}