
import React from 'react'


import {
    Input,

  } from '@chakra-ui/react'
import Datepicker from './Forms/Datepicker';
import Time from './Forms/Time';
import Number from './Forms/Number';
import Selection from './Forms/Selection';

function Field(props) {
    return (
        <>
        {
            {
            'date': <Datepicker title={props.title} value={props.value} />,
            'time': <Time title={props.title} value={props.value} />,
            'number': <Number title={props.title} value={props.value} />,
            'selection': <Selection title={props.title} value={props.value} options={props.options} />,
            'input': <Input variant="outline" bg="whiteAlpha.900" value={props.value}  onChange={props.onChange}/>,
            'inputRead': <Input variant="outline" bg="whiteAlpha.900" value={props.value} readOnly isDisabled/>
            }[props.type]
        }  
        </>
    )
}

export default Field;