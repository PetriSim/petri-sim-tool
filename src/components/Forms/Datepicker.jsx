import React from 'react'


import {
    Input,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'





function Datepicker(props) {
    return (
        <>
        <FormControl>
            <FormLabel>{props.title}</FormLabel>
            <Input type="date" value={props.value} variant="outline" bg="whiteAlpha.900" />
        </FormControl>
            
        </>
    )
}

export default Datepicker;