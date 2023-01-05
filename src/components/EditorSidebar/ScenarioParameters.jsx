import React from 'react'
import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';

class ScenarioParameters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startingDate: "",
        startingTime: "",
        numberOfInstances: "",
        interArrivalTime:"",
        values:"",
        timeUnit:"",
      };
      
    }

    //componentDidMount(){

      //if(this.props.getData("currentScenario").scenarioName.find((value) => value.id === this.props.currentScenario)){
        //this.setState({
          //  startingDate: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentScenario).startingDate,
          // startingTime: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentScenario).startingTime,
          //  numberOfInstances: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentScenario).numberOfInstances,
            //interArrivalTime: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentScenario).interArrivalTime,
            //values: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentScenario).values,
            //timeUnit: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentScenario).timeUnit
          //})
          //console.log(this.state)
      //}
    //}



render() {

    return (
        <>

         <FormControl>
              <FormLabel>Scenario Name:</FormLabel>
              <Input title="Test date" value={this.props.currentScenario} type="inputRead" />
          </FormControl>

          <FormControl>
              <FormLabel>Starting Date:</FormLabel>
              <Input title="Test date" value={this.state.numberOfInstances} bg="white" type="inputRead" />
          </FormControl>

          <FormControl>
              <FormLabel>Starting time:</FormLabel>
              <Input title="Test date" value={this.state.costHour} bg="white"  type="inputRead" />
          </FormControl>

          <FormControl>
              <FormLabel>Number of Process Instances:</FormLabel>
              <Input title="Test date" value={this.state.schedule} bg="white" type="inputRead"  />
          </FormControl>

          <FormControl>
              <FormLabel>Interarrival Time:</FormLabel>
              <Input title="Test date" value={this.state.schedule} bg="white" type="inputRead" />
          </FormControl>

          <FormControl>
              <FormLabel>Value:</FormLabel>
              <Input title="Test date" value={this.state.schedule} bg="white" type="inputRead" />
          </FormControl>

          <FormControl>
              <FormLabel>Time Unit:</FormLabel>
              <Input title="Test date" value={this.state.schedule} bg="white" type="inputRead" />
          </FormControl>

        </>
    )
}
}



export default ScenarioParameters;