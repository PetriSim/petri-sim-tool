import {
    Button,
    Spacer,
    Stack,
    FormControl,
    FormLabel,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Card, CardHeader, CardBody, Heading, Switch
 } from '@chakra-ui/react'


import {React, useState} from 'react'
import OverviewTable from '../Background/ScenarioOverviewTable';
import TabBar from "../TabBar";
import { useDisclosure } from '@chakra-ui/react'
import { Link } from "react-router-dom";

import OverviewResourceTable from "../Background/OverviewResourceTable";


import ModelBasedOverview from "../Background/ModelBasedOverview";


function OverviewPage(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tabIndex, setTabIndex] = useState(0)
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(prevIsChecked => !prevIsChecked);
    };

    return (
        <>
            <Stack direction='row' spacing={4}  w="70vw" >
                <Button colorScheme='#ECF4F4'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
                        onClick={onOpen}
                        _hover={{ bg: '#B4C7C9' }}>
                    Compare scenarios
                </Button>
                <Spacer />
                <Spacer />
                <Button as={Link} to="/scenario"
                        colorScheme='white'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
                        onClick={() => '/scenario'}
                        _hover={{ bg: '#B4C7C9' }}>
                    Add new scenario
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}  >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Scenarios to compare</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {props.getData("allScenarios").map((element) => {
                                return <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='email-alerts' mb='0'>
                                    {element.scenarioName}
                                </FormLabel>
                                <Switch id='email-alerts'  />
                            </FormControl>
                            })}
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
                        color ='#6E6E6F'
                        _hover={{ bg: '#B4C7C9' }}>
                    Edit
                </Button>
                <Button colorScheme='white'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
                        _hover={{ bg: '#B4C7C9' }}>
                    Delete scenario
                </Button>
            </Stack>
            <Card bg="white" w="70vw" mt="25px" >
                <CardHeader>
                    <Heading size='md'>Scenario Overview</Heading>
                </CardHeader>
                <CardBody>
                                <OverviewTable getSimulData = {props.getData}/>
                </CardBody>
            </Card>
            <Stack direction='row' mt="25px" w="70vw" >
                <TabBar onClick={(index) => setTabIndex(index)} items={props.getData("allScenarios").map((element, index) => {
                        return {tabname: element.scenarioName,
                                content:  <Card bg="white" w="70vw" mt="25px" >
                                            <CardHeader>
                                                 <Heading size='md'>Resource Overview</Heading>
                                             </CardHeader>
                                            <CardBody>
                                                < OverviewResourceTable getResourceData = {props.getData} scenario_id = {index} />
                                             </CardBody>
                                            </Card>

                                                       }

                        }) }/>
            </Stack>
           <Stack direction='row' mt="25px" w="70vw" >
                <TabBar onClick={(index) => setTabIndex(index)} items={props.getData("allModels").models.map((element, index) => {
                    return {tabname: element.name,
                            content:
                                 // < ModelBasedOverview getModelData = {props.getData} parsed={props.parsed} />
                                  < ModelBasedOverview getModelData = {props.getData} bpmn_id = {index}  parsed={props.parsed}/>


                    }
                }) }/>
            </Stack>

        </>
    )
}


export default OverviewPage;