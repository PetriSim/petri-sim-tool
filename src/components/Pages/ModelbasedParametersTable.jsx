import { Input, Select,
    Table,
    Thead,
    Tbody,
    Tr,Th,Td,
    TableContainer,Card, CardHeader, CardBody, Heading, Text, VStack, Button} from '@chakra-ui/react';
import React from 'react'



class ModelbasedParametersTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            activities: {},
            parsed: false
        };
      }


      componentDidMount(){
        if(this.props.parsed){
            this.setState({
                parsed:true,
                activities: this.props.getData("currentModel").parameters.modelParameter.activities})
        }
      }

      componentDidUpdate(prevProps) {
       
        if(prevProps.currentScenario !== this.props.currentScenario | prevProps.currentBpmn !== this.props.currentBpmn){
            console.log(this.props.getData("currentModel").parameters.modelParameter.activities)
            this.setState({activities: this.props.getData("currentModel").parameters.modelParameter.activities})
        }

        if(prevProps.parsed !== this.props.parsed ){
            this.setState({
                parsed:true,
                activities: this.props.getData("currentModel").parameters.modelParameter.activities})
        }

      }
    

     handleChange = (event, index, type) =>{

        console.log(index)
        console.log(event)
        console.log(type)

        let value = event.target.value

        let copy = this.props.getData("currentModel").parameters.modelParameter.activities
        copy[index][type] = value
        
        this.setState({activities: copy})

        this.props.getData("currentModel").parameters.modelParameter.activities = copy
        
        console.log(this.state.activities)
        
    }

    render() {
      return ( 
        <>

    <VStack
    spacing={5}
    >

        <Button onClick={() => this.setState({editable: !this.state.editable})}>{this.state.editable? "View mode" : "Edit mode"}</Button>

    { this.state.parsed ? 
    <>
        <Card bg="white" w="80vw" >
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
                                            <Td>{this.state.editable? <Input value={this.state.activities[index].duration} onChange={(event) => this.handleChange(event, index, "duration")}/> : element.duration}</Td>
                                            <Td>{this.state.editable?  <Select name="unit" value={this.state.activities[index].unit} onChange={(event) => this.handleChange(event, index, "unit")}>
                                                                <option value='secs'>Seconds</option>
                                                                <option value='mins'>Minutes</option>
                                                            </Select> : element.unit}
                                            </Td>
                                            <Td>{this.state.editable? <Input value={this.state.activities[index].cost} onChange={(event) => this.handleChange(event, index, "cost")}/> : element.cost}</Td>
                                            <Td>{this.state.editable? <Select name="currency"  value={this.state.activities[index].currency} onChange={(event) => this.handleChange(event, index, "currency")}>
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

        <Card bg="white" w="80vw">
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

                            { this.props.getData("currentModel").parameters.modelParameter.gateways.map((element) => {
                                return <Tr>
                                            <Td>{element.id}</Td>
                                            <Td>{element.outgoing.map((out) => {
                                                return <Text>{[...this.props.getData("currentModel").parameters.modelParameter.activities, ...this.props.getData("currentModel").parameters.modelParameter.gateways, ...this.props.getData("currentModel").parameters.modelParameter.events].find(x => x.incoming.includes(out)).id}</Text>
                                            })}</Td>
                                               <Td>{element.outgoing.map((prob) => {
                                                return <Text>{this.props.getData("currentModel").parameters.modelParameter.sequences.find((seqq) => seqq.id === prob).probability}</Text>
                                            })}</Td>
                                        </Tr>

                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
        </CardBody>
        </Card>

        <Card bg="white" w="80vw">
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
        </>
      );
    }
  }




export default ModelbasedParametersTable;