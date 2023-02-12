import {
    Button,
    Spacer,
    Stack,
    Text,
    Flex,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Card, CardHeader, CardBody, Heading, Box
} from '@chakra-ui/react'


import {React, useState} from 'react'
import { Switch } from '@chakra-ui/react'

import OverviewTable from '../TablesOverviewComparison/ScenarioOverviewTable';
import TabBar from "../TabBar";

import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom";

import OverviewResourceTable from "../TablesOverviewComparison/OverviewResourceTable";


import ModelBasedOverview from "../TablesOverviewComparison/ModelBasedOverview";


function OverviewPage(props) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [tabIndex, setTabIndex] = useState(0)
    const [isChecked, setIsChecked] = useState(false);
    let [switches, setSwitches] = useState([]);
    const [switches_temp] = useState([]);
    const [switchList, setSwitchList] = useState([]);

    const handleChange = (id) => {
        setSwitches(switches.map(item => {
            if (item.id === id) {
                item.value = !item.value;
                if (switchList.includes(id)){
                setSwitchList(switchList.filter(id => id !== id));
            }else{
                setSwitchList([...switchList, id]);
            }
        }
        return item;
    })) };

    switches_temp.length = 0
    props.getData("allScenarios").map((element) => {
        switches_temp.push({ id: element.scenarioName, value: true })
    });


    const handleRemove = (idToRemove) => {
        const index = switches_temp.findIndex(item => item.id === idToRemove);
        if (index > -1) {
            switches_temp.splice(index, 1);
                    }
    }

    handleRemove(props.getData("currentScenario").scenarioName);
    switches = switches_temp

    props.setScenariosCompare(switchList)

    return (
        <>
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
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Scenarios to compare</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <Flex direction="column" align="left">
                                    {switches.map((switch1) => (
                                        <Switch
                                            key={switch1.id}
                                            checked={switch1.value}
                                            onChange={() => handleChange(switch1.id)}
                                            isChecked={switchList.includes(switch1.id)}
                                            marginTop="1rem"  >
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
                        <Button as={Link} to="/scenario"
                                colorScheme='white'
                                variant='outline'
                                border='1px'
                                borderColor='#B4C7C9'
                                color='#6E6E6F'
                                _hover={{bg: '#B4C7C9'}}>
                            Edit
                        </Button>
                        <Button colorScheme='white'
                                variant='outline'
                                border='1px'
                                borderColor='#B4C7C9'
                                color='#6E6E6F'
                                _hover={{bg: '#B4C7C9'}}>
                            Delete scenario
                        </Button>
                    </Stack>
                    <Card bg="white" mt="25px">
                        <CardHeader>
                            <Heading size='md'>Scenario Overview</Heading>
                        </CardHeader>
                        <CardBody>
                            <OverviewTable getSimulData={props.getData}/>
                        </CardBody>
                    </Card>

                    <TabBar onClick={(index) => setTabIndex(index)}
                            items={props.getData("allScenarios").map((element, index) => {
                                return {
                                    tabname: element.scenarioName,
                                    content: <Card bg="white" mt="25px">
                                        <CardHeader>
                                            <Heading size='md'>Resource Overview</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            < OverviewResourceTable getResourceData={props.getData} scenario_id={index}/>
                                        </CardBody>
                                    </Card>
                                }
                            })}/>

                    <TabBar onClick={(index) => setTabIndex(index)}
                            items={props.getData("allModels").models.map((element, index) => {
                                return {
                                    tabname: element.name,
                                    content:
                                        < ModelBasedOverview getModelData={props.getData} bpmn_id={index} parsed={props.parsed}/>
                                }
                            })}/>


                </Stack>
            </Box>
        </>
    )
}


export default OverviewPage;