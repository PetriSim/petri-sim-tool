import React from "react";
import {
    Flex, Heading, Card, CardHeader, CardBody, Text, Select, Stack, Button,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';


function SimulationPage(props){
    return (
        <>
            <Heading size='md'>Run Simulation</Heading>
            <Card bg="white" w="70vw" mt="25px" >
                <CardHeader>
                    <Heading size='ms'> Simulation settings </Heading>
                </CardHeader>
                <CardBody>
                    <Stack direction='row'>                    
                        <Flex
                        alignItems="left"
                        flexDir="column"
                        >
                            <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select scenario:</Text>
                            <Select placeholder = 'choose scenario' width = '100%' color="darkgrey" focusBorderColor='teal' backgroundColor= 'white' icon={<FiChevronDown />}>
                            {props.data.map((scenario, index) => {
                             return  <option value= {scenario.scenarioName} onClick={() =>  props.setScenario(index)}>{scenario.scenarioName}</option>
                            })}
                            </Select>
                        </Flex>
                        <Flex
                        alignItems="left"
                        flexDir="column"
                        >
                            <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select simulator:</Text>
                            <Select placeholder = 'choose simulator' width = '100%' color="darkgrey" focusBorderColor='teal' backgroundColor= 'white' icon={<FiChevronDown />}>
                                <option value='Simod'>Simod</option>
                                <option value='Option 2'>Option 2</option>
                                <option value='Option 3'>Option 3</option>
                            </Select>
                        </Flex>
                        <Flex
                        alignItems="left"
                        flexDir="column"
                        >
                            <gap></gap>
                            <Button boxShadow='sm'
                            rounded = 'md'
                            backgroundColor="white"
                            alignItems="center"
                            flexDir="column"
                            fontSize="sm" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" border={'grey'}>
                                Start Simulation
                            </Button>
                        </Flex>
                        <Flex
                        alignItems="left"
                        flexDir="column"
                        >
                            <gap></gap>
                            <Button boxShadow='sm'
                            rounded = 'md'
                            backgroundColor="white"
                            alignItems="center"
                            flexDir="column"
                            fontSize="sm" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" border={'grey'}>
                                Abort Simulation
                            </Button>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card>

            <Card bg="white" w="70vw" mt="25px" >
                <CardHeader>
                    <Heading size='ms'> Simulator feedback </Heading>
                </CardHeader>
                <CardBody>
                </CardBody>
            </Card>
            
        
            {props.data[props.currentScenario].scenarioName}
        </>
    )
}
export default SimulationPage;