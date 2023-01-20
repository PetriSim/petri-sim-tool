
import React from 'react'

import { Box, Heading, Text, Grid, Card, CardBody, Table,VStack,
    Thead,
    Tbody,
    Tr,Th,Td,Radio,RadioGroup,
    TableContainer, 
    Stack,
    Button} from "@chakra-ui/react";

    import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import TimeTable from './TimeTable';
import ResourceNavigation from '../ResourceNavigation';


class TimetableOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTimeTable: 0,
            timeTableList: []
        }
    }

    componentDidMount() {
        console.log(this.props.getData("currentScenario").resourceParameters.timeTables[0].id)
        this.props.setTimetable(this.props.getData("currentScenario").resourceParameters.timeTables[0].id)
      
        this.setState({ timeTableList: this.props.getData("currentScenario").resourceParameters.timeTables });
        this.props.setCurrent("Edit Timetable")  
    }

    

    delete(item){

        let data = [... this.props.getData("allScenario")]

   
        data[this.props.currentScenario].resourceParameters.timeTables = data[this.props.currentScenario].resourceParameters.timeTables.filter(timeTable => timeTable.id !== item);
       

        console.log(data[this.props.currentScenario].resourceParameters)
        this.props.setData(data)
    }

    deleteItem(id, index){

        let data = [... this.props.getData("allScenario")]
        console.log(data[this.props.currentScenario].resourceParameters.timeTables.find(item => item.id === id).timeTableItems)
        console.log(id)
        console.log(index)
        data[this.props.currentScenario].resourceParameters.timeTables.find(item => item.id === id).timeTableItems.splice(index, 1)
       
    
        console.log(data[this.props.currentScenario].resourceParameters)
        this.props.setData(data)
    }

   

    render() {
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
                                        {this.props.getData("currentScenario").resourceParameters.timeTables? 
                                            this.props.getData("currentScenario").resourceParameters.timeTables.map((timeTable, index) => {
                                                return <Tr>
                                                    <Td>
                                                        <RadioGroup value={this.state.selectedTimeTable} onChange={() => {this.setState({ selectedTimeTable: index }); this.props.setCurrent("Edit Timetable"); this.props.setTimetable(timeTable.id)}}>
                                                            <Radio value={index} colorScheme="green"></Radio>
                                                        </RadioGroup>
                                                    </Td>
                                                    <Td>{timeTable.id}</Td>
                                                    <Td>{timeTable.timeTableItems.map((item, i) => { return <Text>{(timeTable.timeTableItems.length > 1) ? (i + 1) + ". " : ""} {item.startWeekday + " - " + item.endWeekday} {(timeTable.timeTableItems.length > 1) ? <Button colorScheme="gray" variant="ghost" onClick={() => this.deleteItem(timeTable.id, i)}><DeleteIcon color="gray" /></Button> : ""}  </Text>  })} </Td>
                                                    <Td>{timeTable.timeTableItems.map((item) => { return <Text>{item.startTime + " - " + item.endTime} </Text> })}</Td>
                                                    <Td> 
                                                        <Button colorScheme="gray" variant="ghost" onClick={() => this.delete(timeTable.id)}><DeleteIcon color="gray" /></Button>
                                                    </Td>
                                                </Tr>
                                            })
                                        : ""}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                     {this.props.getData("currentScenario").resourceParameters.timeTables[this.state.selectedTimeTable]?                        
                        <TimeTable setData={this.props.setData} data={this.props.getData("currentScenario").resourceParameters.timeTables[this.state.selectedTimeTable].timeTableItems} />
                    : ""}
                </Stack>
            </Box>
            </>
        );
    }
}

export default TimetableOverview;