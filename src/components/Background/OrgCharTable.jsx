import React from 'react'
import { Table, TableCaption, TableContainer, Thead } from '@chakra-ui/react'
import {
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

function OrgCharTable(){

    return(
            <TableContainer ml="40px" mt="25px">
                <Table variant='simple'>
                    <TableCaption>Roles and Resources</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Role 1</Th>
                            <Th>Role 2</Th>
                            <Th> Role 3</Th>
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
            
    )
}

export default OrgCharTable