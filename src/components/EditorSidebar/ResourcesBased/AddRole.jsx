import React from 'react'
import { Button, Input, FormControl, FormLabel, Select, Divider, Switch, Stack, Box } from '@chakra-ui/react';


class AddRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      schedule: "",
      numberOfInstances: "",
      timeTables: props.getData("currentScenario").resourceParameters.timeTables.map(item => item.id)
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

    clear(){
      this.setState(
          {  
            id: "",
            schedule: "",
            numberOfInstances: ""
          })
    }

    onSubmit(event){
      event.preventDefault();
      
      let data = [...this.props.getData("allScenario")]

      console.log(data)

        let obj = {
              id: this.state.id,
              schedule: this.state.schedule,
              numberOfInstances: this.state.numberOfInstances,
              resources: []
            }

       
        data[this.props.currentScenario].resourceParameters.roles.push(obj)
      
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
              <FormLabel>Number of instances:</FormLabel>
              <Input value={this.state.numberOfInstances} bg="white" name="numberOfInstances" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>
         
          <FormControl >
              <FormLabel>Select timetable:</FormLabel>
              <Select value={this.state.schedule} bg="white" name="schedule" onChange={(event) => this.handleInputChange(event)} >
                {this.state.timeTables.map((id, index) => {
                    return <option value={id}>{id}</option>
                })}
            </Select>
        </FormControl>

        <Button 
              type="submit"
              colorScheme='#ECF4F4'
              w="100%"
              variant='outline'
              border='1px'
              borderColor='#B4C7C9'
              color ='#6E6E6F'
              _hover={{ bg: '#B4C7C9' }}> Add timetable </Button> 
      
      </Stack>
      </form>
      </Box>
        </>
    )
}
}
export default AddRole;