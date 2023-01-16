import {React, useEffect} from 'react'
import { Box, Card, CardBody, Table, TableContainer, Thead,  Tbody, Tr, Th, Td, Button, Flex, Stack, Heading} from '@chakra-ui/react'
import ResourceNavigation from '../ResourceNavigation';
function OrgCharTable(props){

    useEffect(() => { 
        props.setCurrent("Resource Parameters")
    },[])

    var a = props.getData("currentScenario").resourceParameters.roles.map(x => x.resources).flat().map(y => y.id)
    var b = props.getData("currentScenario").resourceParameters.resources.map(x => x.id)
    let difference = b.filter(o => !a.includes(o));

    return(
        <>
        <Box h="93vh" overflowY="auto" p="5" >
        <Stack gap="3">

        <ResourceNavigation/>

            <Card bg="white">
                <CardBody>
                <Heading size="md">Allocated resources</Heading>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Department: </Th>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                        return <Th><Flex justifyContent="center"><Button variant="outline" onClick={() => {props.setRole(element.id); props.setCurrent("Resource Parameters for Roles")} }>{element.id}</Button></Flex></Th>
                                })} 
                                
                                </Tr>
                            </Thead>
                            <Tbody> 
                                <Tr>
                                <Td>Allocated <br/>resources:</Td>
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                return <Td><Flex alignItems="center" justifyContent="center" gap="4" flexWrap="wrap">{element.resources.map((resource) => {
                                   return <Button onClick={() => {props.setResource(resource.id); props.setCurrent("Resource Parameters") }}> {resource.id} </Button> 
                                })}</Flex></Td>
                                })} 
                                
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            <Card bg="white">
                <CardBody>
                <Heading size="md">Unallocated resources</Heading>
                    <Flex alignItems="center"  gap="4" flexWrap="wrap">
                        {
                        difference.map((id) => {
                        return <Button onClick={() => {props.setResource(id); props.setCurrent("Resource Parameters") }}> {id} </Button> 
                    })}
                    </Flex> 
                </CardBody>
            </Card>
            </Stack>
            </Box>
            </>

            )
}

export default OrgCharTable;