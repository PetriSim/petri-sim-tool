import React from 'react'


import {
   Select,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'





function Selection(props) {
 
    return (
        <>
        <FormControl>
            <FormLabel>{props.title}</FormLabel>
            <Select placeholder={props.value} variant="outline" bg="whiteAlpha.900">
                {props.options.map((item) =>{
                     return <option value={item}>{item}</option>
                })

                }
            </Select>
        </FormControl>
            
        </>
    )
}

export default Selection;
