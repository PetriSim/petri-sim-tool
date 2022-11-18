import React from 'react'
import Sidebar from '../Sidebar';

import {
    Button,
    Text,
    Divider,
    Spacer
    
  } from '@chakra-ui/react'
import NavigationItem from './NavigationItem';

import {
    FiTrendingUp,
    FiStar,
    FiSettings,
    FiFileText,
    FiTrash2,
    FiDownload,
    FiLock

  } from 'react-icons/fi';
import BPMNSwitcher from './BPMNSwitcher';

function Navigation(props) {

    const LinkItems = [
        { name: 'Scenario Parameters', icon: FiSettings },
        { name: 'Resource Parameters', icon: FiTrendingUp },
        { name: 'Modelbased Parameters', icon: FiStar },
      ];

      const LinkItems2 = [
        { name: 'Add BPMN', icon: FiFileText },
        { name: 'Reset parameters', icon: FiTrash2 },
        { name: 'Export XML files', icon: FiDownload },
        { name: 'Save parameters', icon: FiLock },
      ];

    const Nav = () => {
        return <>
                <Text fontSize="sm" textAlign="right" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PARAMETER EDITOR</Text>
                </>
      };




  return (
        <>
            <Sidebar side="left" backgroundColor="white" title={<Nav/>} 
            content={
                    <>
                    <NavigationItem current={props.current} setCurrent={props.setCurrent} items={LinkItems} clickedColor="#AEC8CA" color="#FFFF" exitButton={false} />
                    
                    <Divider/>
                        <BPMNSwitcher bpmns={props.bpmns} currentBpmn={props.currentBpmn} setBpmn={props.setBpmn} />
                    <Divider/>


                    <Spacer/>


                    <NavigationItem items={LinkItems2} clickedColor="blackAlpha.400" color="blackAlpha.00" bottom="0" setStarted={props.setStarted} exitButton={true} />                    
                    </>
                } />
        </>
  )
}

export default Navigation;