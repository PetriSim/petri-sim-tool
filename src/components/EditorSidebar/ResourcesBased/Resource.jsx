import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react'


class Resources extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       
        amount: "",
        cost: "",
        currency: "",
        timetable: ""
      };
}

 componentDidMount(){
      if(this.props.getData("currentModel").resourceParameters.resources.find((value) => value.id === this.props.selectedObject.id)){
        console.log(this.props.selectedObject.id)
        this.setState({
            amount: this.props.getData("currentModel").resourceParameters.resources.find((value) => value.id === this.props.selectedObject.id).amount,
            cost: this.props.getData("currentModel").resourceParameters.resources.find((value) => value.id === this.props.selectedObject.id).cost,
            cuurency: this.props.getData("currentModel").resourceParameters.resources.find((value) => value.id === this.props.selectedObject.id).currency,
            timetable: this.props.getData("currentModel").resourceParameters.resources.find((value) => value.id === this.props.selectedObject.id).timetable
          
          })
      }
    }


handleInputChange(resource) {
      const target = resource.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      this.props.getData("currentModel").resourceParameters.resources.find((value) => value.id === this.props.selectedObject.id)[name] = target.value
    
    }


    render() {
        return ( 
          <>
          {this.state.amount?
          <>
           <FormControl>
              <FormLabel>Resource Name:</FormLabel>
              <Input title="Test date" value={this.props.selectedObject.name? this.props.selectedObject.name : "" } type="inputRead" />
          </FormControl>
  
          <FormControl>
              <FormLabel>Amount of Resource:</FormLabel>
              <Input name="amount" type="input" value={this.state.amount} onChange={(resource) => this.handleInputChange(resource)}  bg="white"/>
          </FormControl>
              
          <FormControl>
              <FormLabel>Cost per Hour:</FormLabel>
              <Select name="cost" placeholder={this.state.cost} onChange={(resource) => this.handleInputChange(resource)} bg="white">
                  <option value='secs'>Seconds</option>
                  <option value='mins'>Minutes</option>
              </Select>
          </FormControl>
  
          <FormControl>
            <FormLabel>Currency:</FormLabel>
              <Select name="currency" placeholder={this.state.currency} onChange={(resource) => this.handleInputChange(resource)} bg="white">
                  <option value='euro'>euro</option>
                  <option value='dollar'>dollar</option>
              </Select>
          </FormControl>
  
          <FormControl>
            <FormLabel>Timetable:</FormLabel>
            <Input name="timetable" type="input" value={this.state.cost} onChange={(resource) => this.handleInputChange(resource)} bg="white"/>
          </FormControl> </>: ""}
              
          </>
        );
      }
    }
  
  
  
  export default Resources;