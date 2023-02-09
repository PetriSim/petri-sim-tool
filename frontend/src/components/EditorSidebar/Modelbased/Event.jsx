import { Input, FormControl, FormLabel, Flex, Button, Stack, Select, Box, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';

const Event = ({getData, selectedObject,setDataObj, setData }) => {
  const [unit, setUnit] = useState("");
  const [distributionType, setDistributionType] = useState("");
  const [distributionTypes, setDistributionTypes] = useState([
    { distribution_name: "exponential", distribution_params: ["mean"] },
    { distribution_name: "normal", distribution_params: ["mean", "standard deviation"] },
    { distribution_name: "uniform", distribution_params: ["min", "max"] },
    { distribution_name: "constant", distribution_params: ["constant value"] },
    { distribution_name: "erlang", distribution_params: ["order", "mean"] },
    { distribution_name: "triangular", distribution_params: ["lower", "peak", "upper"] },
    { distribution_name: "binomial", distribution_params: ["probabiliy", "amount"] },
    { distribution_name: "arbitraryFiniteProbabilityDistribution", distribution_params: [] },
  ]);
  const [distributionValues, setDistributionValues] = useState([]);

  useEffect(() => {
    const currentEvent = getData("currentModel").modelParameter.events.find(
      (value) => value.id === selectedObject.id
    );

    if (currentEvent === undefined) {
      setDataObj({});
      return;
    }


    let newTypes = distributionTypes;

    newTypes.find((dis) => dis.distribution_name === currentEvent.interArrivalTime.distributionType).distribution_params = currentEvent.interArrivalTime.values.map((v) => v.id);

    setUnit(currentEvent.unit);
    setDistributionType(currentEvent.interArrivalTime.distributionType);
    setDistributionValues(currentEvent.interArrivalTime.values.map((v) => v.value));
    setDistributionTypes(newTypes);
  }, []);

  const handleInputChange = (resource, index) => {
    const target = resource.target;
    const value = target.value;
    const name = target.name;

    if (name === "distributionType") {
      setDistributionValues(
        new Array(
          distributionTypes.find((dis) => dis.distribution_name === value).distribution_params.length
        ).fill(0)
      );
    }

  if(name === "distributionValues"){
      let newArr = [... distributionValues]
      newArr[index] = value

      setDistributionValues(newArr)
      
  } else{

    if (name === "unit") setUnit(value);
    if (name === "distributionType") setDistributionType(value);
  }

  }

  const changeValueAmount = (amount) => {
      let newTypes = [... distributionTypes]

      if(amount === 1){
          newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.push("entry" + (distributionTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.length +1))  
          setDistributionTypes(newTypes)
          distributionValues.push(0)
      } else{
          newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.pop()
          setDistributionTypes(newTypes)
          distributionValues.pop()
      }
    
  }

  const handleKeyChange = (resource, index) => {
      const target = resource.target;
      const value = target.value;     

      let params = [... distributionTypes]
      params.find(dis => dis.distribution_name === distributionType).distribution_params[index] = value
  
      setDistributionTypes(params)      
    }

  const onSubmit = (event) =>{
      event.preventDefault();
      
      const data = [...getData("allScenario")];
              
      let interArrivalTime = {
          distributionType: distributionType,
          values: distributionTypes.find(dis => dis.distribution_name === distributionType).distribution_params.map((key, index) => {return {id: key, value: distributionValues[index]}})
      }
    
      getData("currentModel").modelParameter.events.find(
        value => value.id === selectedObject.id
      ).interArrivalTime = interArrivalTime

      getData("currentModel").modelParameter.events.find(
        value => value.id === selectedObject.id
      ).unit = unit
     
      setData(data)
    }

  
    return (
        <Box w="100%">
        <form onSubmit={onSubmit}>
          <Stack gap="2">        
            <FormControl>
              <FormLabel>Selected Event:</FormLabel>
              <Input title="Test date" value={selectedObject.name ? selectedObject.name : ""} type="inputRead" readOnly/>
            </FormControl>

          <Text fontWeight="bold" fontSize="md">Interarrival Time:</Text>
          <Flex justifyContent="space-between">
            <FormControl w="47%">
              <FormLabel>Distribution:</FormLabel>
              <Select value={distributionType}  bg="white" name="distributionType" onChange={(event) => handleInputChange(event)} >
                {distributionTypes.map((distribution, index) => {
                    return <option value={distribution.distribution_name} key={index}>{distribution.distribution_name}</option>
                })}
            </Select>
          </FormControl>


          <FormControl w="47%"> 
                <FormLabel>Time Unit:</FormLabel>
            <Select name="unit" value={unit} onChange={(event) => handleInputChange(event)} bg="white">
                  <option value='secs'>secs</option>
                  <option value='mins'>mins</option>
              </Select>
            
            </FormControl>
          </Flex>

            {distributionType === "arbitraryFiniteProbabilityDistribution" ? 
             <ButtonGroup size='md' isAttached variant="outline" >
                <IconButton icon={<MinusIcon />} onClick={() => changeValueAmount(-1)} />
                <IconButton icon={<AddIcon />} onClick={() => changeValueAmount(1)} />
             </ButtonGroup>
          : ""}

          {distributionTypes.find((dis) => dis.distribution_name === distributionType) && distributionTypes.find(dis => dis.distribution_name === distributionType).distribution_params.map((key, index) => {

        
            return <>
        
            <Flex justifyContent="space-between">
                <FormControl w="47%">
                    <FormLabel>key:</FormLabel>
                    <Input value={key} bg="white"  name="distributionKey" onChange={(event) => handleKeyChange(event, index)} />
                </FormControl>

                <FormControl w="47%">
                    <FormLabel>value:</FormLabel>
                    <Input value={distributionValues[index]} bg="white" name="distributionValues" onChange={(event) => handleInputChange(event, index)} />
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



export default Event;
