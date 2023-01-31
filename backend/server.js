const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/save', (req, res) => {
    var files = fs.readdirSync('./projects/');
    var amount = files.length

    var fullData = JSON.parse(JSON.stringify(req.body))
    console.log(fullData)
    var projectname = fullData.projectname
    var data = fullData.data

    fs.writeFileSync('./projects/' + projectname + '.json', JSON.stringify(data));
    res.status(200).send("Data saved successfully");
});


app.get('/getProjects', (req, res) => {


    var dir = './projects/';

    var files = fs.readdirSync(dir);
    files.sort(function(a, b) {
        return fs.statSync(dir + a).mtime.getTime() -
            fs.statSync(dir + b).mtime.getTime();
    });



    //var files = fs.readdirSync('./projects/');
    res.send(JSON.stringify(files))
});

app.get('/getFile/:filename', (req, res) => {

    var files = fs.readFileSync('./projects/' + req.params.filename);
    res.send(JSON.parse(files))

    /*
    axios.get('http://localhost:3000/projects/' + req.params.filename)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            res.status(404).send({ error: "file not found" });
        });
        */
});

app.get('/startdata', (req, res) => {
    var files = fs.readFileSync('./exampledata.json');
    res.send(JSON.parse(files))
});




app.listen(8000, () => {
    console.log('Server started on port 8000');
});