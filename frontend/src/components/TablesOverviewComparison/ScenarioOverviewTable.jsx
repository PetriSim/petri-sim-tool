import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td, Text,
} from '@chakra-ui/react'


function OverviewTable(props){

    return(
// Displaying of general simulation parameters for all scenarios
              <Table variant='simple'>
                  <Thead w="100%">
                    <Tr>
                        <Th>Simulation</Th>
                        <Th>Starting date</Th>
                        <Th>Starting time</Th>
                        <Th>Replications</Th>
                        <Th>Inter-arrival Time:Distribution</Th>
                        <Th>Distribution Data</Th>
                        <Th>Time unit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/*Filling in the table*/}
                    {props.getSimulData("allScenarios").map((element) => {
                        return <Tr>
                            <Td align="left">{element.scenarioName} </Td>
                            <Td align="left" >{element.startingDate}</Td>
                            <Td align="left" >{element.startingTime}</Td>
                            <Td align="left">{element.numberOfInstances}</Td>
                            <Td align="left">{element.interArrivalTime.distributionType}</Td>
                            <Td align="left">{element.interArrivalTime.values.map((distribution) => {
                                return <Text> {distribution.id} : {distribution.value} </Text>
                            })} </Td>
                            <Td>{element.timeUnit}</Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
                    )
}

export default OverviewTable


