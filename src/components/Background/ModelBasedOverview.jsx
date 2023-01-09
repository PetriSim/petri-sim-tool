import {React,  useState, useEffect} from "react";
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
    const [parsedd, setParsed] = useState(false)
    useEffect(() => {
        if(props.parsed){
            setParsed(true)
            console.log( props.getModelData("currentModel"))
        }
    }, [props.parsed])


    return(
        <>
            { parsedd ?
        <Card bg="white" w="70vw" mt="25px" >
            <CardHeader>
                <Heading size='md'>Modelbased Parameters</Heading>
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
                         {props.getModelData("currentModel").modelParameter.activities.map((element) => {
                             return <>
                             <Tr>
                                   <Td>{element.id}</Td>
                                      <Td>{element.name}</Td>
                                      <Td>{element.resource}</Td>
                                      <Td>{element.duration}</Td>
                                      <Td>{element.unit}</Td>
                                     <Td>{element.cost}</Td>
                                     <Td>{element.currency}</Td>
                             </Tr>
                           </>

                            })}

                </Tbody>
            </Table>
            </CardBody>
        </Card>
                :""  }
        </>
    )
}

export default ModelBasedOverview


