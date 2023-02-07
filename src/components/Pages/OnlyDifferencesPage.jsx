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

    const [tableNames, setTableNames] = useState([
        {id: "startingDate", value: 'Starting date'},
        {id: "startingTime", value: 'Starting time'},
        {id: "numberOfInstances", value: 'Replications'},
        {id: "distributionType", value: 'Inter-arrival time: distribution'},
        {id: "distribution", value: 'Distribution data'},
        {id: "timeUnit", value: 'Time Unit'},
        {id: "currency", value: 'Currency'},
    ]);

    let x, a, array = [], outputData = [], scenTableNames = [], prevScenario, newColumn = []
    let last_scenario = props.getData("allScenarios").length

    prevScenario = props.getData("allScenarios")[0].scenarioName
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


/*
    distinctArray.map((element) => {
        tableNames.map((names) => {
            if (element === names.id) {
                // array.push(names.value)
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
                            if (element === "distributionType") {
                                newItem = {
                                    id: element1.scenarioName,
                                    field: element1.interArrivalTime.distributionType,
                                    field_name: names.id,
                                    value: names.value
                                };
                            }
                            if (element === "distribution") {
                                element1.interArrivalTime.values.map((distrData) => {
                                    let distibutionData = distrData.id + ":" + distrData.value
                                    temp.push(distibutionData)
                                })
                                newItem = {
                                    id: element1.scenarioName,
                                    field: temp,
                                    field_name: names.id,
                                    value: names.value
                                };
                            } else {
                                newItem = {
                                    id: element1.scenarioName,
                                    field: element1[names.id],
                                    field_name: names.id,
                                    value: names.value
                                };
                            }
                            outputData.push(newItem);
                            temp.push(newItem)
                            prevScenario = element1.scenarioName
                            if (element1.scenarioName === props.getData("currentScenario").scenarioName) {
                                newColumn = {
                                    id: props.getData("currentScenario").scenarioName,
                                    data: temp
                                }
                              //  Colomns.push(newColumn)
                                temp.length = 0
                            }

                        }
                    }
                )
            }
        })
        })
*/


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
         {outputData.map((element1) => {
                return <>
                    <Text>{element1.value}</Text>
                    <Text>{element1.field}</Text>
                </>
            })}
==================

            ==========
            {Colomns.map((column) => {
                return <Text>{column.id}</Text>
            })}

            {Colomns.map((column) => {
                column.data.map((col)  => {
                return <Text>{col}</Text>
            })
            })}
==========================
        {array_dif.map((element) => {
                return <Text>{element}</Text>
            })}

           {/* {distinctArray.map((element) => {
                tableNames.map((names) => {
                    element === names.id ? x = names.value
                        : x = null
                })
                return <Text>{x}</Text>
            })}*/}

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
                                        return <Th letterSpacing="1px">{element}</Th>
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                           {/*   {Colomns.map((element) => {
                                   return <Tr>
                                        <Td>{element.id}</Td>
                                        {outputData.map((data1) => {
                                            if (data1.id === element.id) {
                                         return <>  <Td>>{data1.field}</Td>
                                         </>}
                                        })}

                                    </Tr>
                                })}
                                {
                                ))}

                                  // {array_dif.map((scenarioName) => {
                                   // return <Tr><Td>{fillScenDiff(scenarioName)}</Td> </Tr>
                               // })}

                                /!*{distinctArray.map((parameter) => {
                                    array = tableNames.find(item => item.id === parameter)
                                    if (array !== undefined) {
                                        return <Tr>
                                            <Td>{array.value}</Td>
                                        </Tr>
                                        {
                                            outputData.map((scenarioElement) => {

                                            })
                                        }
                                    }

                                })}

                           /*    {outputData.map((element1) => {
                                 return <Tr>
                                                <Td>{element1.value}</Td>
                                                {/!*<Td>{element1.field}</Td>*!/}
                                                </Tr>
                                    })}*/}
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

                            </Thead>
                            <Tbody>


                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Box>
        </>
    )

}


export default OnlyDifferencesPage;