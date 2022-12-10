// in our representation a model contains
//  one BPMN and
//  one set of global configurations and
//  one set of process configurations 

// one model is one element in the models array

const tra_pa = require('./translateParameters');

module.exports = {

    translateScen: function (jsonObj, sceIndex) {

        for (let prop in jsonObj) {
            if (prop == 'scenario') {
                for (let prop2 in jsonObj[prop]) {
                    if ( prop2 == 'models' ) {
                        for (let modIndex in  jsonObj[prop][prop2]) {
                            for (let prop3 in jsonObj[prop][prop2][modIndex]) {
                                if (prop3 == 'BPMN') {var bpmn = jsonObj[prop][prop2][modIndex][prop3]}
                                if (prop3 == 'name') {var name = jsonObj[prop][prop2][modIndex][prop3]}
                                if (prop3 == 'parameters') {
                                    tra_pa.translateParamters(jsonObj[prop][prop2][modIndex][prop3], sceIndex, modIndex, bpmn, name);
                                }
                            }
                        }
                    }
                }
            }    
        }
    }
}