import {Card, CardBody, CardHeader, Flex, Heading, Text, VStack} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import React from "react";


class ModelBasedOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parsed: false
        };
      }

      componentDidMount(){
        console.log(this.props.parsed)
        if(this.props.parsed){
            this.setState({
                parsed:true,
            })
        }
      }

      componentDidUpdate(prevProps) {
        console.log(this.props.parsed)
       
        if(prevProps.parsed !== this.props.parsed ){
            this.setState({
                parsed:true
            })
        }

      }


    render() {
    return (
        <>
            {/* this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter !== undefined ? */}
            <>
            <Card bg="white" w="70vw" mt="25px">
                <CardHeader>
                    <Heading size='md'>Modelbased Parameters.Activities</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
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
                            {this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.activities.map((element) => {
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
        
            <Card bg="white" w="70vw" mt="25px">
                <CardHeader>
                    <Heading size='md'>Modelbased Parameters. Gateways</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
                        <Thead w="100%">
                            <Tr>
                                <Th>ID</Th>
                                <Th>Incoming activity</Th>
                                <Th>Outgoing activity</Th>
                                <Th>Type</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.props.getModelData("currentModel").modelParameter.gateways.map((element) => {
                                return <>
                                    <Tr>
                                        <Td>{element.id}</Td>
                                        <Td><VStack spacing={8} alignItems="left">{element.incoming.map((inc) => {
                                            return <Text>{inc}</Text>
                                        })}</VStack></Td>

                                        <Td><VStack spacing={8} alignItems="left">{element.outgoing.map((out) => {
                                            return <Text>{out}</Text>
                                        })}</VStack></Td>
                                        <Td>{element.type}</Td>
                                    </Tr>
                                </>
                            })}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
            <Flex  pt = "20px">
            <Card bg="white" w="100%">
                    <CardHeader>
                        <Heading size='md'>Modelbased Parameters. Events</Heading>
                    </CardHeader>
                    <CardBody>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Event ID</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {this.props.getModelData("currentModel").modelParameter.events.map((element) => {
                                        return <Tr>
                                            <Td>{element.id}</Td>
                                        </Tr>
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            
            </Flex>
            </>
               {/* :""  }*/}
        </>
    );
}
}
export default ModelBasedOverview


