import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react'
import Field from '../../Field';


class Activity extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        /*
        duration: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).duration,
        unit: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).unit,
        cost: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).cost,
        currency: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).currency
    */

        duration: "",
        unit: "",
        cost: "",
        currency: ""
      };
  

    }

    componentDidMount(){
      if(this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id)){
        console.log(this.props.selectedObject.id)
        this.setState({
            duration: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).duration,
            unit: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).unit,
            cost: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).cost,
            currency: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).currency
          
          })
      }
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id)[name] = target.value
    
    }
  

    
    render() {
      return ( 
        <>
        {this.state.duration?
        <>
         <FormControl>
            <FormLabel>Selected Activity:</FormLabel>
            <Field title="Test date" value={this.props.selectedObject.name? this.props.selectedObject.name : "" } type="inputRead" />
        </FormControl>

        <FormControl>
            <FormLabel>Duration:</FormLabel>
            <Input name="duration" type="input" value={this.state.duration} onChange={(event) => this.handleInputChange(event)}  bg="white"/>
        </FormControl>
            
        <FormControl>
            <FormLabel>Time Unit:</FormLabel>
            <Select name="unit" placeholder={this.state.unit} onChange={(event) => this.handleInputChange(event)} bg="white">
                <option value='secs'>Seconds</option>
                <option value='mins'>Minutes</option>
            </Select>
        </FormControl>

        <FormControl>
            <FormLabel>Fix costs:</FormLabel>
            <Input name="cost" type="input" value={this.state.cost} onChange={(event) => this.handleInputChange(event)} bg="white"/>
        </FormControl>

        <FormControl>
            <FormLabel>Currency:</FormLabel>
            <Select name="currency" placeholder={this.state.currency} onChange={(event) => this.handleInputChange(event)} bg="white">
                <option value='euro'>euro</option>
                <option value='dollar'>dollar</option>
            </Select>
        </FormControl> </>: ""}
            
        </>
      );
    }
  }



export default Activity;