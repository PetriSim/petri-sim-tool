import React, { useState } from 'react'


import {
    Input,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
  } from '@chakra-ui/react'





function Time(props) {
    const [currentValue, setValue] = useState(props.value)
    
    return (
        <>
        <FormControl>
            <FormLabel>{props.title}</FormLabel>
            <NumberInput value={currentValue} >
            <NumberInputField variant="outline" bg="whiteAlpha.900" onChange={(e) => setValue(e.target.value)} />
            <NumberInputStepper>
                <NumberIncrementStepper onClick={() => setValue(Number(currentValue) + 1)} />
                <NumberDecrementStepper onClick={() => setValue(Number(currentValue) - 1)} />
            </NumberInputStepper>
            </NumberInput>
        </FormControl>
            
        </>
    )
}

export default Time;