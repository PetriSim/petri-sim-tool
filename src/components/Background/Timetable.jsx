import React from 'react'
import { Card, CardBody, Table, TableCaption, TableContainer, Thead } from '@chakra-ui/react'
import {
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

function Timetable(){

    return(
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
                        <Tr>
                            <Td>Tutku</Td>
                            <Td>Lana</Td>
                            <Td>Furat</Td>
                        </Tr>
                        <Tr>
                            <Td>Alex</Td>
                            <Td>Laura</Td>
                            <Td>Luise</Td>
                        </Tr>
                        <Tr>
                            <Td>Sarah</Td>
                            <Td>Sam</Td>
                            <Td>Andre</Td>
                            
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            </CardBody>
        </Card>
    )
}

export default Timetable