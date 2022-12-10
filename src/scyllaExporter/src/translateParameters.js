const glo_co = require('./GlobConfig');
const sim_co = require('./SimConfig');
var convert = require('xml-js');
const fs = require('fs');

var options = {
    fullTagEmptyElement: false, 
    compact: true, 
    ignoreComment: true, 
    spaces: '\t', 
    instructionHasAttributes : false, 
    indentCdata : true,
    addParent: true};

module.exports = {
    translateParamters: function (obj, sceIndex, modIndex, bpmn, name) {
        var parameters = new Object;
        
        // global configuration:
        newJson = glo_co.createNewJsonGlob(obj, bpmn, name);
        var result = convert.json2xml(newJson, options);
        console.log(result);
        
        // output-file:
        fs.writeFile('./Output/GlobConfig_Sce' + sceIndex + '_Mod' + modIndex +'.xml', result, (err) => {
        if (err) throw err;})
        
        // Simulation Configuration:

        newJson = sim_co.createNewJsonSim(obj, bpmn, name);
        var result = convert.json2xml(newJson, options);
        console.log(result);
        
        // output-file:
        fs.writeFile('./Output/SimConfig_Sce' + sceIndex + '_Mod' + modIndex +'.xml', result, (err) => {
        if (err) throw err;})
    }
}
