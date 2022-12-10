const conv_ele = require('./ConvertElements');

module.exports ={
    createNewJsonSim: function (obj, bpmn, name) {

        var newJson = {"_declaration":{"_attributes":{"version":"1.0","encoding":"UTF-8"}}};
        newJson.simulationConfiguration = createSimConfig(obj, bpmn, name);
        return newJson;
    }
}

function createSimConfig(obj, bpmn, name) {
    var simConfig = new Object;
    var attributes = new Object;
    var probabilities = new Object;
    for (let prop in obj) {      
        if (prop == 'modelParameter') {
            for (let prop2 in obj[prop]) {
                if (prop2 == 'sequences') {
                    for (let j in obj[prop][prop2]) {
                        for (let prop3 in obj[prop][prop2][j]) {
                            if (prop3 == 'id') {
                                var sequenceflowID = obj[prop][prop2][j][prop3];
                                // look for gateway that has the sequenceid as outgoing flow 
                                // and assign probability

                                for (let prop5 in obj[prop][prop2][j]) {
                                    if (prop5 == 'probability') {
                                        var proba = obj[prop][prop2][j][prop5];
                                    }
                                }
                                probabilities[sequenceflowID] = proba;
                            }}}}}}}


    for (let prop in obj) {       
        if (prop == 'scenarioName') {   // scenario->model->scenario conflict
            attributes.processRef = (obj[prop]);
        }
        else if (prop == 'simulation') {
            for (let prop2 in obj[prop]) {
                 if (prop2 == 'startingTime') {
                    attributes.startDateTime = 'T' + (obj[prop][prop2]) + '+01:00';    //TODO: only when date before time is given. format of time, separator tbd
                }
                else if (prop2 == 'StartingDate') {
                    attributes.startDateTime = 
                        (obj[prop][prop2].slice(6,10)) + '-'
                        +(obj[prop][prop2].slice(3,5)) + '-'
                        +(obj[prop][prop2].slice(0,2))
                        + attributes.startDateTime;
                }
                else if (prop2 == 'instanceNumber') {
                    attributes.processInstances = (obj[prop][prop2]);
                }
            }
        }
        else if (prop == 'modelParameter') {
            for (let prop2 in obj[prop]) {
                if (prop2 == 'activities') {
                    simConfig.Task = conv_ele.createTasks(obj[prop][prop2]);
                }
                else if (prop2 == 'gateways') {
                    //gateways = new Array;
                    for (let index in obj[prop][prop2]) {
                        gatewayType = conv_ele.getGatewayType(obj[prop][prop2][index]);
                        simConfig[gatewayType] = conv_ele.createOneGateway(obj[prop][prop2][index], probabilities);
                    }
                }

            }
        }
    }
    
    attributes.xmlns = bpmn;
    attributes.targetname = name;
    simConfig._attributes = attributes;
    return simConfig;
}