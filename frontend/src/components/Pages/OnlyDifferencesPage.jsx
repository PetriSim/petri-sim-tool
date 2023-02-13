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

/*import {

    TableBody,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TableCell,
} from "@chakra-ui/core";*/

import {React} from 'react'
import {Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react';
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom";


function OnlyDifferencesPage(props) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    let i, notsameScenario = [], notsameRes = [], valueRes = [], newItem = [], temp = [], first_scenario, Colomns = [];
    // let y, y_time, y_date, y_repl;
    let department
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
    const diffScenParam = props.notSameScenario
    const distinctArray = [...new Set(props.notSameScenario)];
    const distinctResource = [...new Set(props.resourceCompared.map(JSON.stringify))].map(JSON.parse);
    ;
    // const [arrayDiff, setArrayDiff] = useState([]);

    console.log(distinctResource)
    const [tableNames, setTableNames] = useState([
        {id: "startingDate", value: 'Starting date'},
        {id: "startingTime", value: 'Starting time'},
        {id: "numberOfInstances", value: 'Replications'},
        {id: "distributionType", value: 'Inter-arrival time: distribution'},
        {id: "distribution", value: 'Distribution data'},
        {id: "timeUnit", value: 'Time Unit'},
        {id: "currency", value: 'Currency'},
    ]);

    const [tableNamesRes] = useState([
        // {id: "department", value: 'Department'},
        {id: "id", value: 'Resource'},
        {id: "numberOfInstances", value: 'Quantity'},
        {id: "costHour", value: 'Costs'},
        {id: "schedule", value: 'Timetable'},
        {id: "currency", value: 'Currency'},
    ]);

    let x, a, array = [], outputData = [], scenTableNames = [], prevScenario, newColumn = [], test, newRow = [],
        newRowRes = []
    let last_scenario = props.getData("allScenarios").length

    prevScenario = props.getData("allScenarios")[0].scenarioName

    const different_array = props.getData("allScenarios").filter(item => array_dif.includes(item.scenarioName))

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
    console.log(props.resourceCompared)
    console.log(different_array)

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
    console.log(newRowRes)
    props.getData("allScenarios").map((element1) => {
        if (array_dif.includes(element1.scenarioName)) {
            if (prevScenario !== element1.scenarioName) {
                newColumn = {
                    id: prevScenario,
                    data: temp
                }
                Colomns.push(newColumn)
                temp.length = 0
            }

            distinctArray.map((element) => {
                tableNames.map((names) => {
                        if (element === names.id) {

                            newItem = {
                                id: element1.scenarioName,
                                field: element1[names.id],
                                field_name: names.id,
                                value: names.value
                            };

                            outputData.push(newItem);
                            temp.push(newItem)
                            prevScenario = element1.scenarioName

                        }
                    }
                )
            })

            if (element1.scenarioName === props.getData("allScenarios")[last_scenario - 1].scenarioName) {
                newColumn = {
                    id: element1.scenarioName,
                    data: temp
                }
                Colomns.push(newColumn)
                temp.length = 0
            }
        }

    })


    const fillScenDiff = (scenarioName) => {
        return scenTableNames.map((element1) => {
            let scenario = props.getData("allScenarios")[scenarioName]
            //let value = scenario[element1]
            return <Text>{scenario.scenarioName}</Text>
        })
    }
    distinctArray.map((element) => {
        tableNames.map((names) => {
            if (element === names.id) {
                let newItem = {
                    id: element,
                    field_name: names.value,

                };

                scenTableNames.push(newItem);
            }

        })
    })
    return (
        <>
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
                        <Heading size='md'>Different Parametrization - Simulation Scenarios</Heading>
                    </CardHeader>
                    <CardBody>
                        <Table variant='simple' w="100%">
                            <Thead w="100%">
                                <Tr>
                                    <Th>Parameter/Scenario</Th>
                                    {array_dif.map((element) => {
                                        return <Th letterSpacing="1px">{element}</Th>
                                    })}

                                </Tr>
                            </Thead>
                            <Tbody>
                                {newRow.map((table_name) => {
                                    //  if(Object.keys(different_array[0]).includes(table_name.id)){
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
                                    {array_dif.map((element) => {
                                        return <Th letterSpacing="1px">{element}</Th>
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
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