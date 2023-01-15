import React from 'react'
import { Button, Input, FormControl, FormLabel, Select, Switch, Stack, Box, Divider,CheckboxGroup, Checkbox } from '@chakra-ui/react';


class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      costHour: "",
      timeTables: props.getData("currentScenario").resourceParameters.timeTables.map(item => item.id),
      roles: props.getData("currentScenario").resourceParameters.roles.map(item => item.id),
      selectedRoles: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.clear = this.clear.bind(this);  
  }

  handleInputChange(resource) {
      const target = resource.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      console.log(this.state)
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

    clear(){
      this.setState(
          {  
            id: "",
            costHour: "",
            selectedRoles: []
          })
    }

    onSubmit(event){
      event.preventDefault();
      
      let data = [...this.props.getData("allScenario")]

      console.log(this.state.selectedRoles)

        let obj = {
              id: this.state.id,
              costHour: this.state.costHour,
            }

       
        data[this.props.currentScenario].resourceParameters.resources.push(obj)

        this.state.selectedRoles.filter(x => x !== undefined).forEach(item => {
          data[this.props.currentScenario].resourceParameters.roles.find(x => x.id === item).resources.push({id: this.state.id})
        })
      
        console.log(data)

      this.props.setData(data)
      console.log(this.props.getData("currentScenario"))
      

      
      this.clear()
    }



render() {


    return (
        <>

<Box w="100%">


<Button onClick={() => this.props.setCurrent("Resource Parameters")}
                colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Back </Button> 

          <Divider/>

          
        <form onSubmit={this.onSubmit}>
        <Stack gap="2" mt="4">


         <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={this.state.id} bg="white" name="id" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Cost per hour:</FormLabel>
              <Input value={this.state.costHour} bg="white" name="costHour" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>
         
        <FormControl >
        <FormLabel>Select roles:</FormLabel>
          <CheckboxGroup colorScheme='green' value={this.state.selectedRoles} name="selectedRoles" onChange={(event) => this.handleRolesChange(event)}>
            <Stack spacing={[1, 5]} direction="column">
            {this.state.roles.map((id, index) => {
                    return <Checkbox value={id}>{id}</Checkbox>
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
              _hover={{ bg: '#B4C7C9' }}> Add resource </Button> 
      
      </Stack>
      </form>
      </Box>
        </>
    )
}
}
export default AddResource;