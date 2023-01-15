import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Text,
    Tr,
    Th,
    Td
} from '@chakra-ui/react'


function OverviewResourceTable(props) {

    return (
        <Table variant='simple'>
        
            <Thead>
                <Tr>
                    <Th>Department</Th>
                    <Th>Role</Th>
                    <Th>Cost</Th>
                    <Th>Number</Th>
                    <Th>Timetable</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.getResourceData("allScenarios")[props.scenario_id].resourceParameters.roles.map((element) => {
                    return <Tr>
                        <Td>{element.id}</Td>
                        <Td> {element.resources.map((resource) => {
                            return <Text onClick={() => props.setResource(resource.id)}> {resource.id} </Text>
                        })} </Td>
                        <Td>costHour</Td>
                        <Td>{element.numberOfInstances}</Td>
                        <Td>{element.schedule}</Td>
                    </Tr>
                })}
            </Tbody>
        </Table>

    )
}

export default OverviewResourceTable


