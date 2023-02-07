import { Input, FormControl, FormLabel, Select, Stack, Button, Box,  ButtonGroup, IconButton, Text, Flex, Divider,  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const Activity = ({ getData, setData, selectedObject, currentScenario, currentBpmn, setDataObj }) => {
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("");
  const [resources, setResources] = useState([]);
  const [values, setValues] = React.useState("");

  const [duration, setDuration] = useState("");
  const [distributionType, setDistributionType] = React.useState("");
  const [distributionTypes, setDistributionTypes] = React.useState([
    { distribution_name: "exponential", distribution_params: ["mean"] },
    { distribution_name: "normal", distribution_params: ["mean", "standard deviation"] },
    { distribution_name: "uniform", distribution_params: ["min", "max"] },
    { distribution_name: "constant", distribution_params: ["constant value"] },
    { distribution_name: "erlang", distribution_params: ["order", "mean"] },
    { distribution_name: "triangular", distribution_params: ["lower", "peak", "upper"] },
    { distribution_name: "binomial", distribution_params: ["probabiliy", "amount"] },
    {
      distribution_name: "arbitraryFiniteProbabilityDistribution",
      distribution_params: [],
    },
  ]);
  const [distributionValues, setDistributionValues] = React.useState([]);


  useEffect(() => {
   

    const currentActivity = getData("currentModel").modelParameter.activities.find(
      value => value.id === selectedObject.id
    );

    let newTypes = distributionTypes;

    console.log("a")
    console.log(selectedObject)
    console.log(getData("currentModel").modelParameter.activities)
    console.log(currentActivity)

    if(currentActivity === undefined){
      setDataObj({})
      return
    }
    
      newTypes.find(
        (dis) => dis.distribution_name === currentActivity.duration.distributionType
      ).distribution_params = currentActivity.duration.values.map((v) => v.id);
    

    

    if (currentActivity) {
      setUnit(currentActivity.unit);
      setCost(currentActivity.cost);
      setCurrency(currentActivity.currency);
      setResources(currentActivity.resources);

      setDuration(currentActivity.duration);
      setValues(currentActivity.duration.values);
      setDistributionType(currentActivity.duration.distributionType);
      setDistributionValues(currentActivity.duration.values.map((v) => v.value));
      setDistributionTypes(newTypes);
    }
  }, [getData, selectedObject.id]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    console.log(value)
    console.log(name)

    if(name === "distributionType"){
      setDistributionType(value)
      setDistributionValues(new Array(distributionTypes.find(dis => dis.distribution_name === value).distribution_params.length).fill(0))
      console.log(value)
    console.log(name)
    }

    if(name === "distributionValues"){
        let newArr = [...distributionValues]
        newArr[index] = value

        setDistributionValues(newArr)
        
    } else{

    if (name === "duration") setDuration(value);
    if (name === "unit") setUnit(value);
    if (name === "cost") setCost(value);
    if (name === "currency") setCurrency(value);
    if (name === "resources") setResources(value);

    };




  };

  const onSubmit = event => {
    event.preventDefault();
    const data = [...getData("allScenario")];
    const currentActivity = data[currentScenario].models[currentBpmn].modelParameter.activities.find(
      value => value.id === selectedObject.id
    );

    let duration = {
      distributionType: distributionType,
      values: distributionTypes.find(dis => dis.distribution_name === distributionType).distribution_params.map((key, index) => {return {id: key, value: distributionValues[index]}})
  }

    currentActivity.duration = duration;
    currentActivity.unit = unit;
    currentActivity.cost = cost;
    currentActivity.currency = currency;
    currentActivity.resources = resources;
    setData(data);

  };


  const changeValueAmount = (amount) => {
    let newResources = [...resources]
    if(amount === 1){
      newResources.push("")
    }

    if(amount === -1){
      newResources.pop()
    }

    setResources(newResources)
  }

  const changeValueAmountDuration = (amount) => {
    if(amount === 1){
      let newTypes = [...distributionTypes]
      newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.push("entry" + (distributionTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.length +1))
     
      setDistributionTypes(newTypes)
      distributionValues.push(0)
      
    } else{

        let newTypes = [...distributionTypes]
        newTypes.find(dis => dis.distribution_name === "arbitraryFiniteProbabilityDistribution").distribution_params.pop()
      
        setDistributionTypes(newTypes)
        distributionValues.pop()
     
    }
  }

  const handleResources = (index, value) =>{
    resources[index] = value
    console.log(resources)
  }

  
  const handleKeyChange = (resource, index) => {

    const target = resource.target;
    const value = target.value;
   

    let params = [...distributionTypes]
    params.find(dis => dis.distribution_name === distributionType).distribution_params[index] = value

    setDistributionTypes(params)
   
    console.log(params)

    
  }

  return ( 
    <>
      {duration ? (
        <Box w="100%">
        <form onSubmit={onSubmit}>
          <Stack gap="2">        
            <FormControl>
              <FormLabel>Selected Activity:</FormLabel>
              <Input title="Test date" value={selectedObject.name || ""} type="inputRead" />
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
                  <FormLabel>Fix costs:</FormLabel>
                  <Input name="cost" type="input" value={cost} onChange={handleInputChange} bg="white"/>
                </FormControl>

                <FormControl>
                  <FormLabel>Currency:</FormLabel>
                  <Select name="currency" placeholder={currency} onChange={handleInputChange} bg="white">
                  
                    <option value='euro'>euro</option>
                    <option value='dollar'>dollar</option>
                    <option value='money unit'>money unit</option>
                  </Select>
                </FormControl> 
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Duration
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>

          <Flex justifyContent="space-between">
            <FormControl w="47%">
              <FormLabel>Distribution:</FormLabel>
              <Select value={distributionType}  bg="white" name="distributionType" onChange={(event) => handleInputChange(event)} >
                {distributionTypes.map((distribution, index) => {
                    return <option value={distribution.distribution_name}>{distribution.distribution_name}</option>
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
                <IconButton icon={<MinusIcon />} onClick={() => changeValueAmountDuration(-1)} />
                <IconButton icon={<AddIcon />} onClick={() => changeValueAmountDuration(1)} />
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
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Resources
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <Text fontWeight="bold" fontSize="md">Resources:</Text>

                <ButtonGroup size='md' isAttached variant="outline" >
                    <IconButton icon={<MinusIcon />} onClick={() => changeValueAmount(-1)} />
                    <IconButton icon={<AddIcon />} onClick={() => changeValueAmount(1)} />
                </ButtonGroup>

                {
                  resources.map((resource, index) => {
                    return <FormControl>
                      <FormLabel>Resource { (index + 1 )}:</FormLabel>
                      <Select name="resource" placeholder={resource} onChange={(event) => handleResources(index,event.target.value )} bg="white">
                        <option>select resource</option>
                        {getData("currentScenario").resourceParameters.resources.map(x =>{
                        return  <option value={x.id}>{x.id}</option>
                        } )}
                        
                      </Select>
                    </FormControl>
                  })

                }
              </AccordionPanel>
            </AccordionItem>
          </Accordion>



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
        ): ""}
            
        </>
      );
    }
  



export default Activity;