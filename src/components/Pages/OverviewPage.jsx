import {
    Flex,
    Button,
    Spacer,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import {React, useEffect, useState} from 'react'
import OverviewTable from '../Background/OverviewTable';
import { Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import TabBar from "../Background/TabBar";
import { useDisclosure } from '@chakra-ui/react'
import OverviewResourceTable from "../Background/OverviewResourceTable";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
 import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
 } from '@chakra-ui/react'


function OverviewPage(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [tabs] = useState([
        {
            tabname: "Scenario 1 ",
        },
        {
            tabname: "Scenario 2",
        },],
    )


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
                    Compare scenarious
                </Button>
                <Spacer />
                <Spacer />
                <Button colorScheme='white'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
                        _hover={{ bg: '#B4C7C9' }}>
                    Add new scenario
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Scenarious to compare</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='email-alerts' mb='0'>
                                    Scenario 1
                                </FormLabel>
                                <Switch id='email-alerts' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Compare</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Button colorScheme='white'
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
                                <OverviewTable scenarioData = {props.getData}/>
                </CardBody>
            </Card>
            <Stack direction='row' mt="25px" w="70vw" >
                <TabBar items={props.getData("allScenarios").map((element) => {
                        return {tabname: element.scenarioName} }) }/>
            </Stack>
            <Card bg="white" w="70vw" mt="25px" >
                <CardHeader>
                    <Heading size='md'>Resource Overview</Heading>
                    <Text>{props.getData("currentModel").parameters.roles.name}</Text>
                </CardHeader>
                <CardBody>
                   < OverviewResourceTable />
                </CardBody>
            </Card>

        </>
    )
}


export default OverviewPage;