import React from 'react'
import { Text, Card, CardBody, Table, TableContainer, Thead } from '@chakra-ui/react'
import {
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

function OrgCharTable(props){

    return(

            <Card bg="white" w="70vw" mt="25px">
                <CardBody>
                    <TableContainer ml="40px" mt="25px">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                        return <Th>{element.id}</Th>
                                })} </Tr>
                            </Thead>
                            <Tbody> 
                                <Tr>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                return <Td>{element.resources.map((resource) => {
                                   return <Text> {resource.id} </Text> 
                                })}</Td>
                                })} </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

    )
}

export default OrgCharTable;