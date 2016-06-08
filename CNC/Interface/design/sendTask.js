var sendTask = function(type, data) {
  var xhr = new XMLHttpRequest();


  xhr.open('POST', 'http://localhost:3000/api/Tasks');

  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Token', 'b0e25ecf7c24112fecaac351ebc1d223');

  var json;
  xhr.onload = function() {
    console.log("Answer", xhr.response);
    console.log(type+" "+data);
  };
	json = { 
	"type": type , 
	"data": {'input':data,
			'output':null }
	};
  xhr.send(JSON.stringify(json));
};

