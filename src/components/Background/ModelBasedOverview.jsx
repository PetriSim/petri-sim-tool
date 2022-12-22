import React from "react";
import {Card, CardBody, CardHeader, Flex, Heading, Text} from '@chakra-ui/react'
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
import OverviewResourceTable from "./OverviewResourceTable";


function ModelBasedOverview(props){

    return(
        <Card bg="white" w="70vw" mt="25px" >
            <CardHeader>
                <Heading size='md'>Resource Overview</Heading>
            </CardHeader>
            <CardBody>
              <Table variant='simple'>
                <TableCaption>Activities</TableCaption>
                <Thead w="100%">
                    <Tr>
                        <Th>ID</Th>
                        <Th>Activity</Th>
                        <Th>Resource</Th>
                        <Th>Duration</Th>
                        <Th>TimeUnit</Th>
                        <Th>Cost</Th>
                        <Th>Currency</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.getModelData("currentModel").map((element) => {
                        return <Tr>
                            <Td>{element.modelParameter.activities.id} </Td>
                            <Td>{element.modelParameter.activities.name}</Td>
                            <Td>{element.modelParameter.activities.resource}</Td>
                            <Td >{element.modelParameter.activities.duration}</Td>
                            <Td >{element.modelParameter.activities.cost}</Td>
                            <Td >{element.modelParameter.activities.currency}</Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
            </CardBody>
        </Card>


    )
}

export default ModelBasedOverview


