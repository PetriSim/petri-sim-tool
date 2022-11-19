import React from 'react'


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
    return (
        <>
        <FormControl>
            <FormLabel>{props.title}</FormLabel>
            <NumberInput value={props.value}>
            <NumberInputField variant="outline" bg="whiteAlpha.900"/>
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </FormControl>
            
        </>
    )
}

export default Time;