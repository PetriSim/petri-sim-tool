import React from 'react'
import { Input, FormControl, FormLabel, Flex, Button, Stack, Select, Text, ButtonGroup, IconButton,  Accordion, Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

class AddScenario extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        scenarioName: "",
        startingDate: "",
        startingTime: "",
        currency: "",
        numberOfInstances: "",
        interArrivalTime: {},
        values:"",
        timeUnit:"",
        distributionType: "",
        startScenario: 0,
        distributionTypes: [{distribution_name: "exponential", distribution_params: ["mean"]},
                        {distribution_name: "normal", distribution_params: ["mean", "standard deviation"]},
                        {distribution_name: "uniform", distribution_params: ["min", "max"]},
                        {distribution_name: "constant", distribution_params: ["constant value"]},
                        {distribution_name: "erlang", distribution_params: ["order", "mean"]},
                        {distribution_name: "triangular", distribution_params: ["lower", "peak", "upper"]},
                        {distribution_name: "binomial", distribution_params: ["probabiliy", "amount"]},
                        {distribution_name: "arbitraryFiniteProbabilityDistribution", distribution_params: []}
                    ],
        distributionValues: []
        
      }
    
      

      this.onSubmit = this.onSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.changeValueAmount = this.changeValueAmount.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);      
    }
   

    componentDidMount(){

        let newTypes = this.state.distributionTypes

        if(this.props.getData("allData")[this.state.startScenario].interArrivalTime.distributionType === "arbitraryFiniteProbabilityDistribution"){
         newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params = this.props.getData("allData")[this.state.startScenario].interArrivalTime.values.map(v => v.id) 
          
        }
        

        this.setState({
            scenarioName: this.props.getData("allData")[this.state.startScenario].scenarioName,
            startingDate: this.props.getData("allData")[this.state.startScenario].startingDate,
            startingTime: this.props.getData("allData")[this.state.startScenario].startingTime,
            currency: this.props.getData("allData")[this.state.startScenario].currency,
            numberOfInstances: this.props.getData("allData")[this.state.startScenario].numberOfInstances,
            interArrivalTime: this.props.getData("allData")[this.state.startScenario].interArrivalTime,
            values: this.props.getData("allData")[this.state.startScenario].interArrivalTime,
            timeUnit: this.props.getData("allData")[this.state.startScenario].timeUnit,
            distributionType: this.props.getData("allData")[this.state.startScenario].interArrivalTime.distributionType,
            //distributionValues: new Array(this.state.distributionTypes.find(dis => dis.distribution_name === this.props.getData("allData")[this.state.startScenario].interArrivalTime.distributionType).distribution_params.length).fill(0),
            distributionValues: this.props.getData("allData")[this.state.startScenario].interArrivalTime.values.map(v => v.value),
            distributionTypes: newTypes
            
          })
        
    console.log(this.state)  
    }

    handleInputChange(resource, index) {
      const target = resource.target;
      const value = target.value;
      const name = target.name;


  

      if(name === "startScenario"){
        this.state.startScenario = value

        let newTypes = this.state.distributionTypes

        if(this.props.getData("allData")[this.state.startScenario].interArrivalTime.distributionType === "arbitraryFiniteProbabilityDistribution"){
         newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params = this.props.getData("allData")[this.state.startScenario].interArrivalTime.values.map(v => v.id) 
          
        }

        

        this.setState({
            scenarioName: this.props.getData("allData")[this.state.startScenario].scenarioName,
            startingDate: this.props.getData("allData")[this.state.startScenario].startingDate,
            startingTime: this.props.getData("allData")[this.state.startScenario].startingTime,
            currency: this.props.getData("allData")[this.state.startScenario].currency,
            numberOfInstances: this.props.getData("allData")[this.state.startScenario].numberOfInstances,
            interArrivalTime: this.props.getData("allData")[this.state.startScenario].interArrivalTime,
            values: this.props.getData("allData")[this.state.startScenario].interArrivalTime.values,
            timeUnit: this.props.getData("allData")[this.state.startScenario].timeUnit,
            distributionValues: this.props.getData("allData")[this.state.startScenario].interArrivalTime.values.map(v => v.value),
            distributionType: this.props.getData("allData")[this.state.startScenario].interArrivalTime.distributionType,
            distributionTypes: newTypes
          })
          console.log(this.state)
      }

      this.setState({
        [name]: value
      });

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
    }

      this.props.setCurrent("Add Scenario")

      

    
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

    onSubmit(event){
        event.preventDefault();
        


        let data = [...this.props.getData("allData")]
                  
            let obj = JSON.parse(JSON.stringify(data[this.state.startScenario]))

            let interArrivalTime = {
                distributionType: this.state.distributionType,
                values: this.state.distributionTypes.find(dis => dis.distribution_name === this.state.distributionType).distribution_params.map((key, index) => {return {id: key, value: this.state.distributionValues[index]}})
            }

            obj.scenarioName = this.state.scenarioName
            obj.startingDate = this.state.startingDate
            obj.currency = this.state.currency
            obj.startingTime = this.state.startingTime
            obj.numberOfInstances = this.state.numberOfInstances
            obj.interArrivalTime= interArrivalTime
           
            obj.timeUnit = this.state.timeUnit
        

            data.push(obj)

    
          
        this.props.setData(data)
        console.log(this.props.getData("allData"))
 

        
      }

      
      handleKeyChange(resource, index) {

        const target = resource.target;
        const value = target.value;
        const name = target.name;

        let params = this.state.distributionTypes
        params.find(dis => dis.distribution_name === this.state.distributionType).distribution_params[index] = value

        this.setState({distributionTypes: params})


        console.log(params)

      }

render() {

    return (
        <>
<Box w="100%">
        <Button onClick={() => this.props.setCurrent("Edit Scenario")}
                colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Edit Scenario </Button> 
                

        
        <form onSubmit={this.onSubmit}>
        <Stack gap="2" mt="2">      

        <FormControl >
              <FormLabel>Select the startup scenario:</FormLabel>
              <Select placeholder={this.state.startScenario} defaultValue={this.state.startScenario} bg="white" name="startScenario" onChange={(event) => this.handleInputChange(event)} >
                {this.props.getData("allData").map((scenario, index) => {
                    return <option value={index}>{scenario.scenarioName}</option>
                })}
            </Select>
        </FormControl>

        <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    General Parameters
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <FormControl>
              <FormLabel>Scenario Name:</FormLabel>
              <Input value={this.state.scenarioName} bg="white" name="scenarioName" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Starting Date:</FormLabel>
              <Input value={this.state.startingDate} bg="white"  name="startingDate" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Starting time:</FormLabel>
              <Input value={this.state.startingTime} bg="white"   name="startingTime" onChange={(event) => this.handleInputChange(event)}/>
          </FormControl>

          <FormControl>
              <FormLabel>Number of Process Instances:</FormLabel>
              <Input value={this.state.numberOfInstances} bg="white"   name="numberOfInstances" onChange={(event) => this.handleInputChange(event)} />
          </FormControl>

          <FormControl>
          <FormLabel>Currency:</FormLabel>
              <Select name="currency" value={this.state.currency} bg="white"   onChange={(event) => this.handleInputChange(event)} >
                <option value='euro'>euro</option>
                <option value='dollar'>dollar</option>
                <option value='money unit'>money unit</option>
              </Select>
          </FormControl> 
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Interarrival time
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
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
            <Select name="timeUnit" value={this.state.timeUnit} onChange={(event) => this.handleInputChange(event)} bg="white">
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
                    <Input value={key} bg="white"   name="distributionKey" onChange={(event) => this.handleKeyChange(event, index)} />
                </FormControl>

                <FormControl w="47%">
                    <FormLabel>value:</FormLabel>
                    <Input value={this.state.distributionValues[index]} bg="white"  name="distributionValues" onChange={(event) => this.handleInputChange(event, index)} />
                </FormControl>
            </Flex></>

            })} 

              </AccordionPanel>
            </AccordionItem>
          </Accordion>


        <>
         

          
          

        <Button 
              type="submit"
              colorScheme='#ECF4F4'
              w="100%"
              variant='outline'
              border='1px'
              borderColor='#B4C7C9'
              color ='#6E6E6F'
              _hover={{ bg: '#B4C7C9' }}> Add scenario </Button> 

        </>
            

        </Stack>
            </form>
            </Box>
        </>
    )
}
}



export default AddScenario;