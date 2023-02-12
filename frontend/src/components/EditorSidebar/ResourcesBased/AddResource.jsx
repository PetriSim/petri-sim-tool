import React, { useState } from 'react'
import { Button, Input, FormControl, FormLabel, Select, Switch, Stack, Box, Divider,CheckboxGroup, Checkbox } from '@chakra-ui/react';

const AddResource = ({ getData, setData, currentScenario, setCurrent }) => {
  const [state, setState] = useState({
    id: "",
    costHour: "",
    numberOfInstances: "",
    timeTables: getData("currentScenario").resourceParameters.timeTables.map(item => item.id),
    roles: getData("currentScenario").resourceParameters.roles.map(item => item.id),
    selectedRoles: []
  });

  const handleInputChange = (resource) => {
    const target = resource.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    });
  }

  const handleRolesChange = (event) => {
    let value = event.pop();

    if (state.selectedRoles.includes(value)) {
      setState({
        ...state,
        selectedRoles: [...state.selectedRoles.filter(item => item === value)]
      });
    } else {
      setState({
        ...state,
        selectedRoles: [...state.selectedRoles, value]
      });
    }
  }

  const clear = () => {
    setState({
      id: "",
      costHour: "",
      selectedRoles: [],
      numberOfInstances: ""
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();

    let data = [...getData("allScenario")];

    let obj = {
      id: state.id,
      costHour: state.costHour,
      numberOfInstances: state.numberOfInstances,
    }

    data[currentScenario].resourceParameters.resources.push(obj);

    state.selectedRoles.filter(x => x !== undefined).forEach(item => {
      data[currentScenario].resourceParameters.roles.find(x => x.id === item).resources.push({ id: state.id })
    });

    setData(data);

    clear();
  }


    return (
        <>

<Box w="100%">


<Button onClick={() => setCurrent("Resource Parameters")}
                colorScheme='#ECF4F4'
                variant='outline'
                w="100%"
                border='1px'
                borderColor='#B4C7C9'
                color ='#6E6E6F'
                _hover={{ bg: '#B4C7C9' }}> Back </Button> 

          <Divider/>

          
        <form onSubmit={onSubmit}>
        <Stack gap="2" mt="4">


         <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={state.id} bg="white" name="id" onChange={(event) => handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Cost per hour:</FormLabel>
              <Input value={state.costHour} bg="white" name="costHour" onChange={(event) => handleInputChange(event)} />
          </FormControl>

          <FormControl>
              <FormLabel>Number of instances:</FormLabel>
              <Input value={state.numberOfInstances} bg="white" name="numberOfInstances" onChange={(event) => handleInputChange(event)} />
          </FormControl>
         
        <FormControl >
        <FormLabel>Select roles:</FormLabel>
          <CheckboxGroup colorScheme='green' value={state.selectedRoles} name="selectedRoles" onChange={(event) => handleRolesChange(event)}>
            <Stack spacing={[1, 5]} direction="column">
            {state.roles.map((id, index) => {
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

export default AddResource;