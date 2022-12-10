/** 
    This file is needs to be run to convert a .json-file to xml-files for Scylla
    It produces one global configuration file and one simulation configuration file
    for each "scenario" and each "model" as named in the .json-file.

    the input files are in the ../input folder
    the output files in the ../output folder

    to install the xml-js package run "npm install --save xml-js" in command line
*/

const tra_sce = require('./translateScenario');

// read input file:
const jsonObj = require('../input/test.json');


if (jsonObj instanceof Array) {
    for (let index in jsonObj) {
        tra_sce.translateScen(jsonObj[index], index);
    }
}




