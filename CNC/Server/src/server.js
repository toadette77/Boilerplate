var express = require('express');
var app     = express();
var cors    = require('cors');
var parser  = require('body-parser');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.get('/api/Status/:id', (req, res) => {
    
    console.log('Received data', req.body);
    res.json({ id: req.params.id, body: req.body });
    res.send('No Task id given');
    
});

/*
app.post('/Tasks/:id', (req, res) => {
    console.log('Received data', req.body);
    res.json({ id: req.params.id, body: req.body });
});
*/