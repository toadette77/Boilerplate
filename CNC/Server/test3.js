var express = require('express');
var app     = express();
var cors    = require('cors');
var parser  = require('body-parser');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.get('/api/Tasks', (req, res) => {
    res.send('No Task id given');
});

app.post('/Tasks/:id', (req, res) => {
    console.log('Received data', req.body);
    res.json({ id: req.params.id , body: req.body });
});


app.get('/test', (req, res) => {
    res.json({ message: 'This is CORS enabled.' });
});

app.use(function(err,req,res,next) {
    res.json({message:'NOPE'});
});


app.listen(3000);