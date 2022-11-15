import React from 'react'
import Sidebar from '../Sidebar';

import {
    Divider, 
    Text
  } from '@chakra-ui/react'


function Navigation() {

    const Nav = () => {
        return <>
                    <Text fontSize="md" textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PARAMETER EDITOR</Text>
                    <Divider />
                </>
      };


  return (
        <>
            <Sidebar side="left" backgroundColor="white" content={<Nav/>} />
        </>
  )
}

export default Navigation;