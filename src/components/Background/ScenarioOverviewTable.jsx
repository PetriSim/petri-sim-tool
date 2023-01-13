import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'


function OverviewTable(props){

    return(

              <Table variant='simple'>
                  <Thead w="100%">
                    <Tr>
                        <Th>Simulation</Th>
                        <Th>Starting date</Th>
                        <Th>Starting time</Th>
                        <Th>Replications</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.getSimulData("allScenarios").map((element) => {
                        return <Tr>
                            <Td>{element.scenarioName} </Td>
                            <Td>{element.startingDate}</Td>
                            <Td>{element.startingTime}</Td>
                            <Td>{element.numberOfInstances}</Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
                    )
}

export default OverviewTable


