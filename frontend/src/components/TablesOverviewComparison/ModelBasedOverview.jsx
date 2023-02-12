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
import React, {useState} from "react";

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

class ModelBasedOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parsed: false
        };
        this.gatewayNames = [
            {id: "bpmn:InclusiveGateway", value: 'Inclusive Gateway'},
            {id: "bpmn:ParallelGateway", value: 'Parallel Gateway'},
            {id: "bpmn:ExclusiveGateway", value: 'Exclusive Gateway'},
        ]

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
           sleep(500).then(() => {
            this.setState({
                parsed:true
            })
            });

       
        }

      }

    getProbabilities(gateway) {

       /// let gateway = this.props.getModelData("allModels").models[this.props.bpmn_id].gateways.find(item => item.id === gateway_id)
        if (gateway !== undefined) {
            return gateway.outgoing.map((out) => {
            //    this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.sequences.map((seq) => {
                let sequence1 = this.props.getModelData("allModels").models[this.props.bpmn_id].modelParameter.sequences.find(item => item.id === out)
               if (sequence1 !== undefined) {
                  return <Text>{sequence1.probability}</Text>
               }
           })
         //  })
     //   }
    }}

    getType(type) {
        let typeName = this.gatewayNames.find(item => item.id === type)
        if (typeName !== undefined) {
        return <Text>{typeName.value}</Text>
    }
    }

    render() {
    return (
        <>
            { this.state.parsed ? 
            <>
            <Card bg="white"  mt="25px">
                <CardHeader>
                    <Heading size='md'>Modelbased Parameters.Activities</Heading>
                </CardHeader>
                <CardBody>
                    <Table variant='simple'>
                        <Thead w="100%">
                            <Tr>
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
                                        <Td>{element.name}</Td>
                                        <Td>
                                            {element.resources.map((resource) => {
                                                return <Text> {resource} </Text>
                                            })}
                                        </Td>
                                        <Td>{element.duration.values.map((value) => {return <Text>{value.id + ": " + value.value}</Text>})}</Td>
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
        
            <Card bg="white" mt="25px">
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
                                <Th>Probabilities</Th>
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
                                        <Td>{this.getProbabilities(element)}</Td>
                                        <Td>{this.getType(element.type)}</Td>
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
             :""  }
        </>
    );
}
}
export default ModelBasedOverview


