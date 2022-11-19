import {React, useState} from 'react'


import {
    Input,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'





function Time(props) {
    const [currentValue, setValue] = useState(props.value)
    return (
        <>
        <FormControl>
            <FormLabel>{props.title}</FormLabel>
            <Input type="time" value={currentValue}  onChange={(e) => setValue(e.target.value)}  variant="outline" bg="whiteAlpha.900" />
        </FormControl>
            
        </>
    )
}

export default Time;