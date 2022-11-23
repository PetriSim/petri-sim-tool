import BpmnModdle from 'bpmn-moddle';

const moddle = new BpmnModdle();

const xmlStr =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
    'id="empty-definitions" ' +
    'targetNamespace="http://bpmn.io/schema/bpmn">' +
    '</bpmn2:definitions>';


const {
    rootElement: definitions
} = await moddle.fromXML(xmlStr);

// update id attribute
definitions.set('id', 'NEW ID');

// add a root element
const bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1' });
definitions.get('rootElements').push(bpmnProcess);

// xmlStrUpdated contains new id and the added process
const {
    xml: xmlStrUpdated
} = await moddle.toXML(definitions);