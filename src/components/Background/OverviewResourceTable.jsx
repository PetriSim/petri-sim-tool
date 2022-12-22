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
                        <Th>Cost</Th>
                        <Th>Number</Th>
                        <Th>Timetable</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.getResourceData("currentScenario").resourceParameters.resources.map((element) => {
                        return <Tr>
                        <Td>{element.id}</Td>
                        <Td>{element.costHour}</Td>
                        <Td>{element.numberOfInstances}</Td>
                        <Td>{element.schedule}</Td>
                    </Tr>
                    })}
                </Tbody>
            </Table>
   

</Flex>
        </React.Fragment>
    )
}

export default OverviewResourceTable


