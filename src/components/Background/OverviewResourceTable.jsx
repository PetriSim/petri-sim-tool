import React from "react";
import {Flex, Text} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'


function OverviewResourceTable(props){

    return(
        <React.Fragment>



            <Flex >
              <Table variant='simple'>
                <TableCaption>Resource parameters</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Role</Th>
                        <Th>Resource</Th>
                        <Th>Timetable</Th>
                        <Th>Cost/Hour</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Top Level Management</Td>
                        <Td>Management Director</Td>
                        <Td>40h/week</Td>
                        <Td>100 euro</Td>
                    </Tr>
                </Tbody>
            </Table>
   
                {props.data}
</Flex>
        </React.Fragment>
    )
}

export default OverviewResourceTable


