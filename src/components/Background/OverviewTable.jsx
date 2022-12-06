import React from "react";
import { Flex} from '@chakra-ui/react'
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


function OverviewTable(props){

    return(
        <React.Fragment>
            <Flex >
            <TableContainer ml="40px" mt="25px">
              <Table variant='simple'>
                <TableCaption>Simulation parameters</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Simalation</Th>
                        <Th>Starting day</Th>
                        <Th>Starting time</Th>
                        <Th isNumeric>Replications</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Scenario 1 </Td>
                        <Td>14.11.2022</Td>
                        <Td>12:00</Td>
                        <Td isNumeric>20</Td>
                    </Tr>
                    <Tr>
                        <Td>Scenario 2 </Td>
                        <Td>15.11.2022</Td>
                        <Td>8:00</Td>
                        <Td isNumeric>20</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
                {props.data}
</Flex>
        </React.Fragment>
    )
}

export default OverviewTable


