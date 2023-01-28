import React from 'react'
import { Input, FormControl, FormLabel, Flex, Button, Stack } from '@chakra-ui/react';

class EditScenario extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        scenarioName: "",
        startingDate: "",
        startingTime: "",
        numberOfInstances: "",
        interArrivalTime:"",
        values:"",
        timeUnit:"",
        distributionType: ""
      };

      this.onSubmit = this.onSubmit.bind(this);
      
    }

    componentDidMount(){
        this.setState({
            scenarioName: this.props.getData("allData")[this.props.selectedScenario].scenarioName,
            startingDate: this.props.getData("allData")[this.props.selectedScenario].startingDate,
            startingTime: this.props.getData("allData")[this.props.selectedScenario].startingTime,
            numberOfInstances: this.props.getData("allData")[this.props.selectedScenario].numberOfInstances,
            interArrivalTime: this.props.getData("allData")[this.props.selectedScenario].interArrivalTime,
            values: this.props.getData("allData")[this.props.selectedScenario].values,
            timeUnit: this.props.getData("allData")[this.props.selectedScenario].timeUnit,
            distributionType: this.props.getData("allData")[this.props.selectedScenario].interArrivalTime.distributionType
          })
          console.log(this.state)
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
        


        let data = [...this.props.getData("allData")]
                  
            let obj = data[this.props.selectedScenario]

            obj.scenarioName = this.state.scenarioName
            obj.startingDate = this.state.startingDate
            obj.startingTime = this.state.startingTime
            obj.numberOfInstances = this.state.numberOfInstances
            obj.interArrivalTime= this.state.interArrivalTime
            obj.values = this.state.values
            obj.timeUnit = this.state.timeUnit
            obj.distributionType = this.state.distributionType

            data[this.props.selectedScenario] = obj

    
          
        this.props.setData(data)
        console.log(this.props.getData("allData"))
 

        
      }


render() {

    return (
        <>

        <Button onClick={() => this.props.setCurrent("Add Scenario")}
                colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Add Scenario </Button> 
                

        
        <form onSubmit={this.onSubmit}>
        <Stack gap="2">        
         <FormControl>
              <FormLabel>Scenario Name:</FormLabel>
              <Input value={this.state.scenarioName} bg="white" name="scenarioName" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Starting Date:</FormLabel>
              <Input value={this.state.startingDate} bg="white" type="inputRead" name="startingDate" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Starting time:</FormLabel>
              <Input value={this.state.startingTime} bg="white"  type="inputRead" name="startingTime" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Number of Process Instances:</FormLabel>
              <Input value={this.state.numberOfInstances} bg="white" type="inputRead"  name="numberOfInstances" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Interarrival Time:</FormLabel>
              <Input value={this.state.distributionType} bg="white" type="inputRead"  name="distributionType" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

        <Flex justifyContent="space-between">
            <FormControl w="47%">
                <FormLabel>Value:</FormLabel>
                <Input value={this.state.values} bg="white" type="inputRead" />
            </FormControl>

            <FormControl w="47%"> 
                <FormLabel>Time Unit:</FormLabel>
                <Input value={this.state.timeUnit} bg="white" type="inputRead" name="timeUnit" onChange={(event) => this.handleInputChange(event)} />
            </FormControl>
        </Flex>


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
        </>
    )
}
}



export default EditScenario;