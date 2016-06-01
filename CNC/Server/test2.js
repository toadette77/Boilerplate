var express = require('express');
var app     = express();
var parser  = require('body-parser');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Other middlewares and routes

app.post('/Tasks/:id', (req, res) => {
    console.log('Received data', req.body);
    res.json({ message: 'UPDATE Task ' + req.params.id });
});

app.listen(3000);