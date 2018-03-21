export function deptTree(arr, val) {
	arr = arr.map( item => {
        if (item.hasOwnProperty('children')) {
            item.children = item.children.map( item => {
				if (item.hasOwnProperty('selected')) {
                    item.selected = false;
                }
                return item;
            });
        }
		if (item.hasOwnProperty('selected')) {
            item.selected = false;
        }
        return item;
    });
    if (val !== '选择机构') {
    	arr = arr.map( item => {
	        if (item.hasOwnProperty('children')) {
	            item.children = item.children.map( item => {
	                if(item.title === val){
	                    item = { ...item, selected: true };
	                } 
	                return item;
	            });
	        }
	        if (item.title === val) {
	            item = { ...item, selected: true };
	        } 
	        return item;
	    });
    }
    return arr;
}

export function authorityTree(arr, check) {
	arr = arr.map( item => {
        if (item.hasOwnProperty('children')) {
            item.children = item.children.map( item => {
				if (item.hasOwnProperty('checked')) {
                    item.checked = false;
                }
                return item;
            });
        }
		if (item.hasOwnProperty('indeterminate')) {
            item.indeterminate = false;
        }
        return item;
    });
    //有待优化
    if (check.length !== 0) {
    	arr = arr.map( item => {
	        if (item.hasOwnProperty('children')) {
	            item.children = item.children.map( item => {
	            	if (check.length !== 0) {
	            		for (let i = 0; i < check.length; i++) {
		            		if(item.value === check[i]){
			                    item = { ...item, checked: true };
			                }
		            	}
	            	}
	                return item;
	            });
	        }
	        return item;
	    });
    }
    return arr;
}