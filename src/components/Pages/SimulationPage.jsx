import React from "react";
import {
    Flex, Heading, Card, CardHeader, CardBody, Text, Select, Stack, Button,Progress, Box, Textarea
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';


function SimulationPage(props){
    return (
        <Stack gap="2">
        <Heading size='lg' >Run Simulation</Heading>
        <Card bg="white" p="5" >
            <Progress hasStripe value={64} colorScheme="green" />
        </Card>
            <Card bg="white">
                <CardHeader>
                    <Heading size='ms'> Simulation settings </Heading>
                </CardHeader>
                <CardBody>
                  
                    <Flex
                        gap="5"
                        flexDirection="row"
                        alignItems="end"
                        mt="-4"
                        >               
                            <Box>
                                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select scenario:</Text>
                                <Select placeholder = 'choose scenario' width = '100%' color="darkgrey" backgroundColor= 'white' icon={<FiChevronDown />}>
                                {props.data.map((scenario, index) => {
                                return  <option value= {scenario.scenarioName} onClick={() =>  props.setScenario(index)}>{scenario.scenarioName}</option>
                                })}
                                </Select>
                            </Box>
                            <Box>
                                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select simulator:</Text>
                                <Select placeholder = 'choose simulator' width = '100%' color="darkgrey"  backgroundColor= 'white' icon={<FiChevronDown />}>
                                    <option value='Simod'>Simod</option>
                                    <option value='Option 2'>Option 2</option>
                                    <option value='Option 3'>Option 3</option>
                                </Select>
                            </Box>

                            <Button variant="outline" bg="#FFFF">
                                <Text color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">Start Simulation</Text>
                            </Button>

                            <Button variant="outline" bg="#FFFF">
                                <Text color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">Abort Simulation</Text>
                            </Button>

                        </Flex>
                </CardBody>
            </Card>

            <Card bg="white">
                <CardHeader>
                    <Heading size='ms'> Simulator feedback </Heading>
                </CardHeader>
                <CardBody>
                    <Textarea isDisabled placeholder='Data from scylla' />
                </CardBody>
            </Card>
            
        
            
        </Stack>
    )
}
export default SimulationPage;