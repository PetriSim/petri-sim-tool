import { Input, FormControl, FormLabelTable,
    Table,
    Thead,
    Tbody,
    Tfoot,Tr,Th,Td,
    TableContainer,Card, CardHeader, CardBody, Heading, Text, VStack} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'



function ModelbasedParametersTable(props){
  
      return ( 
        <>

    <VStack

    spacing={5}

    >

    { props.parsed? 
    <>
        <Card bg="white" w="80vw" >
        <CardHeader>
            <Heading size='md'>Activities</Heading>
        </CardHeader>
        <CardBody>

                <Text  fontSize='sm'>
                View a summary of all your clients over the last month.
                </Text>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Activity</Th>
                            <Th>Resource</Th>
                            <Th>Duration</Th>
                            <Th>Time Unit</Th>
                            <Th>Cost</Th>
                            <Th>Curency</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {props.getData("currentModel").parameters.modelParameter.activities.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.resource}</Td>
                                            <Td>{element.duration}</Td>
                                            <Td>{element.unit}</Td>
                                            <Td>{element.cost}</Td>
                                            <Td>{element.currency}</Td>
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white" w="80vw">
        <CardHeader>
            <Heading size='md'>Gateways</Heading>
        </CardHeader>
        <CardBody>

                <Text  fontSize='sm'>
                View a summary of all your clients over the last month.
                </Text>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Gateway ID</Th>
                            <Th>outgoing</Th>
                            <Th>probability</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {props.getData("currentModel").parameters.modelParameter.gateways.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.outgoing.map((out) => {
                                                return <Text>{[... props.getData("currentModel").parameters.modelParameter.activities, ... props.getData("currentModel").parameters.modelParameter.gateways, ... props.getData("currentModel").parameters.modelParameter.events].find(x => x.incoming.includes(out)).id}</Text>
                                            })}</Td>
                                               <Td>{element.outgoing.map((prob) => {
                                                return <Text>{props.getData("currentModel").parameters.modelParameter.sequences.find((seqq) => seqq.id === prob).probability}</Text>
                                            })}</Td>
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white" w="80vw">
        <CardHeader>
            <Heading size='md'>Events</Heading>
        </CardHeader>
        <CardBody>

                <Text  fontSize='sm'>
                View a summary of all your clients over the last month.
                </Text>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Event ID</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {props.getData("currentModel").parameters.modelParameter.events.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>
        </>
        :
        ""}
        </VStack>
        </>
      );
  }




export default ModelbasedParametersTable;