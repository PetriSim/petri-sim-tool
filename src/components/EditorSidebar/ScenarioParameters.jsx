import React from 'react'
import { Input, FormControl, FormLabel, Flex } from '@chakra-ui/react';

class ScenarioParameters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        scenarioName: "",
        startingDate: "",
        startingTime: "",
        numberOfInstances: "",
        interArrivalTime:"",
        values:"",
        timeUnit:"",
        distributionType: ""
      };
      
    }

    componentDidMount(){
        this.setState({
            scenarioName: this.props.getData("currentScenario").scenarioName,
            startingDate: this.props.getData("currentScenario").startingDate,
            startingTime: this.props.getData("currentScenario").startingTime,
            numberOfInstances: this.props.getData("currentScenario").numberOfInstances,
            interArrivalTime: this.props.getData("currentScenario").interArrivalTime,
            values: this.props.getData("currentScenario").values,
            timeUnit: this.props.getData("currentScenario").timeUnit,
            distributionType: this.props.getData("currentScenario").interArrivalTime.distributionType
          })
          console.log(this.state)
    }

    handleInputChange(resource) {
      const target = resource.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      this.props.getData("currentScenario")[name] = target.value

      console.log( this.props.getData("currentScenario"))
    
    }


render() {

    return (
        <>

         <FormControl>
              <FormLabel>Scenario Name:</FormLabel>
              <Input title="Test date" value={this.state.scenarioName} bg="white" name="scenarioName" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Starting Date:</FormLabel>
              <Input title="Test date" value={this.state.startingDate} bg="white" type="inputRead" name="startingDate" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Starting time:</FormLabel>
              <Input title="Test date" value={this.state.startingTime} bg="white"  type="inputRead" name="startingTime" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Number of Process Instances:</FormLabel>
              <Input title="Test date" value={this.state.numberOfInstances} bg="white" type="inputRead"  name="numberOfInstances" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Interarrival Time:</FormLabel>
              <Input title="Test date" value={this.state.distributionType} bg="white" type="inputRead"  name="distributionType" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

        <Flex justifyContent="space-between">
            <FormControl w="47%">
                <FormLabel>Value:</FormLabel>
                <Input title="Test date" value={this.state.values} bg="white" type="inputRead" />
            </FormControl>

            <FormControl w="47%"> 
                <FormLabel>Time Unit:</FormLabel>
                <Input title="Test date" value={this.state.timeUnit} bg="white" type="inputRead" name="timeUnit" onChange={(event) => this.handleInputChange(event)} />
            </FormControl>
        </Flex>
        </>
    )
}
}



export default ScenarioParameters;