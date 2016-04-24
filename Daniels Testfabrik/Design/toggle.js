function toggleButton(TID){
	if (document.getElementById(TID).innerHTML == "Start"){
		(document.getElementById(TID).innerHTML = "Stop");
	}else{
		(document.getElementById(TID).innerHTML = "Start");
	}
};
