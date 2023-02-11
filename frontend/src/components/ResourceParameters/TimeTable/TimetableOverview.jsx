import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, Radio, RadioGroup, TableContainer, Stack, Button } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import TimeTable from './TimeTable';
import ResourceNavigation from '../ResourceNavigation';

const TimetableOverview = ({setTimetable, getData, setCurrent, currentScenario, setData }) => {
const [selectedTimeTable, setSelectedTimeTable] = useState(0);

useEffect(() => {
    setSelectedTimeTable(0);
    setTimetable(getData("currentScenario").resourceParameters.timeTables[0].id);
    setCurrent("Edit Timetable");
}, [getData("currentScenario")]);

useEffect(() => {
    if (getData("currentScenario").resourceParameters.timeTables.length === selectedTimeTable) {
        setSelectedTimeTable(0);
    }
});

const deleteTimetable = (item) => {
    let data = [...getData("allScenario")];
    data[currentScenario].resourceParameters.timeTables = data[currentScenario].resourceParameters.timeTables.filter(timeTable => timeTable.id !== item);
    setData(data);
}

const deleteItem = (id, index) => {
    let data = [...getData("allScenario")];
    data[currentScenario].resourceParameters.timeTables.find(item => item.id === id).timeTableItems.splice(index, 1);
    setData(data);
}

        return (
            <>
            <Box h="93vh" overflowY="auto" p="5" >
                <Stack spacing={5} >
                    <ResourceNavigation currentTab="timetable" />
                    <Card bg="white" w="100%">
                        <CardBody>
                            <Heading size='md'>Select Timetable</Heading>

                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th></Th>
                                            <Th>Name</Th>
                                            <Th>Weekday</Th>
                                            <Th>Time</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {getData("currentScenario").resourceParameters.timeTables? 
                                            getData("currentScenario").resourceParameters.timeTables.map((timeTable, index) => {
                                                return <Tr>
                                                    <Td>
                                                        <RadioGroup value={selectedTimeTable} onChange={() => {setSelectedTimeTable(index ); setCurrent("Edit Timetable"); setTimetable(timeTable.id)}}>
                                                            <Radio value={index} colorScheme="green"></Radio>
                                                        </RadioGroup>
                                                    </Td>
                                                    <Td>{timeTable.id}</Td>
                                                    <Td>{timeTable.timeTableItems.map((item, i) => { return <Text>{(timeTable.timeTableItems.length > 1) ? (i + 1) + ". " : ""} {item.startWeekday + " - " + item.endWeekday} {(timeTable.timeTableItems.length > 1) ? <Button colorScheme="gray" variant="ghost" onClick={() => deleteItem(timeTable.id, i)}><DeleteIcon color="gray" /></Button> : ""}  </Text>  })} </Td>
                                                    <Td>{timeTable.timeTableItems.map((item) => { return <Text>{item.startTime + " - " + item.endTime} </Text> })}</Td>
                                                    <Td> 
                                                        <Button colorScheme="gray" variant="ghost" onClick={() => deleteTimetable(timeTable.id)}><DeleteIcon color="gray" /></Button>
                                                    </Td>
                                                </Tr>
                                            })
                                        : ""}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                     {getData("currentScenario").resourceParameters.timeTables[selectedTimeTable]?                        
                        <TimeTable setData={setData} data={getData("currentScenario").resourceParameters.timeTables[selectedTimeTable].timeTableItems} />
                    : ""}
                </Stack>
            </Box>
            </>
        );
    }


export default TimetableOverview;