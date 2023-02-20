import React, { useEffect } from 'react'
import { useToast, Box, Heading, Text, Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, Radio, RadioGroup, Stack, Button, CardHeader, TableContainer } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

const ScenarioPage = ({ setSelectedScenario, setCurrent, getData, setData, selectedScenario }) => {
    const toast = useToast();

    // Run once when the component mounts to set selected scenario and set currentPage
    // setCurrent is important for displaying the right editorsidebar on the right side
    useEffect(() => {
        setSelectedScenario(0)
        setCurrent("Edit Scenario")  
    }, [])

    // Define a function to delete a scenario
    const deleteScenario = (index) => {
        let data = [...getData("allScenario")];

        // ensure that at least one scenario exist
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
        
            <Box h="93vh" p="5" overflowX="auto">
                <Stack spacing={5}>
                    <Card bg="white" w="100%"  >
                        <CardBody >
                            <CardHeader>
                                <Heading size='md'>Select Scenario</Heading>
                            </CardHeader>
                            <TableContainer>
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
                                </TableContainer>
  
                        </CardBody>
                    </Card>
                   
                </Stack>
            </Box>
            
        );
    }


export default ScenarioPage;
