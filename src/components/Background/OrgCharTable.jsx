import {React, useEffect} from 'react'
import { Text, Card, CardBody, Table, TableContainer, Thead,  Tbody, Tr, Th, Td, } from '@chakra-ui/react'

function OrgCharTable(props){

    useEffect(() => { 
        props.setCurrent("Resource Parameters")
    },[ props])

    return(
            <Card bg="white">
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                        return <Th onClick={() => {props.setRole(element.id); props.setCurrent("Resource Parameters for Roles")} }><Text cursor="pointer">{element.id}</Text></Th>
                                })} </Tr>
                            </Thead>
                            <Tbody> 
                                <Tr>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                return <Td>{element.resources.map((resource) => {
                                   return <Text onClick={() => {props.setResource(resource.id); props.setCurrent("Resource Parameters") }} cursor="pointer"> {resource.id} </Text> 
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