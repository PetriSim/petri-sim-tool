import {
    Button,
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

import React from 'react'
import {Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import {useState} from 'react';
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom";


function OnlyDifferencesPage(props) {
    // declaration of variables
    const {onOpen,} = useDisclosure()
    let  newRow = [], newRowRes = []


   // table to store name of the Sumulation Scenario parameters which will be displayed to the user. Access by id
    const [tableNames] = useState([
        {id: "startingDate", value: 'Starting date'},
        {id: "startingTime", value: 'Starting time'},
        {id: "numberOfInstances", value: 'Replications'},
        {id: "distributionType", value: 'Inter-arrival time: distribution'},
        {id: "distribution", value: 'Distribution data'},
        {id: "timeUnit", value: 'Time Unit'},
        {id: "currency", value: 'Currency'},
    ]);

    // table to store name of the Resource parameters which will be displayed to the user. Access by if
    const [tableNamesRes] = useState([
        {id: "id", value: 'Resource'},
        {id: "numberOfInstances", value: 'Quantity'},
        {id: "costHour", value: 'Costs'},
        {id: "schedule", value: 'Timetable'},
        {id: "currency", value: 'Currency'},
    ]);

    // id of scenarios we are comparing
    let array_dif = props.scenariosCompare.concat(props.getData("currentScenario").scenarioName)
    // List of Simulation Scenario Parameters, valuer of which are different in compared scenarios
    const distinctArray = [...new Set(props.notSameScenario)];
    // List of Resource Parameters, valuer of which are different in compared scenarios
    const distinctResource = [...new Set(props.resourceCompared.map(JSON.stringify))].map(JSON.parse);
    ;

    // filter allScenarios to have only scenarios which we are comparing
    const different_array = props.getData("allScenarios").filter(item => array_dif.includes(item.scenarioName))

//creating corresponding Scenario parameters name for displaying(Find names only for parameters which are
// different in compared scenarios)
    distinctArray.map((element) => {
        tableNames.map((names) => {
            if (element === names.id) {
                let newI = {
                    id: names.id,
                    value: names.value
                }
                newRow.push(newI)
            }
        })
    })

//creating corresponding Resource parameters name for displaying(Find names only for parameters which are
// different in compared scenarios)
    distinctResource.map((element) => {
        tableNamesRes.map((names) => {
            if (element.field === names.id) {
                let newI = {
                    id: names.id,
                    value: names.value,
                    res_id: element.id,
                    element_value: element.value
                }
                newRowRes.push(newI)
            }
        })
    })
    return (
        <>
            {/*Button Go back*/}
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
                    {/*Button To overview*/}
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
                </Stack>
                {/*Card is used to display the table on white background*/}
                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Different Parametrization - Simulation Scenarios</Heading>
                    </CardHeader>
                    <CardBody>
                        <Table variant='simple' w="100%">
                            <Thead w="100%">
                                <Tr>
                                    <Th>Parameter/Scenario</Th>
                                    {/*Creating column name dynamically(Scenario Names we are comparing)*/}
                                    {array_dif.map((element) => {
                                        return <Th letterSpacing="1px">{element}</Th>
                                    })}

                                </Tr>
                            </Thead>
                            <Tbody>
                                {/*Filling in the table*/}
                                {newRow.map((table_name) => {
                                    return (<Tr>
                                            <Td>{table_name.value}</Td>
                                            {
                                                different_array.map((item) => {
                                                    if (table_name.id === 'distributionType') {
                                                        return <Td>{item.interArrivalTime.distributionType}</Td>
                                                    } else if (table_name.id === 'distribution') {
                                                        return (
                                                            <Td>{item.interArrivalTime.values.map((distr) => {
                                                                return <Text>{distr.id}: {distr.value} </Text>
                                                            })}</Td>)
                                                    } else
                                                        return <Td>{item[table_name.id]}</Td>

                                                })
                                            }
                                        </Tr>
                                    )
                                })
                                }
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
                {/*Card is used to display the table on white background*/}
                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Different Parametrization - Resources</Heading>
                    </CardHeader>
                    <CardBody>
                        <Table variant='simple'>
                            <Thead w="100%">
                                <Tr>
                                    <Th>Resource</Th>
                                    <Th>Parameter/Scenario</Th>
                                    {/*Creating column name dynamically(Scenario Names we are comparing)*/}
                                    {array_dif.map((element) => {
                                        return <Th letterSpacing="1px">{element}</Th>
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/*Filling in the table*/}
                                {newRowRes.map((table_name) => {
                                    //   if(Object.keys(different_array[0]).resourceParameters.resources.includes(table_name.id)){
                                    return (<Tr>
                                            <Td>{table_name.res_id}</Td>
                                            <Td>{table_name.value}</Td>
                                            {different_array.map((scenario) => {
                                                    return scenario.resourceParameters.resources.map((item) => {
                                                            if (table_name.res_id === item.id)
                                                                return <Td>{item[table_name.id]}</Td>
                                                        }
                                                    )
                                                }
                                            )}

                                        </Tr>

                                    )
                                })
                                }

                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Box>
        </>
    )

}


export default OnlyDifferencesPage;