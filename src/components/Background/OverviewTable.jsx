import React from "react";
import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'


function OverviewTable(props){

    return(
        <React.Fragment>

            <Box as='button' borderRadius='md' bg='white' color='C6C6C6' px={10} h={10}>
                Compare scenarious
            </Box>
                <gap />
        <Box maxW='max-content' borderWidth='1px' borderRadius='lg' overflow='hidden' >
                <Box display='flex' alignItems='baseline'>

        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Simulation parameters</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Simalation</Th>
                        <Th>Starting day</Th>
                        <Th>Starting time</Th>
                        <Th isNumeric>Replications/Number of process instances</Th>
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
        </Box>
        </Box>


        </React.Fragment>
    )
}

export default OverviewTable


