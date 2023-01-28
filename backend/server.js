const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/save', (req, res) => {
    const currentDate = new Date();
    const weekday = currentDate.toLocaleString('default', { weekday: 'long' });
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    const finalDate = `${weekday}, ${date} ${time}`.replaceAll(" ", "_");

    fs.writeFileSync('./public/projects/' + finalDate + '.json', JSON.stringify(req.body));
    res.send("Data saved successfully")
});

app.get('/getProjects', (req, res) => {
    var files = fs.readdirSync('./public/projects/');
    res.send(JSON.stringify(files))
});

app.get('/getFile/:filename', (req, res) => {

    axios.get('http://localhost:3000/projects/' + req.params.filename)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            res.status(404).send({ error: "file not found" });
        });
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});