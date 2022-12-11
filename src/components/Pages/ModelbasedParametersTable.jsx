import { Input, Select,
    Table,
    Thead,
    Tbody,
    Tr,Th,Td,
    TableContainer,Card, CardHeader, CardBody, Heading, Text, VStack, Button, Box} from '@chakra-ui/react';
import React from 'react'



class ModelbasedParametersTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            activities: {},
            gateways: {},
            events: {},
            sequences: {},
            parsed: false
        };
      }


      componentDidMount(){
        if(this.props.parsed){
            this.setState({
                parsed:true,
                activities: this.props.getData("currentModel").parameters.modelParameter.activities,
                gateways: this.props.getData("currentModel").parameters.modelParameter.gateways,
                events: this.props.getData("currentModel").parameters.modelParameter.events,
                sequences:  this.props.getData("currentModel").parameters.modelParameter.sequences
            
            })
        }
      }

      componentDidUpdate(prevProps) {
       
        if(prevProps.currentScenario !== this.props.currentScenario | prevProps.currentBpmn !== this.props.currentBpmn){
            console.log(this.props.getData("currentModel").parameters.modelParameter.activities)
            this.setState({
                activities: this.props.getData("currentModel").parameters.modelParameter.activities,
                gateways: this.props.getData("currentModel").parameters.modelParameter.gateways,
                events: this.props.getData("currentModel").parameters.modelParameter.events,
                sequences:  this.props.getData("currentModel").parameters.modelParameter.sequences
            })
        }

        if(prevProps.parsed !== this.props.parsed ){
            this.setState({
                parsed:true,
                activities: this.props.getData("currentModel").parameters.modelParameter.activities,
                gateways: this.props.getData("currentModel").parameters.modelParameter.gateways,
                events: this.props.getData("currentModel").parameters.modelParameter.events,
                sequences:  this.props.getData("currentModel").parameters.modelParameter.sequences
            })
        }

      }
    

     handleChange = (event, index, group, type) =>{
        let value = event.target.value


        let copy = this.props.getData("currentModel").parameters.modelParameter[group]
        copy[index][type] = value
        
        this.setState({
            activities: group === "activities" ? copy : this.props.getData("currentModel").parameters.modelParameter.activities,
            gateways: group === "gateways" ? copy : this.props.getData("currentModel").parameters.modelParameter.gateways,
            events: group === "events" ? copy : this.props.getData("currentModel").parameters.modelParameter.events,
            sequences:  this.props.getData("currentModel").parameters.modelParameter.sequences
        })

        this.props.getData("currentModel").parameters.modelParameter[group] = copy
        
    }

    render() {
      return ( 
        <Box h="100vh" overflowY="auto" >

    <VStack
    spacing={5}
    >

        <Button onClick={() => this.setState({editable: !this.state.editable})}>{this.state.editable? "View mode" : "Edit mode"}</Button>

    { this.state.parsed ? 
    <>
        <Card bg="white"  w="100%" >
        <CardHeader>
            <Heading size='md'>Activities</Heading>
        </CardHeader>
        <CardBody>

                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Activity</Th>
                            <Th>Resource</Th>
                            <Th>Duration</Th>
                            <Th>Time Unit</Th>
                            <Th>Cost</Th>
                            <Th>Curency</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {this.state.activities.map((element, index) => {
                              
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.name}</Td>
                                            <Td>{element.resource}</Td>
                                            <Td>{this.state.editable? <Input value={this.state.activities[index].duration} onChange={(event) => this.handleChange(event, index, "activities", "duration")}/> : element.duration}</Td>
                                            <Td>{this.state.editable?  <Select name="unit" value={this.state.activities[index].unit} onChange={(event) => this.handleChange(event, index, "activities", "unit")}>
                                                                <option value='secs'>Seconds</option>
                                                                <option value='mins'>Minutes</option>
                                                            </Select> : element.unit}
                                            </Td>
                                            <Td>{this.state.editable? <Input value={this.state.activities[index].cost} onChange={(event) => this.handleChange(event, index, "activities", "cost")}/> : element.cost}</Td>
                                            <Td>{this.state.editable? <Select name="currency"  value={this.state.activities[index].currency} onChange={(event) => this.handleChange(event, index, "activities", "currency")}>
                                                <option value='euro'>euro</option>
                                                <option value='dollar'>dollar</option>
                                            </Select> : element.currency}
                                            </Td>
                                        </Tr>
                                     

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white"  w="100%">
        <CardHeader>
            <Heading size='md'>Gateways</Heading>
        </CardHeader>
        <CardBody>

                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Gateway ID</Th>
                            <Th>outgoing</Th>
                            <Th>probability</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            { this.state.gateways.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>


                                            {this.state.editable?
                                            <>
                                            <Td><VStack spacing={8} alignItems="left">{element.outgoing.map((out) => {
                                                return <Text>{[...this.state.activities, ...this.state.gateways, ...this.state.events].find(x => x.incoming.includes(out)).id}</Text>
                                            })}</VStack></Td>
                                            
                                            <Td>
                                                <VStack spacing={3} alignItems="left">
                                                {element.outgoing.map((prob) => {
                                                    return  <Input w="25%" value={this.state.sequences.find((seqq) => seqq.id === prob).probability} onChange={(event) => this.handleChange(event, this.state.sequences.findIndex((seqq) => seqq.id === prob), "sequences", "probability")}/>
                                                })}
                                                </VStack>
                                            </Td>
                                            </>
                                            : 

                                            <>   
                                            <Td>{element.outgoing.map((out) => {
                                                return <Text>{[...this.state.activities, ...this.state.gateways, ...this.state.events].find(x => x.incoming.includes(out)).id}</Text>
                                            })}</Td>
                                            
                                            <Td>
                                                
                                                {element.outgoing.map((prob) => {
                                                     return <Text>{this.state.sequences.find((seqq) => seqq.id === prob).probability}</Text>
                                                 })}
                                               
                                            </Td>
                                            </>
                                            }
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white" w="100%">
        <CardHeader>
            <Heading size='md'>Events</Heading>
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

                            {this.props.getData("currentModel").parameters.modelParameter.events.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>
        </>
        :
        ""}
        </VStack>
        </Box>
      );
    }
  }




export default ModelbasedParametersTable;