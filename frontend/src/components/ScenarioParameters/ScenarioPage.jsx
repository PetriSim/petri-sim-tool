import React, { useEffect } from 'react'
import { useToast, Flex, Box, Heading, Text, Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, Radio, RadioGroup, TableContainer, Stack, Button, CardHeader } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

const ScenarioPage = ({ setSelectedScenario, setCurrent, getData, setData, selectedScenario }) => {
    const toast = useToast();

    useEffect(() => {
        setSelectedScenario(0)
        setCurrent("Edit Scenario")  
    }, [])

    const deleteScenario = (index) => {
        let data = [...getData("allScenario")];

        if (data.length > 1) {
            data.splice(index, 1);
            setData(data);
            setSelectedScenario(0)
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
            <Box h="93vh" p="5">
                <Stack spacing={5}>
                    <Card bg="white" >
                        <CardBody >
                            <CardHeader>
                                <Heading size='md'>Select Scenario</Heading>
                            </CardHeader>
     
                                <Table variant='simple' size="sm">
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
                                        {getData("allScenarios") ?
                                            getData("allScenarios").map((scenario, index) => {
                                                return <Tr key={index}>
                                                    <Td>
                                                        <RadioGroup value={selectedScenario} onChange={() => { setCurrent("Edit Scenario"); setSelectedScenario(index) }}>
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
