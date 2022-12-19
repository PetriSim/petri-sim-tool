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
        <React.Fragment>
            <Flex >
            <TableContainer ml="40px" mt="25px">
              <Table variant='simple'>
                <TableCaption>Simulation parameters</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Simalation</Th>
                        <Th>Starting date</Th>
                        <Th>Starting time</Th>
                        <Th isNumeric>Replications</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.scenarioData("allScenarios").map((element) => {
                        return <Tr>
                            <Td>{element.scenarioName} </Td>
                            <Td>{element.startingDate}</Td>
                            <Td>{element.startingTime}</Td>
                            <Td isNumeric>{element.numberOfInstances}</Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
        </TableContainer>

</Flex>
        </React.Fragment>
    )
}

export default OverviewTable


