import React from 'react'
import { Button, Input, FormControl, FormLabel, Select, Divider, Switch, Stack, Box } from '@chakra-ui/react';

const AddRole = ({getData,currentScenario, setData, setCurrent }) => {
  const [state, setState] = React.useState({
    id: "",
    schedule: "",
    timeTables: getData("currentScenario").resourceParameters.timeTables.map(item => item.id)
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

  const clear = () => {
    setState({
      id: "",
      schedule: ""
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();

    let data = [...getData("allScenario")]

    let obj = {
      id: state.id,
      schedule: state.schedule,
      resources: []
    }

    data[currentScenario].resourceParameters.roles.push(obj)

    setData(data)

    clear()
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
          color='#6E6E6F'
          _hover={{ bg: '#B4C7C9' }}> Back </Button>

        <Divider />

        <form onSubmit={onSubmit}>
          <Stack gap="2" mt="4">
            <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={state.id} bg="white" name="id" onChange={handleInputChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Select timetable:</FormLabel>
              <Select value={state.schedule} bg="white" name="schedule" onChange={handleInputChange}>
                <option>Select timetable</option>
                {state.timeTables.map((id, index) => {
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
              color='#6E6E6F'
              _hover={{ bg: '#B4C7C9' }}> Add role </Button>

          </Stack>
        </form>
      </Box>
    </>
  )
}
export default AddRole;