import { Input, Select, FormControl, FormLabelTable,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Table,
    Thead,
    Tbody,
    Tfoot,Tr,Th,Td,
    TableContainer,Card, CardHeader, CardBody, Heading, Text, VStack, Button} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'



function ModelbasedParametersTable(props){

    const [editable, setEditable] = useState(false)

    useEffect(() =>{
        console.log(props.currentBpmn)
    }, [props.currentBpmn])

    
    function handleChange(event, index, type){

        props.getData("currentModel").parameters.modelParameter.activities[index][type] = event.target.value
        
    }

      return ( 
        <>

    <VStack
    spacing={5}
    >

        <Button onClick={() => setEditable(!editable)}>Edit mode</Button>

    { props.parsed ? 
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
                            <Th>ID</Th>
                            <Th>Activity</Th>
                            <Th>Resource</Th>
                            <Th>Duration</Th>
                            <Th>Time Unit</Th>
                            <Th>Cost</Th>
                            <Th>Curency</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {props.getData("currentModel").parameters.modelParameter.activities.map((element, index) => {
                              
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.name}</Td>
                                            <Td>{element.resource}</Td>
                                            <Td>{editable? <Input defaultValue={props.getData("currentModel").parameters.modelParameter.activities[index].duration} onChange={(event) => handleChange(event, index, "duration")}/> : element.duration}</Td>
                                            <Td>{editable?  <Select name="unit" defaultValue={element.unit} onChange={(event) => handleChange(event, index, "unit")}>
                                                                <option value='secs'>Seconds</option>
                                                                <option value='mins'>Minutes</option>
                                                            </Select> : element.unit}
                                            </Td>
                                            <Td>{editable? <Input defaultValue={element.cost} onChange={(event) => handleChange(event, index, "cost")}/> : element.cost}</Td>
                                            <Td>{editable? <Select name="currency"  defaultValue={element.currency} onChange={(event) => handleChange(event, index, "currency")}>
                                                <option value='euro'>euro</option>
                                                <option value='dollar'>dollar</option>
                                            </Select> : element.currency}
                                            </Td>
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

                            { props.getData("currentModel").parameters.modelParameter.gateways.map((element) => {
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