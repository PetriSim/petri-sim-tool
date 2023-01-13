import {
    Button,
    Spacer,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';

import {React} from 'react'
import {Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom";



function OverviewPage(props) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    let y, y_time, y_date, y_repl;
   /* if (props.getData("currentScenario") in props.getData("allScenarios")) {
        y = <Text> {props.getData("currentScenario").scenarioName} </Text>
    } else {
        y = <Text color='tomato'> {props.getData("currentScenario").scenarioName} </Text>
    }*/
   let x, repl = new Boolean(false);
   let st_time = new Boolean(false);
   let st_date = new Boolean(false);
    /* let y = new Boolean(false); */

    {props.getData("allScenarios").map((element) => {
        if (props.getData("currentScenario").scenarioName !== element.scenarioName) {
            x = true }
        else {
            x = false}
        if (props.getData("currentScenario").startingDate !== element.startingDate) {
            st_date = true }
        else {
            st_date = false}
        if (props.getData("currentScenario").startingTime !== element.startingTime) {
            st_time = true }
        else {
            st_time = false}
        if (props.getData("currentScenario").numberOfInstances !== element.numberOfInstances) {
            repl = true }
        else {
            repl = false}
    })}
     if (x === true) {
        y = <Text color='tomato'> {props.getData("currentScenario").scenarioName} </Text>
    } else {
        y = <Text> {props.getData("currentScenario").scenarioName} </Text>
    }

    if (st_date === true) {
        y_date = <Text color='tomato'> {props.getData("currentScenario").startingDate} </Text>
    } else {
        y_date = <Text> {props.getData("currentScenario").startingDate} </Text>
    }

    if (st_time === true) {
        y_time = <Text color='tomato'> {props.getData("currentScenario").startingTime} </Text>
    } else {
        y_time = <Text> {props.getData("currentScenario").startingTime} </Text>
    }

    if (repl === true) {
        y_repl = <Text color='tomato'> {props.getData("currentScenario").numberOfInstances} </Text>
    } else {
        y_repl = <Text> {props.getData("currentScenario").numberOfInstances} </Text>
    }


    return (
        <>

            <Stack direction='row' spacing={4} w="70vw">
                <Button as={Link} to="/overview"
                        colorScheme='#ECF4F4'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color='#6E6E6F'
                        onClick={onOpen}
                        _hover={{bg: '#B4C7C9'}}>
                    Go back
                </Button>
                <Spacer/>
                <Spacer/>
                <Button colorScheme='white'
                        variant='outline'
                        border='1px'
                        borderColor='#B4C7C9'
                        color='#6E6E6F'
                        _hover={{bg: '#B4C7C9'}}>
                    Show differences
                </Button>
                <Button colorScheme='white'
                        variant='outline'
                        border='1px'
                        color='#6E6E6F'
                        borderColor='#B4C7C9'
                        _hover={{bg: '#B4C7C9'}}>
                    Add new scenario
                </Button>
            </Stack>
            <Card bg="white" w="70vw" mt="25px">
                <CardHeader>
                    <Heading size='md'>Simulation Overview</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
                        <Thead w="100%">
                            <Tr>
                                <Th>Simalation</Th>
                                <Th>Starting date</Th>
                                <Th>Starting time</Th>
                                <Th>Replications</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                            <Td>{y} </Td>
                            <Td>{y_date}</Td>
                            <Td>{y_time}</Td>
                            <Td>{y_repl}</Td>
                        </Tr>
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>

        </>
    )
}


export default OverviewPage;