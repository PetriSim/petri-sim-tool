import React, {useState} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Popover,
    PopoverTrigger,
    Button,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
} from '@chakra-ui/react'
import {Card, CardHeader, CardBody, Heading,} from '@chakra-ui/react'


function BPMNTableCompare(props) {
    //**POPOVER is a little windows which opens on click of Parameters which are different for the scenario on COmparison page

    /// /*this method checks if pop over window is needed.
    //      comparison logic: if Model-based Parameter differ at any of compared scenarios it is added to ModelCompared
    //      Here method incoming parameter is field_id, id, value. If this set exists in the ModelCompared, that means that this parameter
    //      (field_id) is different in some compared scenarios. That means that we need a popover window which shows this parameter value
    //      in all compared scenarios*/
    const isDifferentPopover = (field_id, id, value) => {
        let isDifferent = false
        props.ModelCompared.map((item) => {
            if (field_id === item.field && id === item.id && value === item.value) {
                return isDifferent = true
            }
        })
        return isDifferent
    };

    // method to get branching probabilities of gateway
    const getProbabilities = (gateway) => {

        if (gateway !== undefined) {
            return gateway.outgoing.map((out) => {
                let sequence = props.getData("currentModel").modelParameter.sequences.find(item => item.id === out)
                if (sequence !== undefined) {
                    return <Text>{sequence.probability}</Text>
                } else {
                }
            })
        } else {
        }
    }

    // fill probabilities in popover window
    const fillProbabilities = (gateway, scenarioName) => {

        if (gateway !== undefined) {
            return gateway.outgoing.map((out) => {
                let scenario = props.getData("allScenarios").find(item => item.scenarioName === scenarioName)
                if (scenario !== undefined) {
                    let sequence = scenario.models[props.modelIndex].modelParameter.sequences.find(item => item.id === out)
                    if (sequence !== undefined) {
                        return <Text fontWeight={"normal"}>{sequence.probability}</Text>
                    } else {
                    }
                }

            })
        } else {
        }
    }

    // fill costs of activities in popover window
    const costsPopover = (activity_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <div>{element.scenarioName}: {activity.cost} </div>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }

    //fill timeunit of activities in popover window
    const timeUnitPopover = (activity_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <div>{element.scenarioName}: {activity.timeUnit} </div>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }

    // fill currency
    const currencyPopover = (activity_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <div>{element.scenarioName}: {activity.currency} </div>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }

    // checks if this activity exists in other bpmns
    const activityPopover = (activity_id) => {
        return props.getData("allScenarios").map((element, index) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <Text ontWeight='semibold'>{element.scenarioName}: {activity.name}</Text>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }


   // fill duration  of activity
    const durationPopover = (activity_id) => {
        return props.getData("allScenarios").map((element, index) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <Text
                        fontWeight='semibold'>{element.scenarioName}: {activity.duration.values.map((param) => {
                        return <Text fontWeight='normal'>{param.id}: {param.value}</Text>
                    })}</Text>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }
// fill dustribution in popover window (activity)
    const distributionPopover = (activity_id) => {
        return props.getData("allScenarios").map((element, index) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <Text fontWeight='semibold'>{element.scenarioName}: <Text
                        fontWeight='normal'>{activity.duration.distributionType}</Text></Text>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }
// fill resources performing this activity
    const resourcePopover = (activity_id) => {
        return props.getData("allScenarios").map((element, index) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                console.log(index)
                let activity = element.models[props.modelIndex].modelParameter.activities.find(item => item.id === activity_id)
                console.log(activity)
                if (activity !== undefined) {
                    return <Text
                        fontWeight='semibold'>{element.scenarioName}: {activity.resources.map((res) => {
                        return <Text fontWeight='normal'>{res}</Text>
                    })}</Text>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }

    //check if gateway exists in other scenarios
    const gatewayPopover = (gateway_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let gateway = element.models[props.modelIndex].modelParameter.gateways.find(item => item.id === gateway_id)
                if (gateway !== undefined) {
                    return <Text ontWeight='semibold'>{element.scenarioName}: {gateway.id}</Text>
                }
                return <Text>{element.scenarioName}: this gateway is not defined</Text>
            }
        })
    }

    // fill interarrival time of the events
    const arrivalTimePopover = (event_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let event = element.models[props.modelIndex].modelParameter.events.find(item => item.id === event_id)
                if (event !== undefined) {
                    return <Text
                        fontWeight='semibold'>{element.scenarioName}: {event.interArrivalTime.values.map((param) => {
                        return <Text fontWeight='normal'>{param.id}: {param.value}</Text>
                    })}</Text>
                }
                return <Text>{element.scenarioName}: this event is not defined</Text>
            }
        })
    }
    // fill distribution of event inteaarribal time in popover window
    const distributionEventPopover = (event_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let event = element.models[props.modelIndex].modelParameter.events.find(item => item.id === event_id)
                if (event !== undefined) {
                    return <Text fontWeight='semibold'>{element.scenarioName}: <Text
                        fontWeight='normal'>{event.interArrivalTime.distributionType}</Text></Text>
                }
                return <Text>{element.scenarioName}: this event is not defined</Text>
            }
        })
    }


// get name of the incoming to the gateway activities or events
    const getIncoming = (gateway) => {
        let incoming
        props.getData("allModels").models[props.modelIndex].modelParameter.activities.map((element) => {
            element.outgoing.map((out) => {
                if (out === gateway) {
                    return incoming = element.name
                }
            })
        })
        if (incoming === undefined) {
            props.getData("allModels").models[props.modelIndex].modelParameter.events.map((element) => {
                element.outgoing.map((out) => {
                    if (out === gateway) {
                        return incoming = element.name
                    }
                })
            })
        }
        return incoming
    }

    // method to find outgoing activities/events for gateway
    const getOutgoing = (gateway) => {
        let outgoing
        props.getData("allModels").models[props.modelIndex].modelParameter.activities.map((element) => {
            element.incoming.map((inc) => {
                if (inc === gateway) {
                    return outgoing = element.name
                }
            })
        })
        if (outgoing === undefined) {
            props.getData("allModels").models[props.modelIndex].modelParameter.events.map((element) => {
                element.incoming.map((inc) => {
                    if (inc === gateway) {
                        return outgoing = element.name
                    }
                })
            })
        }
        return outgoing
    }

//Names of types of gateways for displaying
    const [gatewayNames] = useState([
        {id: "bpmn:InclusiveGateway", value: 'Inclusive Gateway'},
        {id: "bpmn:ParallelGateway", value: 'Parallel Gateway'},
        {id: "bpmn:ExclusiveGateway", value: 'Exclusive Gateway'},
    ])
//Names of types of events for displaying
    const [eventTypes] = useState([
        {id: "bpmn:StartEvent", value: 'Start Event'},
        {id: "bpmn:EndEvent", value: 'End Event'},
        {id: "bpmn:IntermediateEvent", value: 'Intermediate Event'},
    ])

    // get type of the gateway for displaying
    const getType = (type) => {
        let typeName = gatewayNames.find(item => item.id === type)
        if (typeName !== undefined) {
            return <Text>{typeName.value}</Text>
        }
    }

    // get type of the event for displaying
    const getEventType = (type) => {
        let typeName = eventTypes.find(item => item.id === type)
        if (typeName !== undefined) {
            return <Text>{typeName.value}</Text>
        }
    }

    let gatewayO
 // filter scenarios. use only one which participate in comparison
    const differentScenarios = props.getData("allScenarios").filter(item => props.scenariosCompare.includes(item.scenarioName))

    return (
        <>
            {/*Filling in Comparison Table. Model-based parameters of current scenario are shown. If there are difeerences, they are highlighted
             and clicable. On click small window is opened and the value of the same parameters in other compared scenarios is shown*/}
            <Card bg="white" mt="25px">
                <CardHeader>
                    <Heading size='md'>Model-based parameters - Activities</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
                        <Thead w="100%">
                            <Tr>
                                <Th>Activity</Th>
                                <Th>Resource</Th>
                                <Th>Duration - distribution</Th>
                                <Th>Distribution data</Th>
                                <Th>TimeUnits</Th>
                                <Th>Costs</Th>
                                <Th>Currency</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.getData("currentModel").modelParameter.activities.map((element) => {
                                return <>
                                    <Tr>
                                        {/*Activity*/}
                                        <Td>
                                            {!isDifferentPopover("activity", element.id, element.id) ?
                                                <Text>{element.name}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>  {element.name}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {activityPopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Resources*/}
                                        <Td>
                                            {!isDifferentPopover("resources", element.id, element.id) ?
                                                element.resources.map((resource) => {
                                                    return <Text> {resource} </Text>
                                                })
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>{element.resources.map((resource) => {
                                                            return <Text> {resource} </Text>
                                                        })}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {resourcePopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*  Distribution Type*/}
                                        <Td>
                                            {!isDifferentPopover("distributionType", element.id, element.duration.distributionType) ?
                                                <Text> {element.duration.distributionType} </Text>

                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button> {element.duration.distributionType}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {distributionPopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Distribution Values*/}
                                        <Td>
                                            {!isDifferentPopover("durationValues", element.id, element.id) ?
                                                element.duration.values.map((item) => {
                                                    return <Text>{"⠀" + item.id + " " + item.value}</Text>
                                                })
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>{element.duration.values.map((item) => {
                                                            return <Text>{"⠀" + item.id + ": " + item.value}</Text>

                                                        })}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {durationPopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Time Units*/}
                                        <Td>
                                            {!isDifferentPopover("timeUnit", element.id, element.unit) ?
                                                <Text>{element.unit}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>  {element.unit}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {timeUnitPopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Costs*/}
                                        <Td>
                                            {!isDifferentPopover("task_costs", element.id, element.cost) ?
                                                <Text>{element.cost}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>  {element.cost}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {costsPopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Currency*/}
                                        <Td>
                                            {!isDifferentPopover("currency", element.id, element.currency) ?
                                                <Text>{element.currency}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>  {element.currency}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {currencyPopover(element.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                    </Tr>
                                </>
                            })}

                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
            {/*Filling in Model-based parameters - Gateways Table*/}
            <Card bg="white" mt="25px">
                <CardHeader>
                    <Heading size='md'>Model-based parameters - Gateways</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
                        <Thead w="100%">
                            <Tr>
                                <Th>ID</Th>
                                <Th>Type</Th>
                                <Th>Incoming activity</Th>
                                <Th>Outgoing activity</Th>
                                <Th>Probability</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.getData("currentModel").modelParameter.gateways.map((gateway) => {
                                return <>
                                    <Tr>
                                        {/*Gateway*/}
                                        <Td>
                                            {!isDifferentPopover("gateway", gateway.id, gateway.id) ?
                                                <Text>{gateway.id}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>  {gateway.id}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {gatewayPopover(gateway.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>
                                            }
                                        </Td>
                                        {/*Type*/}
                                        <Td>
                                            <Text>{getType(gateway.type)}</Text>
                                        </Td>
                                        {/*Incoming activity*/}
                                        <Td>
                                            {gateway.incoming.map((inc) => {
                                                return <Text>{getIncoming(inc)}</Text>
                                            })}
                                        </Td>
                                        {/*  Outgoing activity*/}

                                        <Td>
                                            {gateway.outgoing.map((out) => {
                                                return <Text>{getOutgoing(out)}</Text>
                                            })}
                                        </Td>
                                        {/*Probabilities*/}
                                        <Td>

                                            {!isDifferentPopover("probability", gateway.id, gateway.id) ?
                                                <Text> {getProbabilities(gateway)} </Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>
                                                            <div>{getProbabilities(gateway)}</div>
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {differentScenarios.map((scenario) => {
                                                                    gatewayO = scenario.models[props.modelIndex].modelParameter.gateways.find(item => item.id === gateway.id)
                                                                    if (gatewayO !== undefined) {
                                                                        return (
                                                                        <Text fontWeight={"semibold"}>{scenario.scenarioName}: {fillProbabilities(gateway, scenario.scenarioName)}</Text>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>

                                    </Tr>
                                </>
                            })}

                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
            {/*Filling in Model-based parameters - Events Table*/}
            <Card bg="white" mt="25px">
                <CardHeader>
                    <Heading size='md'>Model-based parameters - Events</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
                        <Thead w="100%">
                            <Tr>
                                <Th>Name</Th>
                                <Th>Type</Th>
                                <Th>Inter-arrival time</Th>
                                <Th>Distribution data</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.getData("currentModel").modelParameter.events.map((event) => {
                                return <>
                                    <Tr>
                                        {/*Event*/}
                                        <Td>
                                                <Text>{event.name}</Text>
                                        </Td>
                                        {/*Type*/}
                                        <Td>
                                            <Text>{getEventType(event.type)}</Text>
                                        </Td>
                                        {/*Inter-arrival time*/}
                                        <Td>
                                            {!isDifferentPopover("distributionTypeEvent", event.id, event.interArrivalTime.distributionType) ?
                                                <Text>{event.interArrivalTime.distributionType}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>{event.interArrivalTime.distributionType}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {distributionEventPopover(event.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>

                                        {/*Inter-arrival time. Distribution*/}
                                        <Td>
                                            {!isDifferentPopover("durationValuesEvent", event.id, event.id) ?
                                                event.interArrivalTime.values.map((item) => {
                                                        return <Text>{"⠀" + item.id + ": " + item.value}</Text>
                                                    })
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>
                                                            {event.interArrivalTime.values.map((item) => {
                                                                return <Text>{"⠀" + item.id + ": " + item.value}</Text>

                                                            })}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {arrivalTimePopover(event.id)}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>

                                    </Tr>
                                </>
                            })}

                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}

export default BPMNTableCompare


