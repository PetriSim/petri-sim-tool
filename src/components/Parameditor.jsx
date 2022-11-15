import React from 'react'
import Sidebar from './Sidebar';

import {
    Divider, 
    Text
  } from '@chakra-ui/react'


function Parameditor() {


      const Editor = () => {
        return <>
                    <Text fontSize="md" textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">SCENARIO PARAMETERS</Text>
                    <Divider />
                </>
      };

  return (
        <>
            <Sidebar side="right" backgroundColor="#F0F0F1" content={<Editor/>} />
        </>
  )
}

export default Parameditor;