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
import OverviewTable from '../Background/ScenarioOverviewTable';
import { Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import TabBar from "../TabBar";
import { useDisclosure } from '@chakra-ui/react'
import { Link } from "react-router-dom";
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

import ModelBasedOverview from "../Background/ModelBasedOverview";


function OverviewPage(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>

            <Stack direction='row' spacing={4}  w="70vw" >
                <Button as={Link} to="/overview"
                        colorScheme='#ECF4F4'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
                        onClick={onOpen}
                        _hover={{ bg: '#B4C7C9' }}>
                        Go back
                </Button>
                <Spacer />
                <Spacer />
                <Button colorScheme='white'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
                        _hover={{ bg: '#B4C7C9' }}>
                    Show differences
                </Button>
                <Button colorScheme='white'
                        variant='outline'
                        border='1px'
                        color ='#6E6E6F'
                        borderColor='#B4C7C9'
                        _hover={{ bg: '#B4C7C9' }}>
                    Add new scenario
                </Button>
            </Stack>
            <Card bg="white" w="70vw" mt="25px" >
                <CardHeader>
                    <Heading size='md'>Simulation Overview</Heading>
                </CardHeader>
                <CardBody>
                    {props.getData("allScenarios").map((element) => {
                        <Text> {element.scenarioName} </Text>
                        if ( element.scenarioName !== props.getData("currentScenario").scenarioName ) {
                            return  <Text color='tomato'> {element.scenarioName} </Text>
                        }

                    })}
                </CardBody>
            </Card>
            <Stack direction='row' mt="25px" w="70vw" >
                <TabBar items={props.getData("allScenarios").map((element) => {
                        return {tabname: element.scenarioName,
                                content:  <Card bg="white" w="70vw" mt="25px" >
                                            <CardHeader>
                                                 <Heading size='md'>Resource Overview</Heading>
                                             </CardHeader>
                                            <CardBody>
                                                < OverviewResourceTable getResourceData = {props.getData} />
                                             </CardBody>
                                            </Card>

                                                       }

                        }) }/>
            </Stack>
            {/*< ModelBasedOverview getModelData = {props.getData} />*/}
        </>
    )
}


export default OverviewPage;