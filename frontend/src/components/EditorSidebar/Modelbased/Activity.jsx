import { Input, FormControl, FormLabel, Select, Stack, Button, Box,  ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const Activity = ({ getData, setData, selectedObject, currentScenario, currentBpmn }) => {
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("");
  const [resources, setResources] = useState([]);


  useEffect(() => {
    const currentActivity = getData("currentModel").modelParameter.activities.find(
      value => value.id === selectedObject.id
    );

    if (currentActivity) {
      setDuration(currentActivity.duration);
      setUnit(currentActivity.unit);
      setCost(currentActivity.cost);
      setCurrency(currentActivity.currency);
      setResources(currentActivity.resources);
    }
  }, [getData, selectedObject.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "duration") setDuration(value);
    if (name === "unit") setUnit(value);
    if (name === "cost") setCost(value);
    if (name === "currency") setCurrency(value);
    if (name === "resources") setResources(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    const data = [...getData("allScenario")];
    const currentActivity = data[currentScenario].models[currentBpmn].modelParameter.activities.find(
      value => value.id === selectedObject.id
    );

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

  const handleResources = (index, value) =>{
    resources[index] = value
    console.log(resources)
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

            <FormControl>
              <FormLabel>Duration:</FormLabel>
              <Input name="duration" type="input" value={duration} onChange={handleInputChange}  bg="white"/>
            </FormControl>
            
            <FormControl>
              <FormLabel>Time Unit:</FormLabel>
              <Select name="unit" placeholder={unit} onChange={handleInputChange} bg="white">
                  <option value='secs'>Seconds</option>
                  <option value='mins'>Minutes</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Fix costs:</FormLabel>
              <Input name="cost" type="input" value={cost} onChange={handleInputChange} bg="white"/>
            </FormControl>

            <FormControl>
              <FormLabel>Currency:</FormLabel>
              <Select name="currency" placeholder={currency} onChange={handleInputChange} bg="white">

                <option value='euro'>euro</option>
                <option value='dollar'>dollar</option>
              </Select>
          </FormControl> 

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
                    {getData("currentScenario").resourceParameters.resources.map(x =>{
                    return  <option value={x.id}>{x.id}</option>
                    } )}
                    
                  </Select>
                </FormControl>
              })

            }
            



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