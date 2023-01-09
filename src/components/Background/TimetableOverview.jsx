import React from 'react'
import { Button,  Text, Stack, Flex, Card, CardBody, Table, TableCaption, TableContainer, Thead } from '@chakra-ui/react'
import {
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { CheckCircleIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

const hours = [ "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ];

function TimetableOverview(props){

    return(

<React.Fragment>
     <Flex >
     <Stack direction='column' mt="25px" w="70vw" >
        <Card bg="white" w="70vw" mt="25px">
            <CardBody>
            <TableContainer ml="40px" mt="25px">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Name</Th>
                            <Th>Weekday</Th>
                            <Th>Time</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody> 
                            {props.getData("currentScenario").resourceParameters.timeTables.map((element) => {
                                return <Tr>
                                    <Td> <CheckCircleIcon /> </Td>
                                    <Td>{element.id}</Td>
                                    <Td>{element.timeTableItems.map((timetable) => {
                                    return <Text> {timetable.startDate} - {timetable.endDate} </Text> })} </Td>
                                    <Td>{element.timeTableItems.map((timetable) => {
                                    return <Text> {timetable.startTime} - {timetable.endTime} </Text> })}</Td>
                                    <Td> <DeleteIcon /> </Td>
                                    <Td> <EditIcon /> </Td>
                        </Tr>
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            </CardBody>
        </Card>

        <Card bg="white" w="70vw" mt="25px">
        <CardBody>
        <TableContainer ml="40px" mt="25px">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Monday</Th>
                        <Th>Tuesday</Th>
                        <Th>Wednesday</Th>
                        <Th>Thursday</Th>
                        <Th>Friday</Th>
                        <Th>Saturday</Th>
                        <Th>Sunday</Th>
                    </Tr>
                </Thead>
                <Tbody> 
                    {hours.map((element) => {
                    return <Tr>
                        <Td>  <Text> {element} </Text> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        <Td> <Button colorScheme='gray' size='xs'> </Button> </Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
        </TableContainer>
        </CardBody>
        </Card>
    </Stack>

    </Flex>
</React.Fragment>
    )
}

export default TimetableOverview;