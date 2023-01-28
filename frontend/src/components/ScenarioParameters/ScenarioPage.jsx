import React, { useEffect, useState } from 'react'
import { useToast, Flex, Box, Heading, Text, Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, Radio, RadioGroup, TableContainer, Stack, Button } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

const ScenarioPage = (props) => {
    const [selectedScenario, setSelectedScenario] = useState(0);
    const toast = useToast();

    useEffect(() => {
        props.setSelectedScenario(0)
        props.setCurrent("Edit Scenario")  
    }, [])

    const deleteScenario = (index) => {
        let data = [...props.getData("allScenario")];

        if (data.length > 1) {
            data.splice(index, 1);
            props.setData(data);
        } else {
            toast({
                title: 'Cannot delete only scenario',
                description: "There must be at least one scenario.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <Flex>
            <Box h="93vh" overflowY="auto" p="5">
                <Stack spacing={5}>
                    <Card bg="white">
                        <CardBody>
                            <Heading size='md'>Select Scenario</Heading>
                
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th></Th>
                                            <Th>Name</Th>
                                            <Th>Starting date</Th>
                                            <Th>Starting time</Th>
                                            <Th>Replications</Th>
                                            <Th>Interarrival time distribution</Th>
                                            <Th>Distribution data</Th>
                                            <Th>Time Unit</Th>
                                            <Th>Currency</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {props.getData("allScenarios") ?
                                            props.getData("allScenarios").map((scenario, index) => {
                                                return <Tr key={index}>
                                                    <Td>
                                                        <RadioGroup value={selectedScenario} onChange={() => { setSelectedScenario(index); props.setCurrent("Edit Scenario"); props.setSelectedScenario(index) }}>
                                                            <Radio value={index} colorScheme="green"></Radio>
                                                        </RadioGroup>
                                                    </Td>
                                                    <Td>{scenario.scenarioName}</Td>
                                                    <Td>{scenario.startingDate}</Td>
                                                    <Td>{scenario.startingTime}</Td>
                                                    <Td>{scenario.numberOfInstances}</Td>
                                                    <Td>{scenario.interArrivalTime.distributionType}</Td>
            
                                                    <Td>{scenario.interArrivalTime.values.map((value) => {return <Text>{value.id + ": " + value.value}</Text>})}</Td>
                                                    <Td>{scenario.timeUnit}</Td>
                                                    <Td>{scenario.currency}</Td>
                                                    
                                                    <Td> 
                                                        <Button colorScheme="gray" variant="ghost" onClick={() => deleteScenario(index)}><DeleteIcon color="gray" /></Button>
                                                    </Td>
                                                </Tr>
                                            })
                                        : ""}
                                    </Tbody>
                                </Table>    
                        </CardBody>
                    </Card>
                   
                </Stack>
            </Box>
            </Flex>
        );
    }


export default ScenarioPage;
