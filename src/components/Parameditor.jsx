import React from 'react'
import Sidebar from './Sidebar';

import {
    Divider, 
    Text,
    Flex
  } from '@chakra-ui/react'


function Parameditor(props) {


    const Editor = () => {
    return <Text fontSize="sm" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" textTransform="uppercase">{props.current}</Text>
                
            
    };

    return (
        <>
            <Sidebar side="right" backgroundColor="#F0F0F1" title={<Editor/>}  />
        </>
    )
}

export default Parameditor;