var express = require('express');
var app     = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/Tasks', (req, res) => {
    res.send('No Task id given');
});

app.get('/api/Tasks/:id', (req, res) => {
    res.send("Task id was " + req.params.id);
});

app.listen(3000, () => {
    console.log('Example listening on http://localhost:3000');
});