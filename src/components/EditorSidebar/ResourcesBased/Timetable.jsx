import React from 'react'
import { Button, Input, FormControl, FormLabel, Select, Box, Stack, Switch } from '@chakra-ui/react';


class Timetable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        startWeekday: "Monday",
        startTime: "0",
        endWeekday: "Monday",
        endTime: "0",
        timetable: props.getData("currentScenario").resourceParameters.timeTables.map(item => item.id)[0],
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        hours: Array.from({ length: 24 }, (_, i) => i),
        existing: false,
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
            { id: "",
                startWeekday: "Monday",
                startTime: "0",
                endWeekday: "Monday",
                endTime: "0",
    
        })
      }

      onSubmit(event){
        event.preventDefault();
        
        let data = [...this.props.getData("allScenario")]


        if(this.state.existing){

          let obj = {
                startWeekday: this.state.startWeekday,
                startTime: this.state.startTime,
                endWeekday: this.state.endWeekday,
                endTime: this.state.endTime,
              }

          //this.props.getData("currentScenario").resourceParameters.timeTables.find(item => item.id === this.state.timetable).timeTableItems.push(obj)
          data[this.props.currentScenario].resourceParameters.timeTables.find(item => item.id === this.state.timetable).timeTableItems.push(obj)
        
        } else{ 

          let obj = {
            id: this.state.id,
            timeTableItems: [{
                startWeekday: this.state.startWeekday,
                startTime: this.state.startTime,
                endWeekday: this.state.endWeekday,
                endTime: this.state.endTime,
            }]}
            data[this.props.currentScenario].resourceParameters.timeTables.push(obj)
        
            //this.props.getData("currentScenario").resourceParameters.timeTables.push(obj)
        }

        this.props.setData(data)
        console.log(this.props.getData("currentScenario"))
        

        
        this.clear()
      }

      switch(event){
        this.setState({existing: !this.state.existing})
      }
      


render() {


    return (
        <>

<Box w="100%">
        <form onSubmit={this.onSubmit}>
        <Stack gap="2">

        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='existing' mb='0'>
            Add timetable to existing timetable?
          </FormLabel>
          <Switch id='existing' onChange={() => this.setState({existing: !this.state.existing})} value={this.state.existing}/>
        </FormControl>

        {this.state.existing?
        <FormControl >
              <FormLabel>Select timetable:</FormLabel>
              <Select value={this.state.timetable} bg="white" name="timetable" onChange={(event) => this.handleInputChange(event)} >
                {this.state.timeTables.map((id, index) => {
                    return <option value={id}>{id}</option>
                })}
            </Select>
        </FormControl>
        : ""}


        {!this.state.existing?
         <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={this.state.id} bg="white" name="id" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>
          :""}

          <FormControl>
              <FormLabel>Startweekday:</FormLabel>
              <Select placeholder={this.state.startWeekday} bg="white" name="startWeekday" onChange={(event) => this.handleInputChange(event)} >
                {this.state.days.map((day, index) => {
                    return <option value={day}>{day}</option>
                })}
            </Select>
          </FormControl>

          <FormControl >
              <FormLabel>Endweekday:</FormLabel>
              <Select placeholder={this.state.endWeekday} bg="white" name="endWeekday" onChange={(event) => this.handleInputChange(event)} >
                {this.state.days.map((day, index) => {
                    return <option value={day}>{day}</option>
                })}
            </Select>
        </FormControl>

          <FormControl >
              <FormLabel>Starttime:</FormLabel>
              <Select placeholder={this.state.startTime + ":00"} bg="white" name="startTime" onChange={(event) => this.handleInputChange(event)} >
                {this.state.hours.map((hour, index) => {
                    return <option value={hour}>{hour}:00</option>
                })}
            </Select>
        </FormControl>

        <FormControl >
              <FormLabel>Endtime:</FormLabel>
              <Select placeholder={this.state.endTime + ":00"} bg="white" name="endTime" onChange={(event) => this.handleInputChange(event)} >
                {this.state.hours.map((hour, index) => {
                    return <option value={hour}>{hour}:00</option>
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
export default Timetable;