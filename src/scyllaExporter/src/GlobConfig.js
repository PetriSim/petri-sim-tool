const conv_ele = require('./ConvertElements');

module.exports ={
    createNewJsonGlob: function (obj, bpmn, name) {

        var newJson = {"_declaration":{"_attributes":{"version":"1.0","encoding":"UTF-8"}}};
        newJson.globalConfiguration = createGlobConfig(obj, bpmn, name);
        return newJson;
}
}

function createGlobConfig(obj, bpmn, name) {
    var globConfig = new Object;
    var attributes = new Object;
    var resourceData = new Object;
    var timetables = new Object;
    for (let prop in obj) {
        if (prop == 'xmlns:bsim') { // missing in our tool
            attributes.processRef = (obj[prop]);
        }
        else if (prop == 'targetNamespace') {   // missing in our tool
            attributes.startDateTime = (obj[prop]);
        }
        else if (prop == 'id') {    // missing in our tool
            attributes.startDateTime += (obj[prop]);    //TODO: only when date before time is given. format of time, separator not clear
        }
        else if (prop == 'resource') {
            resourceData.dynamicResource = conv_ele.createResources(obj[prop]);
        }
        else if (prop == 'timeTable') {
            timetables.timetable = conv_ele.createTimetable(obj[prop]);
        }

    }
    attributes.xmlns = bpmn;
    attributes.targetname = name;
    globConfig.resourceData = resourceData;
    globConfig.timetables = timetables;
    globConfig._attributes = attributes;
    return globConfig;
}