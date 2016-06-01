const fs = require('fs');

fs.writeFile('message.txt', 'Zeug test test test 1234', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

fs.readFile('message.txt','utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});