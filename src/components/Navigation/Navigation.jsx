import React from 'react'
import Sidebar from '../Sidebar';

import {
    Divider, 
    Text
  } from '@chakra-ui/react'
import NavigationItem from './NavigationItem';


function Navigation(props) {

    const Nav = () => {
        return <>
                <Text fontSize="sm" textAlign="right" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PARAMETER EDITOR</Text>
                </>
      };




  return (
        <>
            <Sidebar side="left" backgroundColor="white" title={<Nav/>} content={<NavigationItem current={props.current} setCurrent={props.setCurrent} />} />
        </>
  )
}

export default Navigation;