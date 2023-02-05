import { Input, FormControl, FormLabel, Flex, Button, Stack, Select, Box, ButtonGroup, IconButton, Text} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React from 'react';

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interArrivalTime:"",
      values:"",
      unit:"",
      distributionType: "",
      distributionTypes: [
                              {distribution_name: "exponential", distribution_params: ["mean"]},
                              {distribution_name: "normal", distribution_params: ["mean", "standard deviation"]},
                              {distribution_name: "uniform", distribution_params: ["min", "max"]},
                              {distribution_name: "constant", distribution_params: ["constant value"]},
                              {distribution_name: "erlang", distribution_params: ["order", "mean"]},
                              {distribution_name: "triangular", distribution_params: ["lower", "peak", "upper"]},
                              {distribution_name: "binomial", distribution_params: ["probabiliy", "amount"]},
                              {distribution_name: "arbitraryFiniteProbabilityDistribution", distribution_params: []}
                           ],
      distributionValues: [],
      currentEvent: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeValueAmount = this.changeValueAmount.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this); 
    this.handleInputChange = this.handleInputChange.bind(this);    
  }

    componentDidMount(){
      const currentEvent = this.props.getData("currentModel").modelParameter.events.find(
        value => value.id === this.props.selectedObject.id
      );

      this.setState({currentEvent: currentEvent})


      let newTypes = this.state.distributionTypes

      
       newTypes.find(dis => dis.distribution_name === currentEvent.interArrivalTime.distributionType).distribution_params = currentEvent.interArrivalTime.values.map(v => v.id) 
        
      
      this.setState({
          interArrivalTime: currentEvent.interArrivalTime,
          values: currentEvent.interArrivalTime.values,
          unit: currentEvent.unit,
          distributionType: currentEvent.interArrivalTime.distributionType,
          distributionValues: currentEvent.interArrivalTime.values.map(v => v.value),
          distributionTypes: newTypes
        })

  }

  handleInputChange(resource, index) {
    const target = resource.target;
    const value = target.value;
    const name = target.name;

    if(name === "distributionType"){
      this.setState({
          distributionValues: new Array(this.state.distributionTypes.find(dis => dis.distribution_name === value).distribution_params.length).fill(0)
      })  
  }

  if(name === "distributionValues"){
      let newArr = this.state.distributionValues
      newArr[index] = value

      this.setState({
          distributionValues: newArr
      })
  } else{

    this.setState({
      [name]: value
    });

  }

  
  }

  changeValueAmount(amount){
      if(amount === 1){
          let newTypes = this.state.distributionTypes
          newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.push("entry" + (this.state.distributionTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.length +1))
         

          this.setState({distributionTypes: newTypes})
          this.state.distributionValues.push(0)
      } else{

          let newTypes = this.state.distributionTypes
          newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.pop()
         

          this.setState({distributionTypes: newTypes})
          this.state.distributionValues.pop()
      }
    
  }

  handleKeyChange(resource, index) {

      const target = resource.target;
      const value = target.value;
     

      let params = this.state.distributionTypes
      params.find(dis => dis.distribution_name === this.state.distributionType).distribution_params[index] = value

      this.setState({distributionTypes: params})


      console.log(params)

      
    }

  onSubmit(event){
      event.preventDefault();
      
      const data = [...this.props.getData("allScenario")];
                

      let interArrivalTime = {
          distributionType: this.state.distributionType,
          values: this.state.distributionTypes.find(dis => dis.distribution_name === this.state.distributionType).distribution_params.map((key, index) => {return {id: key, value: this.state.distributionValues[index]}})
      }
    
      this.props.getData("currentModel").modelParameter.events.find(
        value => value.id === this.props.selectedObject.id
      ).interArrivalTime = interArrivalTime

      this.props.getData("currentModel").modelParameter.events.find(
        value => value.id === this.props.selectedObject.id
      ).unit = this.state.unit
     

  
      this.props.setData(data)
      console.log(this.props.getData("allData"))      
    }

  render() {
    return (
        <Box w="100%">
        <form onSubmit={this.onSubmit}>
          <Stack gap="2">        
            <FormControl>
              <FormLabel>Selected Event:</FormLabel>
              <Input title="Test date" value={this.props.selectedObject.name ? this.props.selectedObject.name : ""} type="inputRead" />
            </FormControl>

          <Text fontWeight="bold" fontSize="md">Interarrival Time:</Text>
          <Flex justifyContent="space-between">
            <FormControl w="47%">
              <FormLabel>Distribution:</FormLabel>
              <Select value={this.state.distributionType}  bg="white" name="distributionType" onChange={(event) => this.handleInputChange(event)} >
                {this.state.distributionTypes.map((distribution, index) => {
                    return <option value={distribution.distribution_name}>{distribution.distribution_name}</option>
                })}
            </Select>
          </FormControl>


          <FormControl w="47%"> 
                <FormLabel>Time Unit:</FormLabel>
            <Select name="unit" value={this.state.unit} onChange={(event) => this.handleInputChange(event)} bg="white">
                  <option value='secs'>secs</option>
                  <option value='mins'>mins</option>
              </Select>
            
            </FormControl>
          </Flex>

            {this.state.distributionType === "arbitraryFiniteProbabilityDistribution" ? 
             <ButtonGroup size='md' isAttached variant="outline" >
                <IconButton icon={<MinusIcon />} onClick={() => this.changeValueAmount(-1)} />
                <IconButton icon={<AddIcon />} onClick={() => this.changeValueAmount(1)} />
             </ButtonGroup>
          : ""}

          {this.state.distributionTypes.find((dis) => dis.distribution_name === this.state.distributionType) && this.state.distributionTypes.find(dis => dis.distribution_name === this.state.distributionType).distribution_params.map((key, index) => {

        
            return <>
        
            <Flex justifyContent="space-between">
                <FormControl w="47%">
                    <FormLabel>key:</FormLabel>
                    <Input value={key} bg="white"  name="distributionKey" onChange={(event) => this.handleKeyChange(event, index)} />
                </FormControl>

                <FormControl w="47%">
                    <FormLabel>value:</FormLabel>
                    <Input value={this.state.distributionValues[index]} bg="white" name="distributionValues" onChange={(event) => this.handleInputChange(event, index)} />
                </FormControl>
            </Flex></>

            })}

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
    );
  }

}

export default Event;
