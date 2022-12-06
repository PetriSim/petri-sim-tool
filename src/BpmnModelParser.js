import Modeler from "bpmn-js/lib/Modeler";




async function BpmnModelParser(bpmnFile) {

    var diagram = bpmnFile
    var modelerRef = null
    var data = {}

    modelerRef = new Modeler();


    try {
        await modelerRef.importXML(diagram);

        var elementRegistry = modelerRef.get('elementRegistry');

        var internal = {
            activities: [],
            gateways: [],
            events: [],
            sequences: []
        }

        var elements = elementRegistry.getAll()


        elements.forEach(element => {
            if (element.type.includes("Gateway")) {
                internal.gateways.push({
                    "id": element.id,
                    "type": element.type,
                    "incoming": element.incoming.map(seq => seq.id),
                    "outgoing": element.outgoing.map(seq => seq.id),
                })
            }

            if (element.type.includes("Task")) {
                internal.activities.push({
                    "id": element.id,
                    "name": element.businessObject.name,
                    "type": element.type,
                    "resource": "Courier",
                    "duration": 5,
                    "unit": "mins",
                    "cost": 2,
                    "currency": "euro",
                    "incoming": element.incoming.map(seq => seq.id),
                    "outgoing": element.outgoing.map(seq => seq.id)
                })
            }

            if (element.type.includes("Event")) {
                internal.events.push({
                    "id": element.id,
                    "type": element.type,
                    "resource": "Courier",
                    "duration": 5,
                    "unit": "mins",
                    "cost": 2,
                    "currency": "euro",
                    "incoming": element.incoming.map(seq => seq.id),
                    "outgoing": element.outgoing.map(seq => seq.id),
                })
            }

            if (element.type.includes("Sequence")) {
                internal.sequences.push({
                    "id": element.id,
                    "type": element.type,
                    "probability": 0.25
                })
            }

        })

        data = internal
    } catch (err) {
        console.log("error", err);
    }

    return data
}

export default BpmnModelParser;