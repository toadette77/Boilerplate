var initializeStatus = function() {
	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('table#status-overview tbody');

	xhr.open('GET', 'http://localhost:3000/api/Status');
	xhr.responseType = 'json';

	xhr.onload = function() {
		var data = xhr.response;
		if (data instanceof Array) {
			var code = '';
			for (var d = 0, dl = data.length; d < dl; d++) {
				var entry = data[d];
				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '<td>  <button type="button" id='+ entry.id +' onclick="action(this.id)" onclick="toggleButton(this.id)" >';
				if(entry.workload===1){
				code += 'Start';
				}else{
				code += 'Stop';
				}
				code += '</button> </td>';
				code += '</tr>';
			}
			content.innerHTML = code;
		} else {
			content.innerHTML = 'Failed to load :(';
		}
	};

	xhr.send(null);
}; 

var getTasks = function(){
	var xhr		= new XMLHttpRequest();
	var content = document.querySelector('table#tasks-overview tbody');

	xhr.open('GET','http://localhost:3000/api/Tasks');
	xhr.responseType='json';
	
	xhr.onload = function() {
		var data = xhr.response;
		if(data instanceof Array){
			var table = '';
			for(var i = 0, il = data.length; i < il; i++) {
				if((data[i])!=null){
					table += '<tr>';
					table += '<td>' + data[i].id + '</td>';
					table += '<td>' + data[i].type + '</td>';
					table += '<td>' + data[i].data.input + '</td>';
					table += '<td>' + data[i].data.output + '</td>';
					table += '</tr>';
				}
			}
			content.innerHTML = table;
		} else {
			content.innerHTML = 'Failed to load :(';
		}
	};
	xhr.send(null);
};