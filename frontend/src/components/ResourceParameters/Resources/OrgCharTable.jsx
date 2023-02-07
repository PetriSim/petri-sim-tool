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

        <ResourceNavigation currentTab="overview"/>

            <Card bg="white">
                <CardBody>
                <Heading size="md">Assigned resources</Heading>
                    <TableContainer overscrollx="scroll" w="100%">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Role</Th>
                                    <Th>Assigned ressources</Th>
                                </Tr>
                            </Thead>
                            <Tbody> 
                            
                                {props.getData("currentScenario").resourceParameters.roles.map((element) => {
                                return <><Tr><Td><Flex><Button variant="outline" onClick={() => {props.setRole(element.id); props.setCurrent("Resource Parameters for Roles")} }>{element.id}</Button></Flex></Td><Td><Flex gap="4" flexWrap="wrap">{element.resources.map((resource) => {
                                   return <Button onClick={() => {props.setResource(resource.id); props.setCurrent("Resource Parameters") }}> {resource.id} </Button> 
                                })}</Flex></Td></Tr></>
                                })} 
                                
                           
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            <Card bg="white">
                <CardBody>
                <Heading size="md" mb="5">Unassigned resources</Heading>
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