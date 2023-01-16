
import React from 'react'

import { Box, Heading, Text, Grid, Card, CardBody, Table,VStack,
    Thead,
    Tbody,
    Tr,Th,Td,Radio,RadioGroup,
    TableContainer, 
    Stack} from "@chakra-ui/react";
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
        this.props.setCurrent("Timetable");
        this.setState({ timeTableList: this.props.getData("currentScenario").resourceParameters.timeTables });
        console.log(this.props.getData("currentScenario").resourceParameters.timeTables);
    }

   

    render() {
        return (
            <>
            <Box h="93vh" overflowY="auto" p="5" >
                <Stack spacing={5} >
                    <ResourceNavigation/>
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
                                        {
                                            this.state.timeTableList.map((timeTable, index) => {
                                                return <Tr>
                                                    <Td>
                                                        <RadioGroup value={this.state.selectedTimeTable} onChange={() => this.setState({ selectedTimeTable: index })}>
                                                            <Radio value={index} colorScheme="green"></Radio>
                                                        </RadioGroup>
                                                    </Td>
                                                    <Td>{timeTable.id}</Td>
                                                    <Td>{timeTable.timeTableItems.map((item) => { return <Text>{item.startWeekday + " - " + item.endWeekday} </Text> })}</Td>
                                                    <Td>{timeTable.timeTableItems.map((item) => { return <Text>{item.startTime + " - " + item.endTime} </Text> })}</Td>
                                                </Tr>
                                            })
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>

                    <TimeTable setData={this.props.setData} data={this.props.getData("currentScenario").resourceParameters.timeTables[this.state.selectedTimeTable].timeTableItems} />
                </Stack>
            </Box>
            </>
        );
    }
}

export default TimetableOverview;