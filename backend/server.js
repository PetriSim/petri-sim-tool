const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());




app.get('/startdata', (req, res) => {
    var files = fs.readFileSync('./files/pizza1.json');

    setTimeout((() => {
        res.send(JSON.parse(files))
    }), 2000)

});


app.get('/startScylla', (req, res) => {
    setTimeout((() => {
        res.send({
            "message": `***** DESMO-J version 2.5.1c *****
                        1676022019727 starts at simulation time 0.
                        ...please wait...
                        1676022019727 stopped at simulation time 843.
                        Wrote batch activity statistics to samples/output_23_02_10_10_40_19_947/exBPMN_Sce0_Global_batchactivitystats.txt start serializing log to XES. XML finished serializing log (6 msec.)
                        The test plugin has been called`,
            "files": [{ "name": "exBPMN_Scel_Global_resourceutilization.xml", "link": "http://localhost:8000/files/1.json", "type": "xml" },
                { "name": "newEx.xes", "link": "http://localhost:8000/files/1.json", "type": "xes" }
            ]
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