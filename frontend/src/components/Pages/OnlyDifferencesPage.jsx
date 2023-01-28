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
    Box
} from '@chakra-ui/react';


import {React} from 'react'
import {Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom";


function OnlyDifferencesPage(props) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    let i, notsameScenario = [], notsameRes = [], valueRes = [];
    // let y, y_time, y_date, y_repl;

    /*/!* if (props.getData("currentScenario") in props.getData("allScenarios")) {
         y = <Text> {props.getData("currentScenario").scenarioName} </Text>
     } else {
         y = <Text color='tomato'> {props.getData("currentScenario").scenarioName} </Text>
     }*!/
    let x, repl = new Boolean(false);
    let st_time = new Boolean(false);
    let st_date = new Boolean(false);

    /!* let y = new Boolean(false); *!/*/


    let array_dif = props.scenariosCompare.concat(props.getData("currentScenario").scenarioName)




    const getColor = (field_id) => {
        if (notsameScenario.includes(field_id)) {
            return {backgroundColor: '#dce5e6'};
        } else {
            return {backgroundColor: 'white'};
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
        if ( notsameRes.includes(field_id) && valueRes.includes(value_res) ) {
            return {backgroundColor: '#dce5e6'};
        } else {
            return {backgroundColor: 'white'};
        }
    }

    const getTextColor = (field_id, value_res) => {
        if ( notsameRes.includes(field_id) && valueRes.includes(value_res) ) {
            return {color: '#6d0d06'};
        } else {
            return {color: 'black'};
        }
    }


  /*  {
        props.getData("allScenarios").map((element) => {
            if (props.getData("currentScenario").scenarioName !== element.scenarioName) {
                x = true
            } else {
                x = false
            }
            if (props.getData("currentScenario").startingDate !== element.startingDate) {
                st_date = true
            } else {
                st_date = false
            }
            if (props.getData("currentScenario").startingTime !== element.startingTime) {
                st_time = true
            } else {
                st_time = false
            }
            if (props.getData("currentScenario").numberOfInstances !== element.numberOfInstances) {
                repl = true
            } else {
                repl = false
            }
        })
    }
    if (x === true) {
        y = <Text color='tomato'> {props.getData("currentScenario").scenarioName} </Text>
    } else {
        y = <Text> {props.getData("currentScenario").scenarioName} </Text>
    }

    if (st_date === true) {
        y_date = <Text color='tomato'> {props.getData("currentScenario").startingDate} </Text>
    } else {
        y_date = <Text> {props.getData("currentScenario").startingDate} </Text>
    }

    if (st_time === true) {
        y_time = <Text color='tomato'> {props.getData("currentScenario").startingTime} </Text>
    } else {
        y_time = <Text> {props.getData("currentScenario").startingTime} </Text>
    }

    if (repl === true) {
        y_repl = <Text color='tomato'> {props.getData("currentScenario").numberOfInstances} </Text>
    } else {
        y_repl = <Text> {props.getData("currentScenario").numberOfInstances} </Text>
    }
*/
    // let current_data = props.getData("currentScenario")
    notsameScenario.length = 0


  /*  {props.getResourceData("allScenarios").resourceParameters.roles.map((element) => {
        {props.getData("currentScenario").resourceParameters.roles.map((current_element) => {
            if (element.id !== current_element.id) {
                array_resource.push("id")
                value_r.push(current_element.id)
            }


        }) }

    }) }*/


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
        } else { }

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
        } else { }
        }




    return (
        <>
            {array_dif}
            <Box h="93vh" overflowY="auto" p="5">
                <Stack direction='row' spacing={4} w="70vw">
                    <Button as={Link} to="/compare"
                            colorScheme='#ECF4F4'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={onOpen}
                            _hover={{bg: '#B4C7C9'}}>
                        Go back
                    </Button>
                    <Button as={Link} to="/overview"
                            colorScheme='#ECF4F4'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={onOpen}
                            _hover={{bg: '#B4C7C9'}}>
                        To overview
                    </Button>
                    <Spacer/>
                    <Spacer/>
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
                        <Table variant='simple' w="100%">
                            <Thead w="100%">
                                <Tr>
                                    <Th>Parameter/Scenario</Th>
                                    {array_dif.map((element) => {
                                      return  <Th  letterSpacing="1px" >{element}</Th>
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                   <Td></Td>

                                </Tr>

                                {/*  <Tr>
                            <Td style={this.getColor(row.value)}>{y} </Td>
                            <Td>{y_date}</Td>
                            <Td>{y_time}</Td>
                            <Td>{y_repl}</Td>
                        </Tr>*/}
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
                                <Td style={getColorRes("id", element.id )}>{element.id}</Td>

                                <Td style={getColRoles("resource")}> {element.resources.map((resource) => {
                                return <Text style={getTextColor("resource", resource.id )} onClick={() => props.setResource(resource.id)}> {resource.id} </Text>
                            })} </Td>
                                <Td>costHour</Td>
                                <Td style={getColorRes("numberOfInstances", element.numberOfInstances )}>{element.numberOfInstances}</Td>
                                <Td style={getColorRes("schedule", element.schedule )}>{element.schedule}</Td>
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


export default OnlyDifferencesPage;