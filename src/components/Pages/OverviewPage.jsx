import {Button, Spacer, Stack} from '@chakra-ui/react';
import {React, useState} from 'react'
import OverviewTable from '../Background/OverviewTable';
import { Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import TabBar from "../Background/TabBar";
import OverviewResourceTable from "../Background/OverviewResourceTable";
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
            <Stack direction='row' spacing={4} ml="40px" mt="25px" w="70vw" >
                <Button colorScheme='#ECF4F4'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color ='#6E6E6F'
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
            <Card bg="white" w="70vw" ml="40px" mt="25px" >
                <CardHeader>
                    <Heading size='md'>Scenario Overview</Heading>
                </CardHeader>
                <CardBody>
                    <OverviewTable pt/>
                </CardBody>
            </Card>
            <Stack direction='row' ml="40px" mt="25px" w="70vw" >
                <TabBar items={tabs}/>
            </Stack>
            <Card bg="white" w="70vw" ml="40px" mt="25px" >
                <CardHeader>
                    <Heading size='md'>Resource Overview</Heading>
                </CardHeader>
                <CardBody>
                    <OverviewResourceTable/>
                </CardBody>
            </Card>
            {props.data}
        </>
    )
}


export default OverviewPage;