//Wichtig damit alles geht
var parser = require('body-parser');
var express = require('express');
var cors = require('cors');
var fs = require('fs');
var app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

//Array mit validen Tokens
var valideTokens = ['LOLTOKENWOWSucHP0W3R', 'ABCTEST1234TOKEN', 'y1sc4p50n', 'b0e25ecf7c24112fecaac351ebc1d223'];
//Array mit allen Bots
var leBots = [];
//Array mit allen Tasks 
var dieTasks = [];

//Sende alle Verfuegbaren Bots
app.get('/api/Status', (req, res) => {
    if (leBots) {
        res.send(JSON.stringify(leBots));
        console.log("Success!")
    }
});

//GET - STATUS
app.get('/api/Status/:id', (req, res) => {
    var theAnswerObj = leBots.find(function (d) {
        return d.id == parseInt(req.params.id);
    });

    if (theAnswerObj != undefined) {
        res.send(JSON.stringify(theAnswerObj));
    } else {
        res.send(JSON.stringify("Fehler: Bot : "
            + parseInt(req.params.id) + " nicht vorhanden!"));
    }

});

//Post Workload Bots Array.indexOf prüft den Token
app.post('/api/Status', (req, res) => {
    var user = req.get('Token');
	/*var valide =false;
	
        for(i=0;i<valideTokens.length;i++){
            if(user===valideTokens[i]){
                valide=true;
                i=valideTokens.length;
            }
        }
	*/
    if (valideTokens.indexOf(user) != -1) {
        if (req.body.status == false) {
            console.log(leBots[req.body.id]);
            leBots[--req.body.id].workload = 0;
        } else {
            leBots[--req.body.id].workload = 1;
        }

        fs.writeFile('./bots.txt', JSON.stringify(leBots), (err) => {
            if (err) throw err;
        });
        console.log("Authorized Access!");
        res.send(JSON.stringify({ message: 'OK' }));
    } else {
        console.log("Error Unauthorized Access!");
        res.send(JSON.stringify({ message: 'NOT OK' }));
    }
});


//Show Tasks /api/Tasks
app.get('/api/Tasks', (req, res) => {
    try {
        res.send(JSON.stringify(dieTasks));
    } catch (error) {
        res.send(JSON.stringify("Etwas lief beim Abrufen Schief"));
    }

});

//Show Task /api/Tasks/:id
app.get('/api/Tasks/:id', (req, res) => {
    var theAnswerObj = dieTasks.find(function (d) {
        return d.id == parseInt(req.params.id);
    });
    if (theAnswerObj != undefined) {
        res.send(JSON.stringify(theAnswerObj));
    } else {
        res.send(JSON.stringify("Fehler! ID: " + parseInt(req.params.id) + " nicht vorhanden!"));
    }
});
/*
Post auf Tasks mit ID gegeben. Wenn ID gegeben, dann editiere 
das Aktuelle, sofern vorhanden und der input Inhalt hat. Sonst lege ein neues an.
*/
app.post('/api/Tasks/:id', (req, res) => {
    var user = req.get('Token');
    var toEditObject = dieTasks.find(function (d) {
        return d.id == parseInt(req.params.id);
    });
    var taskVorhanden = dieTasks.indexOf(toEditObject);

    if (valideTokens.indexOf(user)) {
        if (req.body.data.input === "") {
            console.log("Task Leer! Not Cool!")
            res.send(JSON.stringify({ message: 'NOT OK' }))
        } else if (taskVorhanden != -1) {
            dieTasks[taskVorhanden] = req.body;
            res.send(JSON.stringify({ message: 'OK' }));
        } else {
            dieTasks.push(req.body);
            res.send(JSON.stringify({ message: 'OK' }));
        }
    } else {
        res.send(JSON.stringify({ message: 'Not OK' }));
    }
});

/*Post in Tasks. Wenn input leer ist, dann 
NOT OK Message.  Sonst neuen Task Anlegen.
*/
app.post('/api/Tasks', (req, res) => {
    var user = req.get('Token');
    var id = dieTasks.find(function (d) {
        return d.id == dieTasks.length + 1;
    });
	/*var valide =false;
	
        for(i=0;i<valideTokens.length;i++){
            if(user===valideTokens[i]){
                valide=true;
                i=valideTokens.length;
            }
        }*/
    if (valideTokens.indexOf(user) != -1) {
        if (req.body.data.input === "") {
            console.log("Task Leer! Not Cool!")
            res.send(JSON.stringify({ message: 'NOT OK' }))
        } else if (id != undefined) {
            req.body.id = dieTasks.indexOf(id) + 1;
            dieTasks.push(req.body);
            console.log("Cool Bro!")
            res.send(JSON.stringify({ message: 'OK' }));
        } else {
            req.body.id = dieTasks.length + 1;
            dieTasks.push(req.body);
            console.log("Cool Bro!")
            res.send(JSON.stringify({ message: 'OK' }));
        }
    } else {
        console.log("Fehler! Kein Valider Token")
        res.send(JSON.stringify({ message: 'NOT OK' }))
    }

    fs.writeFile('./tasks.txt', JSON.stringify(dieTasks), (err) => {
        if (err) {
            console.log("Etwas lief beim Schreiben Schief :(")
            throw err;
        }
    });
});

//Start Liest alle Tasks ein
app.listen(3000, () => {

    try {

        fs.readFile('tasks.txt', 'utf8', (err, data) => {
            dieTasks = JSON.parse(data.toString());
        });
        console.log("Tasks eingelesen");

    } catch (error) {
        console.log("Datei nicht vorhanden oder leer!");
    }

    try {
        //Lese die Bots ein (Status)
        fs.readFile('bots.txt', 'utf8', (err, data) => {
            if (err) throw err;

            leBots = JSON.parse(data.toString());
            console.log("Bots eingelesen");
        });
    } catch (error) {
        console.log("Datei nicht vorhanden oder Bots TOT :O");
    }
});