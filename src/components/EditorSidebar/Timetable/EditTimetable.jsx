import React from 'react'
import { Button, Input, FormControl, FormLabel, Select, Box, Stack } from '@chakra-ui/react';


class EditTimetable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        startWeekday: "",
        startTime: "",
        endWeekday: "",
        endTime: "",
        timetable: props.getData("currentScenario").resourceParameters.timeTables.map(item => item.id)[0],
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        hours: Array.from({ length: 24 }, (_, i) => i),
        existing: false,
        timeTables: props.getData("currentScenario").resourceParameters.timeTables.map(item => item.id),
        items: [],
        selectedItem: 0,
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.clear = this.clear.bind(this);  
    }

    componentDidMount(){

      console.log(this.props.currentTimetable)

      if(this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable)){
        
        this.setState({
            id: this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable).id,
            items: this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable).timeTableItems.map((_, index) => index),
            startWeekday: this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable).timeTableItems[this.state.selectedItem].startWeekday,
            endWeekday: this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable).timeTableItems[this.state.selectedItem].endWeekday,
            startTime: this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable).timeTableItems[this.state.selectedItem].startTime,
            endTime: this.props.getData("currentScenario").resourceParameters.timeTables.find((value) => value.id === this.props.currentTimetable).timeTableItems[this.state.selectedItem].endTime
          })
      } 
    }

    handleInputChange(resource) {
        const target = resource.target;
        const value = target.value;
        const name = target.name;
    

        if(name === "selectedItem"){
          this.setState({
          startWeekday: this.props.getData("currentScenario").resourceParameters.timeTables.find((v) => v.id === this.props.currentTimetable).timeTableItems[value].startWeekday,
          endWeekday: this.props.getData("currentScenario").resourceParameters.timeTables.find((v) => v.id === this.props.currentTimetable).timeTableItems[value].endWeekday,
          startTime: this.props.getData("currentScenario").resourceParameters.timeTables.find((v) => v.id === this.props.currentTimetable).timeTableItems[value].startTime,
          endTime: this.props.getData("currentScenario").resourceParameters.timeTables.find((v) => v.id === this.props.currentTimetable).timeTableItems[value].endTime,
          selectedItem: value,
        })

        console.log("Änderung")
        } 
        else
        {
          this.setState({
            [name]: value,
          })
        }
 
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
        
          let obj = {
                startWeekday: this.state.startWeekday,
                startTime: this.state.startTime,
                endWeekday: this.state.endWeekday,
                endTime: this.state.endTime,
              }

          
          data[this.props.currentScenario].resourceParameters.timeTables.find(item => item.id === this.props.currentTimetable).timeTableItems[this.state.selectedItem] = obj
          
          data[this.props.currentScenario].resourceParameters.timeTables.find(item => item.id === this.props.currentTimetable).id = this.state.id
          this.props.setTimetable(this.state.id)

        this.props.setData(data)
        console.log(this.props.getData("currentScenario"))

        console.log(this.props.currentTimetable)
        
      }

render() {
    return (
        <>

<Button onClick={() => this.props.setCurrent("Add Timetable")}
                colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Add timetable </Button> 


<Box w="100%">
        <form onSubmit={this.onSubmit}>
        <Stack gap="2">        
         <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={this.state.id} bg="white" name="id" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

        {(this.state.items.length > 1)? 
        <FormControl >
              <FormLabel>Select timetable-item:</FormLabel>
              <Select placeholfer={this.state.selectedItem} bg="white" name="selectedItem" onChange={(event) => this.handleInputChange(event)} >
                {this.state.items.map((id, index) => {
                    return <option value={id}>{id + 1}</option>
                })}
            </Select>
        </FormControl>
        : ""}
    
          <FormControl>
              <FormLabel>Startweekday:</FormLabel>
              <Select value={this.state.startWeekday} bg="white" name="startWeekday" onChange={(event) => this.handleInputChange(event)} >
                {this.state.days.map((day, index) => {
                    return <option value={day}>{day}</option>
                })}
            </Select>
          </FormControl>

          <FormControl >
              <FormLabel>Endweekday:</FormLabel>
              <Select value={this.state.endWeekday} bg="white" name="endWeekday" onChange={(event) => this.handleInputChange(event)} >
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
              _hover={{ bg: '#B4C7C9' }}> Save changes </Button> 
      
      </Stack>
      </form>
      </Box>
        </>
    )
}
}
export default EditTimetable;