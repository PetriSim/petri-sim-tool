import React from 'react'
import { Button, Input, FormControl, FormLabel, Divider,CheckboxGroup, Checkbox, Stack, Box, Select  } from '@chakra-ui/react';

class ResourceParameters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        costHour: "",
        schedule: "",
        timeTables: props.getData("currentScenario").resourceParameters.timeTables.map(item => item.id),
        roles: props.getData("currentScenario").resourceParameters.roles.map(item => item.id),
        selectedRoles: []
      };  
      this.onSubmit = this.onSubmit.bind(this);

      this.delete = this.delete.bind(this);
    }

    componentDidMount(){
      if(this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource)){
        console.log("test")
        this.setState({
          id: this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource).id,
            costHour: this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource).costHour,
            schedule: this.props.getData("currentScenario").resourceParameters.resources.find((value) => value.id === this.props.currentResource).schedule,
            selectedRoles: this.props.getData("currentScenario").resourceParameters.roles.filter(item => item.resources.some(x => x.id === this.props.currentResource)).map(x => x.id),
          })
          console.log(this.state)
      } 
    }

    handleRolesChange(event){
      let value = event.pop()



      if(this.state.selectedRoles.includes(value)){
        this.setState({
          selectedRoles: [...this.state.selectedRoles.filter(item => item === value)]
        });
      } else{
        this.setState({
          selectedRoles: [...this.state.selectedRoles, value]
        });
      }
    }

    handleInputChange(resource) {
        const target = resource.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      onSubmit(event){
        event.preventDefault();

        
        let data = [... this.props.getData("allScenario")]

  
       
        data[this.props.currentScenario].resourceParameters.resources.find((value) => value.id === this.props.currentResource).id = this.state.id
        data[this.props.currentScenario].resourceParameters.resources.find((value) => value.id === this.state.id).costHour = this.state.costHour                                                              
        data[this.props.currentScenario].resourceParameters.resources.find((value) => value.id === this.state.id).schedule = this.state.schedule                                                                                       
        
        data[this.props.currentScenario].resourceParameters.roles.forEach(obj => {
          obj.resources = obj.resources.filter(resource => resource.id !== this.props.currentResource);
        });
        
    
        
        this.state.selectedRoles.filter(x => x !== undefined).forEach(item => {
          data[this.props.currentScenario].resourceParameters.roles.find(x => x.id === item).resources.push({id: this.state.id})
        })

         console.log(data)

        this.props.setData(data)

      }

      delete(){

        let data = [... this.props.getData("allScenario")]

   

        data[this.props.currentScenario].resourceParameters.roles.forEach(obj => {
          obj.resources = obj.resources.filter(resource => resource.id !== this.state.id);
        });

        data[this.props.currentScenario].resourceParameters.resources = data[this.props.currentScenario].resourceParameters.resources.filter(resource => resource.id !== this.state.id);
       

        console.log(data[this.props.currentScenario].resourceParameters)
        this.props.setData(data)
        
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
        <Box w="100%">
        {this.state.id !== "" ?
        <>
         <form onSubmit={this.onSubmit}>
         <Stack gap="2" mt="4">
         <FormControl >
              <FormLabel>Resource Name:</FormLabel>
              <Input value={this.state.id}  bg="white"  name="id" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Cost per Hour:</FormLabel>
              <Input value={this.state.costHour} bg="white"  name="costHour" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl >
              <FormLabel>Timetable:</FormLabel>
              <Select value={this.state.schedule} bg="white" name="schedule" onChange={(event) => this.handleInputChange(event)} >
                {this.state.timeTables.map((id, index) => {
                    return <option value={id} key={index}>{id}</option>
                })}
            </Select>
         </FormControl>

          <FormControl >
            <FormLabel>Select roles:</FormLabel>
            <CheckboxGroup colorScheme='green' value={this.state.selectedRoles} name="selectedRoles" onChange={(event) => this.handleRolesChange(event)}>
              <Stack spacing={[1, 5]} direction="column">
              {this.state.roles.map((id, index) => {
                      return <Checkbox value={id} key={index}>{id}</Checkbox>
                  })}
              </Stack>
            </CheckboxGroup>
          </FormControl>


          <Button 
              type="submit"
              colorScheme='#ECF4F4'
              w="100%"
              variant='outline'
              border='1px'
              borderColor='#B4C7C9'
              color ='#6E6E6F'
              _hover={{ bg: '#B4C7C9' }}> Save changes </Button> 


          <Button colorScheme='red' variant='outline' w="100%" onClick={this.delete}>Delete resource</Button>
        
              </Stack>
        </form>
        
        </>
        : ""}
        </Box>
        </>
       
    )
}
}
export default ResourceParameters;