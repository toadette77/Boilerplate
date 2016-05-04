function action(TID){
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');

	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.setRequestHeader('Token', 'b0e25ecf7c24112fecaac351ebc1d223');
	
	
	xhr.onload=function(){
		console.log("Answer", xhr.response);
	};
	
	var sendAction;
		if (document.getElementById(TID).innerHTML == "Start"){
			sendAction={"id": parseInt(TID,10) , "status": false
			};
			(document.getElementById(TID).innerHTML = "Stop");
		}else{
		sendAction={"id": parseInt(TID,10) , "status": true
		};
		(document.getElementById(TID).innerHTML = "Start");
		}
		xhr.send(JSON.stringify(sendAction));
	
};
