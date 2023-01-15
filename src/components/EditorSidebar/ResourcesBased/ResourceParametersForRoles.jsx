import React from 'react'
import { Button, Input, FormControl, FormLabel, Divider } from '@chakra-ui/react';



class ResourceParametersForRoles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfInstances: "",
        schedule: ""
      };
  
    }



    componentDidMount(){

      if(this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentRole)){
        this.setState({
            numberOfInstances: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentRole).numberOfInstances,
            schedule: this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentRole).schedule
          
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
  
        this.props.getData("currentScenario").resourceParameters.roles.find((value) => value.id === this.props.currentRole)[name] = target.value
      
      }



render() {


    return (
        <>

        <Button onClick={() => this.props.setCurrent("Add Resource")}
                colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Add resource </Button> 

        <Button onClick={() => this.props.setCurrent("Add Role")}
               colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Add role </Button> 

        <Divider/>
         <FormControl >
              <FormLabel>Role Name:</FormLabel>
              <Input title="Test date" value={this.props.currentRole} type="inputRead" />
          </FormControl>

          <FormControl >
              <FormLabel>Number of Instances:</FormLabel>
              <Input title="Test date" value={this.state.numberOfInstances} bg="white" name = "numberOfInstances" onChange={(event) => this.handleInputChange(event)}  />
          </FormControl>

          <FormControl >
              <FormLabel>Timetable:</FormLabel>
              <Input title="Test date" value={this.state.schedule} bg="white" name = "schedule" onChange={(event) => this.handleInputChange(event)}  />
          </FormControl>

        </>
    )
}
}
export default ResourceParametersForRoles;