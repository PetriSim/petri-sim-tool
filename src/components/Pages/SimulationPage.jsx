import React from "react";
import {
    Flex, Heading, Card, CardHeader, CardBody, Text, Select, Stack
} from '@chakra-ui/react';
import { FiChevronDown, FiChevronsDown, FiFile, FiFilePlus, FiMenu, FiUnderline } from 'react-icons/fi';
import ScenarioSwitcher from "../Navigation/ScenarioSwitcher";


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
                            <ScenarioSwitcher currentScenario={props.currentScenario} setScenario={props.setScenario} scenarios={props.scenarios} data={props.data}  />
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