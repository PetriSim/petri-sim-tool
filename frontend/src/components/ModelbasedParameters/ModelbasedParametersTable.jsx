import { Input, Select, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Card, CardHeader, CardBody, Heading, Text, VStack, Button, Box, Spacer } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ViewButtons from './ViewButtons';

const ModelbasedParametersTable = ({ currentScenario, currentBpmn, getData }) => {
  const [editable, setEditable] = useState(false);
  const [activities, setActivities] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [events, setEvents] = useState([]);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    setActivities(getData('currentModel').modelParameter.activities);
    setGateways(getData('currentModel').modelParameter.gateways);
    setEvents(getData('currentModel').modelParameter.events);
    setSequences(getData('currentModel').modelParameter.sequences);
  }, [currentScenario, currentBpmn, getData]);

  const handleChange = (event, index, group, type) => {
    let value = event.target.value;

    let copy = [...getData('currentModel').modelParameter[group]];
    copy[index][type] = value;

    console.log(copy)

    if(group === 'activities') setActivities(copy)
    //setActivities(group === 'activities' ? copy : getData('currentModel').modelParameter.activities);


    setGateways(group === 'gateways' ? copy : getData('currentModel').modelParameter.gateways);
    setEvents(group === 'events' ? copy : getData('currentModel').modelParameter.events);
    setSequences(getData('currentModel').modelParameter.sequences);

    getData('currentModel').modelParameter[group] = copy;
  };

      return ( 
        <Box h="93vh" overflowY="auto" p="5" >

    <VStack
    spacing={5}
    >

    <Box display="flex" justifyContent="flex-end" w="100%">
        <Button variant="outline" bg="#FFFF" onClick={() => setEditable(!editable)}><Text color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">{editable? "View mode" : "Edit mode"}</Text></Button>
    </Box>
    
    <>
        <Card bg="white"  w="100%" >
        <CardHeader>
            <Heading size='md'>Activities</Heading>
        </CardHeader>
        <CardBody>

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
                            <Th>Currency</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {activities.map((element, index) => {
                              
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.name}</Td>
                                            <Td>{element.resources.join(",")}</Td>
                                            <Td>{element.duration.values.map((value) => {return <Text>{value.id + ": " + value.value}</Text>})}</Td>
                                            <Td>{editable?  <Select name="unit" value={activities[index].unit} onChange={(event) => handleChange(event, index, "activities", "unit")}>
                                                                <option value='secs'>Seconds</option>
                                                                <option value='mins'>Minutes</option>
                                                            </Select> : element.unit}
                                            </Td>
                                            <Td>{editable? <Input value={activities[index].cost} onChange={(event) => handleChange(event, index, "activities", "cost")}/> : element.cost}</Td>
                                            <Td>{editable? <Select name="currency"  value={activities[index].currency} onChange={(event) => handleChange(event, index, "activities", "currency")}>
                                                <option value='euro'>euro</option>
                                                <option value='dollar'>dollar</option>
                                                <option value='money unit'>money unit</option>
                                            </Select> : element.currency}
                                            </Td>
                                        </Tr>
                                     

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white"  w="100%">
        <CardHeader>
            <Heading size='md'>Gateways</Heading>
        </CardHeader>
        <CardBody>

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

                            { gateways.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>


                                            {editable?
                                            <>
                                            <Td><VStack spacing={8} alignItems="left">{element.outgoing.map((out) => {
                                                return <Text>{[...activities, ...gateways, ...events].find(x => x.incoming.includes(out)).id}</Text>
                                            })}</VStack></Td>
                                            
                                            <Td>
                                                <VStack spacing={3} alignItems="left">
                                                {element.outgoing.map((prob) => {
                                                    return  <Input w="25%" value={sequences.find((seqq) => seqq.id === prob).probability} onChange={(event) => handleChange(event, sequences.findIndex((seqq) => seqq.id === prob), "sequences", "probability")}/>
                                                })}
                                                </VStack>
                                            </Td>
                                            </>
                                            : 

                                            <>   
                                            <Td>{element.outgoing.map((out) => {
                                                return <Text>{[...activities, ...gateways, ...events].find(x => x.incoming.includes(out)).id}</Text>
                                            })}</Td>
                                            
                                            <Td>
                                                
                                                {element.outgoing.map((prob) => {
                                                     return <Text>{sequences.find((seqq) => seqq.id === prob).probability}</Text>
                                                 })}
                                               
                                            </Td>
                                            </>
                                            }
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white" w="100%">
        <CardHeader>
            <Heading size='md'>Events</Heading>
        </CardHeader>
        <CardBody>

                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Event ID</Th>
                            <Th>Interarrival time distribution</Th>
                            <Th>Distribution data</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {getData("currentModel").modelParameter.events.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.interArrivalTime.distributionType}</Td>
                                            <Td>{element.interArrivalTime.values.map((value) => {return <Text>{value.id + ": " + value.value}</Text>})}</Td>
                                            
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>
        </>
       

            <Spacer />
            <Spacer />
            <Spacer />
            <ViewButtons/>
        </VStack>
        </Box>
      );
    }
  




export default ModelbasedParametersTable;