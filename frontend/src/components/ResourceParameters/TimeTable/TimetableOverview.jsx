import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, Radio, RadioGroup, TableContainer, Stack, Button } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import TimeTable from './TimeTable';
import ResourceNavigation from '../ResourceNavigation';

const TimetableOverview = ({setTimetable, getData, setCurrent, currentScenario, setData }) => {
    // State to hold selected timetable index in the list 
const [selectedTimeTable, setSelectedTimeTable] = useState(0);

 // On mount or whenever the currentScenario changes, set the default selected timetable and call the setCurrent and setTimetable 
 // setCurrent is important for displaying the right editorsidebar on the right side
 // setTimetable is important for displaying the right timetable in the editorsidebar on the right side
useEffect(() => {
    setSelectedTimeTable(0);
    setTimetable(getData("currentScenario").resourceParameters.timeTables[0].id);
    setCurrent("Edit Timetable");
}, [getData("currentScenario")]);

// If the selected timetable is removed, set the first timetable as the new selected timetable
useEffect(() => {
    if (getData("currentScenario").resourceParameters.timeTables.length === selectedTimeTable) {
        setSelectedTimeTable(0);
    }
});

 // Remove a timetable from the list of timetables in the current scenario
const deleteTimetable = (item) => {
    let data = [...getData("allScenario")];
    data[currentScenario].resourceParameters.timeTables = data[currentScenario].resourceParameters.timeTables.filter(timeTable => timeTable.id !== item);
    setData(data);
}

// Remove an item from the selected timetable
const deleteItem = (id, index) => {
    let data = [...getData("allScenario")];
    data[currentScenario].resourceParameters.timeTables.find(item => item.id === id).timeTableItems.splice(index, 1);
    setData(data);
}

        return (
            <>
            <Box h="93vh" overflowY="auto" p="5" >
                <Stack spacing={5} >
                     {/* Display the Navigation for ressources and set curent Tab to timetable to highlight the current tab */}
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
                                        {/* Map through the list of timetables in the current scenario */}
                                        {getData("currentScenario").resourceParameters.timeTables? 
                                            getData("currentScenario").resourceParameters.timeTables.map((timeTable, index) => {
                                                return <Tr>
                                                    <Td>
                                                        <RadioGroup value={selectedTimeTable} onChange={() => {setSelectedTimeTable(index ); setCurrent("Edit Timetable"); setTimetable(timeTable.id)}}>
                                                            <Radio value={index} colorScheme="green"></Radio>
                                                        </RadioGroup>
                                                    </Td>
                                                    {/* Map through the timeTableItems in the selected timetable and display their start and end weekdays */}
                                                    <Td>{timeTable.id}</Td>
                                                    {/* The weekdays and delete button for each time table item */}
                                                    <Td>{timeTable.timeTableItems.map((item, i) => { return <Text>{(timeTable.timeTableItems.length > 1) ? (i + 1) + ". " : ""} {item.startWeekday + " - " + item.endWeekday} {(timeTable.timeTableItems.length > 1) ? <Button colorScheme="gray" variant="ghost" onClick={() => deleteItem(timeTable.id, i)}><DeleteIcon color="gray" /></Button> : ""}  </Text>  })} </Td>
                                                    <Td>{timeTable.timeTableItems.map((item) => { return <Text>{item.startTime + " - " + item.endTime} </Text> })}</Td>
                                                    <Td> 
                                                        {/* A delete button for the entire timetable */}
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
                    {/* If a timetable is selected, render a TimeTable component */}
                     {getData("currentScenario").resourceParameters.timeTables[selectedTimeTable]?                        
                        <TimeTable setData={setData} data={getData("currentScenario").resourceParameters.timeTables[selectedTimeTable].timeTableItems} />
                    : ""}
                </Stack>
            </Box>
            </>
        );
    }


export default TimetableOverview;