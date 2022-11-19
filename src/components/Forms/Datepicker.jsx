import {React, useState} from 'react'


import {
    Input,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'





function Datepicker(props) {
    const [currentValue, setValue] = useState(props.value)

    return (
        <>
        <FormControl>
            <FormLabel>{props.title}</FormLabel>
            <Input type="date" value={currentValue} onChange={(e) => setValue(e.target.value)} variant="outline" bg="whiteAlpha.900" />
        </FormControl>
            
        </>
    )
}

export default Datepicker;