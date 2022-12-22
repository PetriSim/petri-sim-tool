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


function OverviewTable(props){

    return(

            <Flex >
           
              <Table variant='simple'>
                <TableCaption>Simulation parameters</TableCaption>
                <Thead w="100%">
                    <Tr>
                        <Th>Simalation</Th>
                        <Th>Starting date</Th>
                        <Th>Starting time</Th>
                        <Th isNumeric>Replications</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.hello("allScenarios").map((element) => {
                        return <Tr>
                            <Td>{element.scenarioName} </Td>
                            <Td>{element.startingDate}</Td>
                            <Td>{element.startingTieme}</Td>
                            <Td isNumeric>{element.numberOfInstances}</Td>
                        </Tr>
                    })}
                </Tbody>
             </Table>
  

            </Flex>

    )
}

export default OverviewTable


