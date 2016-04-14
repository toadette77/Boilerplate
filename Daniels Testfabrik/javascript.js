
var xhr=new XMLHttpRequest();
xhr.open('GET','http://botnet...');

xhr.responseType='json';

xhr.onload=funktion(){
  var data = xhr.response;
  console.log(data);

};
