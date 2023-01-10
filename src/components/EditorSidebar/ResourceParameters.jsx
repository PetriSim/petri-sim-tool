import React from 'react'
import { Button, Input, FormControl, FormLabel, Select } from '@chakra-ui/react';



class ResourceParameters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfInstances: "",
        costHour: "",
        schedule: ""
      };
  
    }



    componentDidMount(){
        console.log(this.props.getData("currentScenario").resourceParameters.roles)
        console.log(this.props.currentResource)
      if(this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource)){
        this.setState({
            numberOfInstances: this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource).numberOfInstances,
            costHour: this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource).costHour,
            schedule: this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource).schedule
          
          })
          console.log(this.state)
      }
    }

    handleInputChange(resource) {
        const target = resource.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
  
        this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource)[name] = target.value
      
      }



render() {


    return (
        <>

        <Button colorScheme='#ECF4F4'
                variant='outline'
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Add Resources </Button> 

         <FormControl >
              <FormLabel>Resource Name:</FormLabel>
              <Input title="Test date" value={this.props.currentResource} type="inputRead" />
          </FormControl>

          <FormControl>
              <FormLabel>Cost per Hour:</FormLabel>
              <Input title="Test date" value={this.state.costHour} bg="white"  name="costHour" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl >
              <FormLabel>Timetable:</FormLabel>
              <Input title="Test date" value={this.state.schedule} bg="white" name = "schedule" onChange={(event) => this.handleInputChange(event)}  />
          </FormControl>

        </>
    )
}
}
export default ResourceParameters;