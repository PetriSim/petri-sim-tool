import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react'
import Field from '../../Field';


class Activity extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        duration: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).duration,
        unit: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).unit,
        cost: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).cost,
        currency: this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id).currency
    };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      this.props.getData("currentModel").parameters.modelParameter.activities.find((value) => value.id === this.props.selectedObject.id)[name] = target.value
      console.log(this.props.getData(""))
    }
  
    render() {
      return ( 
        <>
         <FormControl>
            <FormLabel>Selected Activity:</FormLabel>
            <Field title="Test date" value={this.props.selectedObject.name? this.props.selectedObject.name : "" } type="inputRead" />
        </FormControl>

        <FormControl>
            <FormLabel>Duration:</FormLabel>
            <Input name="duration" type="input" value={this.state.duration} onChange={this.handleInputChange}  bg="white"/>
        </FormControl>
            
        <FormControl>
            <FormLabel>Time Unit:</FormLabel>
            <Select name="unit" placeholder={this.state.unit} onChange={this.handleInputChange} bg="white">
                <option value='secs'>Seconds</option>
                <option value='mins'>Minutes</option>
            </Select>
        </FormControl>

        <FormControl>
            <FormLabel>Fix costs:</FormLabel>
            <Input name="cost" type="input" value={this.state.cost} onChange={this.handleInputChange} bg="white"/>
        </FormControl>

        <FormControl>
            <FormLabel>Currency:</FormLabel>
            <Select name="currency" placeholder={this.state.currency} onChange={this.handleInputChange} bg="white">
                <option value='euro'>euro</option>
                <option value='dollar'>dollar</option>
            </Select>
        </FormControl>
            
        </>
      );
    }
  }



export default Activity;