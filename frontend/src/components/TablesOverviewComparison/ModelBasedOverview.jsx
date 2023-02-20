import {Card, CardBody, CardHeader, Flex, Heading, Text} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import React from "react";

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class ModelBasedOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parsed: false
        };
        // text to display gateway types
        this.gatewayNames = [
            {id: "bpmn:InclusiveGateway", value: 'Inclusive Gateway'},
            {id: "bpmn:ParallelGateway", value: 'Parallel Gateway'},
            {id: "bpmn:ExclusiveGateway", value: 'Exclusive Gateway'},
        ]

        // text to display event types
        this.eventTypes = [
            {id: "bpmn:StartEvent", value: 'Start Event'},
            {id: "bpmn:EndEvent", value: 'End Event'},
            {id: "bpmn:IntermediateEvent", value: 'Intermediate Event'},
        ]


    }

    // check if data is available
    componentDidMount() {
        console.log(this.props.parsed)
        if (this.props.parsed) {
            this.setState({
                parsed: true,
            })
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.parsed)

        if (prevProps.parsed !== this.props.parsed) {
            sleep(500).then(() => {
                this.setState({
                    parsed: true
                })
            });
        }
    }

    // this method find probabilities for the gateway
    getProbabilities(gateway) {
        if (gateway !== undefined) {
            return gateway.outgoing.map((out) => {
                let sequence = this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.sequences.find(item => item.id === out)
                if (sequence !== undefined) {
                    return <Text>{sequence.probability}</Text>
                } else {
                }
            })
        } else {
        }
    }

    // this method is used to define gateway type for displaying
    getGatewayType(type) {
        let typeName = this.gatewayNames.find(item => item.id === type)
        if (typeName !== undefined) {
            return <Text>{typeName.value}</Text>
        }
    }

    // this method is used to define event type for displaying
    getEventType(event) {
        let typeName = this.eventTypes.find(item => item.id === event)
        if (typeName !== undefined) {
            return <Text>{typeName.value}</Text>
        }
    }
// method to find incoming activities/events for gateway
    getIncoming(gateway) {
        let incoming
        this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.activities.map((element) => {
            element.outgoing.map((out) => {
                if (out === gateway) {
                    incoming = element.name
                }
            })
        })
        if (incoming === undefined) {
            this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.events.map((element) => {
                element.outgoing.map((out) => {
                    if (out === gateway) {
                        incoming = element.name
                    }
                })
            })
        }
        return incoming
    }

    // method to find outgoing activities/events for gateway
    getOutgoing(gateway) {
        let outgoing
        this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.activities.map((element) => {
            element.incoming.map((inc) => {
                if (inc === gateway) {
                    outgoing = element.name
                }
            })
        })
        if (outgoing === undefined) {
            this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.events.map((element) => {
                element.incoming.map((inc) => {
                    if (inc === gateway) {
                        outgoing = element.name
                    }
                })
            })
        }
        return outgoing
    }

    render() {
        return (
            <>
                {/*check if data is available*/}
                {this.state.parsed ?
                    <>
                        {/*Representation of Model-based Parameters - Activities */}
                        <Card bg="white" mt="25px">
                            <CardHeader>
                                <Heading size='md'>Model-based Parameters - Activities</Heading>
                            </CardHeader>
                            <CardBody>
                                <Table variant='simple'>
                                    <Thead w="100%">
                                        <Tr>
                                            <Th>Activity</Th>
                                            <Th>Resource</Th>
                                            <Th>Duration</Th>
                                            <Th>Duration Data</Th>
                                            <Th>TimeUnit</Th>
                                            <Th>Cost</Th>
                                            <Th>Currency</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.props.getModelData("allScenarios")[this.props.scenarioId].models[this.props.bpmn_id].modelParameter.activities.map((element) => {
                                            return <>
                                                <Tr>
                                                    <Td>{element.name}</Td>
                                                    <Td>
                                                        {element.resources.map((resource) => {
                                                            return <Text> {resource} </Text>
                                                        })}
                                                    </Td>
                                                    <Td>{element.duration.distributionType}</Td>
                                                    <Td>{element.duration.values.map((value) => {
                                                        return <Text>{value.id + ": " + value.value}</Text>
                                                    })}</Td>
                                                    <Td>{element.unit}</Td>
                                                    <Td>{element.cost}</Td>
                                                    <Td>{element.currency}</Td>
                                                </Tr>
                                            </>

                                        })}
                                    </Tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        {/* Representation of Model-based Parameter - Gateways*/}
                        <Card bg="white" mt="25px">
                            <CardHeader>
                                <Heading size='md'>Model-based Parameter - Gateways</Heading>
                            </CardHeader>
                            <CardBody>
                                <Table variant='simple'>
                                    <Thead w="100%">
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Incoming activity</Th>
                                            <Th>Outgoing activity</Th>
                                            <Th>Probabilities</Th>
                                            <Th>Type</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.gateways.map((element) => {
                                            return <>
                                                <Tr>
                                                    <Td>{element.id}</Td>
                                                    <Td>{element.incoming.map((inc) => {
                                                        return <Text>{this.getIncoming(inc)}</Text>
                                                    })}</Td>
                                                    <Td>{element.outgoing.map((out) => {
                                                        return <Text>{this.getOutgoing(out)}</Text>
                                                    })}</Td>
                                                    <Td>{this.getProbabilities(element)}</Td>
                                                    <Td>{this.getGatewayType(element.type)}</Td>
                                                </Tr>
                                            </>
                                        })}
                                    </Tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        <Flex pt="20px">
                            {/* Representation of Model-based Parameters - Events*/}
                            <Card bg="white" w="100%">
                                <CardHeader>
                                    <Heading size='md'>Model-based Parameters - Events</Heading>
                                </CardHeader>
                                <CardBody>
                                    <TableContainer>
                                        <Table variant='simple'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Event name</Th>
                                                    <Th>Event type</Th>
                                                    <Th>Inter-arrival time</Th>
                                                    <Th>Distribution data</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.events.map((element) => {
                                                    return <Tr>
                                                        <Td>{element.name}</Td>
                                                        <Td>{this.getEventType(element.type)}</Td>
                                                        <Td>{element.interArrivalTime.distributionType}</Td>
                                                        <Td>{element.interArrivalTime.values.map((value) => {
                                                            return <Text>{value.id + ": " + value.value}</Text>
                                                        })}</Td>
                                                    </Tr>
                                                })}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </CardBody>
                            </Card>
                        </Flex>
                    </>
                    : ""}
            </>
        );
    }
}

export default ModelBasedOverview


