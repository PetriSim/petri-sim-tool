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
    const isDifferentPopover = (field_id, id, value) => {
        let isDifferent = false
        props.ModelCompared.map((item) => {
            if (field_id === item.field && id === item.id && value === item.value) {
                return isDifferent = true
            }
        })
        return isDifferent
    };

    const fillProbabilities = (gateway) => {

        if (gateway !== undefined) {
           return gateway.outgoing.map((out) => {
                let sequence = props.getData("currentModel").modelParameter.sequences.find(item => item.id === out)
                if (sequence !== undefined) {
                    return <Text>{sequence.probability}</Text>
                } else{}
            })
        } else {}
        }

    const costsPopover = (activity_id) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let activity = element.models[0].modelParameter.activities.find(item => item.id === activity_id)
                if (activity !== undefined) {
                    return <div>{element.scenarioName}: {activity.cost} </div>
                }
                return <Text>{element.scenarioName}: this activity is not defined</Text>
            }
        })
    }

    const [gatewayNames] = useState([
        {id: "bpmn:InclusiveGateway", value: 'Inclusive Gateway'},
        {id: "bpmn:ParallelGateway", value: 'Parallel Gateway'},
        {id: "bpmn:ExclusiveGateway", value: 'Exclusive Gateway'},
        ])

    const getType = (type) => {
        let typeName = gatewayNames.find(item => item.id === type)
        if (typeName !== undefined) {
            return <Text>{typeName.value}</Text>
        }
    }

    console.log(props.ModelCompared)
    return (
        <>

            <Card bg="white" mt="25px">
                <CardHeader>
                    <Heading size='md'>Resource Overview</Heading>
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
                                {!isDifferentPopover("activity", element.id, element.name) ?
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
                                                    This element does not exist
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
                                            <Button>{ element.resources.map((resource) => {
                                                return <Text> {resource} </Text>
                                            })}</Button>
                                        </PopoverTrigger>
                                        <Portal>
                                            <PopoverContent bg='#dce5e6' zIndex={4}>
                                                <PopoverArrow/>
                                                <PopoverCloseButton/>
                                                <PopoverBody>
                                                    This element does not exist
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
                                            This element does not exist
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
                                        return <Text>{item.id}: {item.value} </Text>
                                    })
                                    :
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button>{ element.duration.values.map((item) => {
                                                return <Text>{item.id}: {item.value} </Text>
                                            })}</Button>
                                        </PopoverTrigger>
                                        <Portal>
                                            <PopoverContent bg='#dce5e6' zIndex={4}>
                                                <PopoverArrow/>
                                                <PopoverCloseButton/>
                                                <PopoverBody>
                                                    This element does not exist
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
                                                    This element does not exist
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
                                                    This element does not exist
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

            <Card bg="white" mt="25px">
                <CardHeader>
                    <Heading size='md'>Gateways</Heading>
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
                                        {/*Activity*/}
                                        <Td>
                                            {!isDifferentPopover("gateway_id", gateway.id, gateway.id) ?
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
                                                                This element does not exist
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Type*/}
                                        <Td>
                                            {!isDifferentPopover("task_costs", gateway.id, gateway.id) ?
                                                <Text>{getType(gateway.type)}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button> {getType(gateway.type)}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                This element does not exist
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Incoming activity*/}
                                        <Td>
                                            {!isDifferentPopover("inc_activity", gateway.id, gateway.id) ?
                                                gateway.incoming.map((inc) => {
                                                    return <Text>{inc}</Text>
                                                })
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>{gateway.incoming.map((inc) => {
                                                            return <Text>{inc}</Text>
                                                        }) }</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                This element does not exist
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*  Outgoing activity*/}
                                        <Td>
                                            {!isDifferentPopover("distributionType", gateway.id, gateway.id) ?
                                                gateway.outgoing.map((out) => {
                                                    return <Text>{out}</Text>
                                                })
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button> {gateway.outgoing.map((out) => {
                                                            return <Text>{out}</Text>
                                                        })}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                This element does not exist
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Probabilities*/}
                                        <Td>

                                            {!isDifferentPopover("incoming_probability", gateway.id, gateway.id) ?
                                                <Text> {fillProbabilities(gateway)} </Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button>{fillProbabilities(gateway)}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                This element does not exist
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


