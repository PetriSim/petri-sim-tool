import {
    Button,
    Spacer,
    Stack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Card, CardHeader, CardBody, Heading, Box
} from '@chakra-ui/react'


import {useState} from 'react'
import React from "react";
import {Switch} from '@chakra-ui/react'

import OverviewTable from '../TablesOverviewComparison/ScenarioOverviewTable';
import TabBar from "../TabBar";

import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom";

import OverviewResourceTable from "../TablesOverviewComparison/OverviewResourceTable";


import ModelBasedOverview from "../TablesOverviewComparison/ModelBasedOverview";


function OverviewPage(props) {

    // declaration of variables
    const {isOpen, onOpen, onClose} = useDisclosure()
    //const [setTabIndex] = useState(0)
    let [switches, setSwitches] = useState([]);
    const [switches_temp] = useState([]);
    const [switchList, setSwitchList] = useState([]);

    // method to handle changing switch state for scnearios comparison
    const handleChange = (id) => {
        setSwitches(switches.map(item => {
            if (item.id === id) {
                item.value = !item.value;
                if (switchList.includes(id)) {
                    setSwitchList(switchList.filter(id => id !== id));
                } else {
                    setSwitchList([...switchList, id]);
                }
            }
            return item;
        }))
    };

    // Array to store temporarily which switches are turned on => which scenarios are we comparing
    switches_temp.length = 0
    props.getData("allScenarios").map((element) => {
        switches_temp.push({id: element.scenarioName, value: true})
    });

// method to display on modal window(which scenarios are we comparing) every scenario except of current one
    const handleRemove = (idToRemove) => {
        const index = switches_temp.findIndex(item => item.id === idToRemove);
        if (index > -1) {
            switches_temp.splice(index, 1);
        }
    }

    handleRemove(props.getData("currentScenario").scenarioName);
    switches = switches_temp

//set switch list. In order to use the data(id of comparing scenarios on other pages
    props.setScenariosCompare(switchList)

    return (
        <>
            {/*Button Compare scenarios*/}
            <Box h="93vh" overflowY="auto" p="5">
                <Stack direction='column' spacing={4}>
                    <Stack direction='row' spacing={4}>
                        <Button colorScheme='#ECF4F4'
                                variant='outline'
                                border='1px'
                                borderColor='#B4C7C9'
                                color='#6E6E6F'
                                onClick={onOpen}
                                _hover={{bg: '#B4C7C9'}}>
                            Compare scenarios
                        </Button>
                        <Spacer/>
                        <Spacer/>
                        {/*Button Add new scenario*/}
                        <Button as={Link} to="/scenario"
                                colorScheme='white'
                                variant='outline'
                                border='1px'
                                borderColor='#B4C7C9'
                                color='#6E6E6F'
                                onClick={() => '/scenario'}
                                _hover={{bg: '#B4C7C9'}}>
                            Add new scenario
                        </Button>
                        {/*Modal window(Window which opens on top of the page content to choose
                         which scenarios are we comparing) and its functionlaity*/}
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Scenarios to compare</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <Flex direction="column" align="left">
                                        {/*Creating Switch list(scenarios to compare) dynamically*/}
                                        {switches.map((switch1) => (
                                            <Switch
                                                key={switch1.id}
                                                checked={switch1.value}
                                                onChange={() => handleChange(switch1.id)}
                                                isChecked={switchList.includes(switch1.id)}
                                                marginTop="1rem">
                                                {switch1.id}
                                            </Switch>
                                        ))}
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose} as={Link} to="/compare">
                                        Compare
                                    </Button>
                                    <Button variant='ghost' onClick={onClose}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        {/*Button Edit*/}
                        <Button as={Link} to="/scenario"
                                colorScheme='white'
                                variant='outline'
                                border='1px'
                                borderColor='#B4C7C9'
                                color='#6E6E6F'
                                _hover={{bg: '#B4C7C9'}}>
                            Edit
                        </Button>
                    </Stack>
                    {/*Scenario Overview respresentation*/}
                    {/*Card is used to display tables on white background*/}
                    <Card bg="white" mt="25px">
                        <CardHeader>
                            <Heading size='md'>Simulation Scenarios Overview</Heading>
                        </CardHeader>
                        <CardBody>
                            {/*Call of Scenario Overview Table*/}
                            <OverviewTable getSimulData={props.getData}/>
                        </CardBody>
                    </Card>
                    {/*Tabbar to switch between different scenarios*/}
                    <TabBar
                        //onClick={(index) => setTabIndex(index)}
                        items={props.getData("allScenarios").map((element, index) => {
                            return {
                                tabname: element.scenarioName,
                                content:
                                    <>
                                        <Card bg="white" mt="25px">
                                            <CardHeader>
                                                <Heading size='md'>Resource Overview</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                {/*Call of ResourceParameter Table*/}
                                                < OverviewResourceTable getResourceData={props.getData}
                                                                        scenario_id={index}/>
                                            </CardBody>
                                        </Card>
                                        {/*Tabbar to switch between different bpmns within one scenario*/}
                                        <TabBar
                                            items={props.getData("allModels").models.map((element, index_bpmn) => {
                                                return {
                                                    tabname: element.name,
                                                    content:
                                                    // Call of Model-based Table
                                                        < ModelBasedOverview getModelData={props.getData}
                                                                             scenarioId={index} bpmn_id={index_bpmn}
                                                                             parsed={props.parsed}/>
                                                }
                                            })}/>
                                    </>

                            }
                        })}/>
                </Stack>
            </Box>
        </>
    )
}


export default OverviewPage;