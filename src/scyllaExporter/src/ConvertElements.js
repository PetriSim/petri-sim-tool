    module.exports = {

    getGatewayType: function(obj) {
        var gatewayType = '';
    
        for (let prop in obj) {       
            if (prop == 'type') {
                gatewayType = (obj[prop]);
            }
        }
        return gatewayType;
    },

    createResources: function (obj) {
        ress = new Array;
        for (let i in obj) {
            for (let prop in obj[i]) {
                if (prop == 'resources') {
                    for (let j in obj[i][prop]) {
                        ress.push(createOneRes(obj[i][prop][j]));
                    }
                }
            }

        }
        return ress;

    },

    createTasks: function (obj) {
        tasks = new Array;
        for (let taskIndex in obj) {
            tasks.push(createOneTask(obj[taskIndex]));
        }
        return tasks;

    },

    createGateways: function (obj) {
        gateways = new Array;
        for (let index in obj) {
            gateways.push(createOneGateway(obj[index]));
        }
        return gateways;

    },
    createOneGateway:function (obj, probabilities) {
    
        var gateway = new Object;
        var attributes = new Object;
        var outgoing = new Object;
    
        for (let prop in obj) {       
            if (prop == 'id') {
                attributes.id = (obj[prop]);
            }
            else if (prop == 'outgoing') {
                outgoing = new Array;
                for (let i in obj[prop] ) {
                    outgoing[i] = createOutGoing(obj[prop][i], probabilities);
                }
            }
        }
        //gateway.outgoing = resources
        gateway.outgoingSequenceFlow = outgoing;
        gateway._attributes = attributes;
        return gateway;
    }
}

function createOneRes(obj) {
    var res = new Object;
    var attributes = new Object;
    for (let prop in obj) {       
        if (prop == 'id') {
            attributes.id = (obj[prop]);
        }
        else if (prop == 'costHour') {
            attributes.defaultCost = (obj[prop]);
        }
        else if (prop == 'schedules') {
            attributes.defaultTimetableId = (obj[prop]);
        }
        else if (prop == 'name') {
            attributes.name = (obj[prop]);
        }
    }
    res._attributes = attributes;
    return res;
}

function createOneTask(obj) {
    var task = new Object;
    var attributes = new Object;
    var resources = new Object;
    for (let prop in obj) {       
        if (prop == 'id') {
            attributes.id = (obj[prop]);
        }
        else if (prop == 'resource') {
            resources.resource = createOneResourceForTask(obj[prop]);
        }
        else if (prop == 'duration') {
            task.duration = createOneDuration(obj[prop]);
        }
    }
    task.resources = resources
    task._attributes = attributes;
    return task;
}

function createOutGoing(obj, probabilities) {
    var outf = new Object;
    var attributes = new Object;
    attributes.id = (obj);
    for (let id in probabilities) {
        if (id == obj) {
            outf.branchingProbability = probabilities[id];
        }
    }

    outf._attributes = attributes;
    return outf;
}



function createOneResourceForTask(obj) {
    var res = new Object;
    var attributes = new Object;
        attributes.id = obj;
        attributes.amount = 1;
    res._attributes = attributes;
    return res;
}

function createOneDuration(obj) {
    var dur = new Object;
    var attributes = new Object;
    for (let prop in obj) {       
        if (prop == 'timeUnit') {
            attributes.timeUnit = (obj[prop]);
        }
    }
    dur._attributes = attributes;
    return dur;
}