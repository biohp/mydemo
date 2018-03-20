export function initTree(arr, val) {
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
	                } else if (item.hasOwnProperty('selected')) {
	                    item.selected = false;
	                }
	                return item;
	            });
	        }
	        if (item.title === val) {
	            item = { ...item, selected: true };
	        } else if (item.hasOwnProperty('selected')) {
	            item.selected = false;
	        }
	        return item;
	    });
    }
    return arr;
}