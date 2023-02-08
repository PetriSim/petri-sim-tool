const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());




app.get('/startdata', (req, res) => {
    var files = fs.readFileSync('./exampledata.json');

    setTimeout((() => {
        res.send(JSON.parse(files))
    }), 2000)

});


app.get('/startScylla', (req, res) => {
    setTimeout((() => {
        res.send({
            "message": "success",
            "files": [{ "name": "results", "link": "http://localhost:8000/files/1.json", "type": "json" }]
        })
    }), 1000)

});

app.get("/files/:id", (req, res) => {
    const id = req.params.id;
    const file = `./files/${id}`;

    res.download(file);
});



app.listen(8000, () => {
    console.log('Server started on port 8000');
});