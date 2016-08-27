
// sample data
var dataModel = function(name,severity,catagroy,description){
	this.name = name;
	this.severity = severity;
	this.catagroy = catagroy;
	this.description = description;
}
var dataArr  = [

];
for(var i=0;i<50;i++){
	dataArr.push(new dataModel(_.random(0,100),_.random(0,2),_.random(0,2),_.random(0,1000)));
}



// main
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
	$('.table').find('.header').find('button').each(function(){
		$(this).click(sort_refresh);
	})
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
		$(this).find('i').addClass('fa-rotate-180')
	}
	else{
		isDES = false;
		$(this).find('i').removeClass('fa-rotate-180')
	}

	sorting_status[key]=sorting_status[key]*-1;

	var newArr = sort_by(key,dataArr,isDES);

	$('.table-body').each(function(index){
		var current = newArr[index];
		$(this).find('td').each(function(index){
			$(this).text(current[$(this).data('columns')]);
		})
	})
	add_to_filter();

}

function filter_contain(filters){
	$('.table-body').each(function(index){
		var ifShow = true;
		for(var i in filters){
			if(!$(this).find('[data-columns='+i+']').text().includes(filters[i])){
				ifShow = false;
			}
		}
		if(ifShow)
			$(this).css('display','table-row');
		else
			$(this).css('display','none')
	})
}

function add_to_filter(){
	var filters= {};
	$('.filter').each(function(){
		filters[$(this).data('columns')] = $(this).val()||'';
	});
	for(var i in filters){
		filter_contain(filters);
	}
}


var timer;


$( document ).ready(function() {
	init(dataArr);
	$('input.filter').each(function(){
		$(this).keyup(function(){
			if(timer){
				clearTimeout(timer);
			}
			self = this;
			timer = setTimeout(add_to_filter,1000);
		})
	})

	$('select.filter').each(function(){
		$(this).change(function(){
			if(timer){
				clearTimeout(timer);
			}
			self = this;
			timer = setTimeout(add_to_filter,1000);
		})
	})

	// filter_contain('','description')
});
