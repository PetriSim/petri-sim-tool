import {
    Button,
    Spacer,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Box,
} from '@chakra-ui/react';


import {React} from 'react'
import {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Heading,} from '@chakra-ui/react'
import {Highlight} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Portal,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody
} from '@chakra-ui/react';


function OverviewPage(props) {

    const {onOpen, onClose} = useDisclosure()
    let i, notsameScenario = [], notsameRes = [], valueRes = [];
    const [isOpen, setIsOpen] = useState(false);
    const [specificValue, setSpecificValue] = useState(null);
    let distr_values
    let scenario_name, scenario_date, x

    const isPopover = (field_id) => {
        if (notsameScenario.includes(field_id)) {
            return true
        } else return false
    };


    const getColor = (field_id) => {
        if (notsameScenario.includes(field_id)) {
            return {bg: "#dce5e6"};
        } else {
            return {bg: 'white'};
        }
    }

    const getColRoles = (field_id) => {
        if (notsameRes.includes(field_id)) {
            return {backgroundColor: '#dce5e6'};
        } else {
            return {backgroundColor: 'white'};
        }
    }

    const getColorRes = (field_id, value_res) => {
        if (notsameRes.includes(field_id) && valueRes.includes(value_res)) {
            return {backgroundColor: '#dce5e6'};
        } else {
            return {backgroundColor: 'white'};
        }
    }

    const getTextColor = (field_id, value_res) => {
        if (notsameRes.includes(field_id) && valueRes.includes(value_res)) {
            return {color: '#6d0d06'};
        } else {
            return {color: 'black'};
        }
    }


    notsameScenario.length = 0


    for (i = 0; i < props.getData("allScenarios").length; i++) {
        if (props.scenariosCompare.includes(props.getData("allScenarios")[i].scenarioName)) {
            if (props.getData("allScenarios")[i].resourceParameters.roles !== props.getData("currentScenario").resourceParameters.roles) {
                {
                    props.getData("allScenarios")[i].resourceParameters.roles.map((element) => {
                        {
                            props.getData("currentScenario").resourceParameters.roles.map((current_element) => {

                                if (element.id !== current_element.id) {
                                    notsameRes.push("id")
                                    valueRes.push(current_element.id)
                                }

                                if (element.numberOfInstances !== current_element.numberOfInstances) {
                                    notsameRes.push("numberOfInstances")
                                    valueRes.push(current_element.numberOfInstances)
                                }

                                if (element.schedule !== current_element.schedule) {
                                    notsameRes.push("schedule")
                                    valueRes.push(current_element.schedule)
                                }

                                if (element.resources !== current_element.resources) {
                                    {
                                        element.resources.map((resource1) => {
                                            {
                                                current_element.resources.map((current_resource) => {

                                                    if (resource1.id !== current_resource.id) {
                                                        notsameRes.push("resource")
                                                        valueRes.push(current_resource.id)
                                                    }
                                                })
                                            }

                                        })
                                    }


                                }


                            })
                        }

                    })
                }
            }
        } else {
        }

    }


    for (i = 0; i < props.getData("allScenarios").length; i++) {

        if (props.scenariosCompare.includes(props.getData("allScenarios")[i].scenarioName)) {

            if (props.getData("allScenarios")[i].scenarioName !== props.getData("currentScenario").scenarioName) {
                notsameScenario.push("scenarioName")
            }

            if (props.getData("allScenarios")[i].startingDate !== props.getData("currentScenario").startingDate) {
                notsameScenario.push("startingDate")
            }

            if (props.getData("allScenarios")[i].startingTime !== props.getData("currentScenario").startingTime) {
                notsameScenario.push("startingTime")
            }
            if (props.getData("allScenarios")[i].numberOfInstances !== props.getData("currentScenario").numberOfInstances) {
                notsameScenario.push("numberOfInstances")
            }
            if (props.getData("allScenarios")[i].interArrivalTime.distributionType !== props.getData("currentScenario").interArrivalTime.distributionType) {
                notsameScenario.push("distributionType")
            }
            if (props.getData("allScenarios")[i].timeUnit !== props.getData("currentScenario").timeUnit) {
                notsameScenario.push("timeUnit")
            }
            if (props.getData("allScenarios")[i].interArrivalTime.values !== props.getData("currentScenario").interArrivalTime.values) {
                notsameScenario.push("distribution")
            }

        } else {
        }
    }


    return (
        <>
            <Box h="93vh" overflowY="auto" p="5">
                <Stack direction='row' spacing={4} w="70vw">
                    <Button as={Link} to="/overview"
                            colorScheme='#ECF4F4'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={onOpen}
                            _hover={{bg: '#B4C7C9'}}>
                        Go back
                    </Button>
                    <Spacer/>
                    <Spacer/>
                    <Button as={Link} to="/differences"
                            colorScheme='white'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={() => '/differences'}
                            _hover={{bg: '#B4C7C9'}}>
                        Show differences
                    </Button>
                    <Button colorScheme='white'
                            variant='outline'
                            border='1px'
                            color='#6E6E6F'
                            borderColor='#B4C7C9'
                            _hover={{bg: '#B4C7C9'}}>
                        Add new scenario
                    </Button>
                </Stack>
                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Scenario Overview</Heading>
                    </CardHeader>
                    <CardBody>
                        <Table variant='simple'>
                            <Thead w="100%">
                                <Tr>
                                    <Th>Scenario</Th>
                                    <Th>Starting date</Th>
                                    <Th>Starting time</Th>
                                    <Th>Replications</Th>
                                    <Th>Inter-arrival Time:Distribution</Th>
                                    <Th>Distribution Data</Th>
                                    <Th>Time unit</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        {isPopover("scenarioName") === false ?
                                            <Text>{props.getData("currentScenario").scenarioName}</Text>
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button>{props.getData("currentScenario").scenarioName}</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {{
                                                                props.scenariosCompare.includes(element.scenarioName) === true ?
                                                                    scenario_name = element.scenarioName  :
                                                                    scenario_name = null }
                                                                return <div>{scenario_name}</div>
                                                            })
                                                            }

                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        }
                                    </Td>
                                    <Td>
                                        {isPopover("startingDate") === false ?
                                            <Text>{props.getData("currentScenario").startingDate}</Text>
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button>{props.getData("currentScenario").startingDate}</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {{
                                                                props.scenariosCompare.includes(element.scenarioName) === true ? x = element.scenarioName + ":" + element.startingDate  :
                                                                   x = null }
                                                               return <div>{x}</div>
                                                            })
                                                            }
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        }
                                    </Td>
                                    <Td>
                                        {isPopover("startingTime") === false ?
                                            <Text>{props.getData("currentScenario").startingTime}></Text>
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button>{props.getData("currentScenario").startingTime}</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {
                                                                return <Text>{element.scenarioName}: {element.startingTime}</Text>
                                                            })
                                                            }
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        }
                                    </Td>

                                    <Td>
                                        {isPopover("numberOfInstances") === false ?
                                            <Text>{props.getData("currentScenario").numberOfInstances}</Text>
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button>{props.getData("currentScenario").numberOfInstances}</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {
                                                                return <Text>{element.scenarioName}: {element.numberOfInstances}</Text>
                                                            })
                                                            }
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        }
                                    </Td>
                                    <Td>
                                        {isPopover("distributionType") === false ?
                                            <Text>{props.getData("currentScenario").interArrivalTime.distributionType}</Text>
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button>{props.getData("currentScenario").interArrivalTime.distributionType}</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {
                                                                return <Text>{element.scenarioName}: {element.interArrivalTime.distributionType}</Text>
                                                            })
                                                            }
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        }
                                    </Td>
                                    <Td>
                                        {isPopover("distribution") === false ?
                                            props.getData("currentScenario").interArrivalTime.values.map((el) => {
                                                return <Text>{el.id} : {el.value}</Text>
                                            })
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button> {props.getData("currentScenario").interArrivalTime.values.map((elem, index) => {
                                                        return <Text> {elem.id} : {elem.value} ⠀</Text>
                                                    })}</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {
                                                                return <Text
                                                                    fontWeight={"bold"}>{element.scenarioName}: {element.interArrivalTime.values.map((distribution) => {
                                                                    return <Text
                                                                        fontWeight={"light"}> {distribution.id} : {distribution.value} </Text>
                                                                })} </Text>
                                                            })
                                                            }
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>

                                        }
                                    </Td>
                                    <Td>
                                        {isPopover("timeUnit") === false ?
                                            <Text>{props.getData("currentScenario").timeUnit}</Text>
                                            :
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Text><Highlight
                                                        query={props.getData("currentScenario").timeUnit}
                                                        styles={getColor("timeUnit")}>{props.getData("currentScenario").timeUnit}</Highlight></Text>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='#dce5e6'>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverBody>
                                                            {props.getData("allScenarios").map((element) => {
                                                                return <Text>{element.scenarioName}: {element.timeUnit}</Text>
                                                            })
                                                            }
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        }
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>

                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Resource Overview</Heading>
                    </CardHeader>
                    <CardBody>
                        <Table variant='simple'>
                            <Thead w="100%">
                                <Tr>
                                    <Th>Department</Th>
                                    <Th>Role</Th>
                                    <Th>Cost</Th>
                                    <Th>Number</Th>
                                    <Th>Timetable</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                    return <Tr>
                                        <Td style={getColorRes("id", element.id)}>{element.id}</Td>

                                        <Td style={getColRoles("resource")}> {element.resources.map((resource) => {
                                            return <Text style={getTextColor("resource", resource.id)}
                                                         onClick={() => props.setResource(resource.id)}> {resource.id} </Text>
                                        })} </Td>
                                        <Td>costHour</Td>
                                        <Td style={getColorRes("numberOfInstances", element.numberOfInstances)}>{element.numberOfInstances}</Td>
                                        <Td style={getColorRes("schedule", element.schedule)}>{element.schedule}</Td>
                                    </Tr>
                                })}

                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}


export default OverviewPage;