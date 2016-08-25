
var dataArr  = [
	{name : 1, severity:1, catagroy:1, description:123},
	{name : 2, severity:0, catagroy:0, description:145},
	{name : 3, severity:1, catagroy:1, description:1999}
];

var sorting_status = {};
for(var i in dataArr[0]){
	sorting_status[i] = -1;
}

function construct_Elem(obj){
	var str =
	'<tr class ="table-body">\
		<td data-columns="name">'+obj.name+'</td>\
		<td data-columns="severity">'+obj.severity+'</td>\
		<td data-columns="catagroy">'+obj.catagroy+'</td>\
		<td data-columns="description">'+obj.description+'</td>\
	</tr>';
	return str;
}

function init(dataArr){
	_.each(dataArr, function(data){
		$('.table').append(construct_Elem(data));
	});
}

function sort_by(key, dataArr,isDES){
	var newArr = dataArr.slice(0);
	newArr=_.sortBy(newArr,key);
	if(isDES){
		newArr.reverse();
	}
	return newArr;
}

function sort_refresh(){
	var key=$(this).data('columns'),isDES;

	if(sorting_status[key]>0){
		isDES = true;
	}
	else{
		isDES = false;
	}

	sorting_status[key]=sorting_status[key]*-1;
	var newArr = sort_by(key,dataArr,isDES)
	$('.table-body').each(function(index){
		var current = newArr[index];
		$(this).find('td').each(function(index){
			$(this).text(current[$(this).data('columns')]);
		})
	})
}

function filter_refresh(){

}


$( document ).ready(function() {
	init(dataArr);
	$('.table').find('.header').find('button').each(function(){
		$(this).click(sort_refresh);
	})
});
