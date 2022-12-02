import React from 'react'
import Sidebar from '../Sidebar';

import {
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
import ScenarioSwitcher from './ScenarioSwitcher';

function Navigation(props) {

    const LinkItems = [
        { name: 'Scenario Overview', icon: FiSettings, path: '/overview' },
        { name: 'Scenario Parameters', icon: FiSettings, path: '/scenario' },
        { name: 'Resource Parameters', icon: FiTrendingUp, path: '/resource' },
        { name: 'Modelbased Parameters', icon: FiStar, path: '/modelbased' },
      ];

      const LinkItems2 = [
        { name: 'Add BPMN', icon: FiFileText, path: '/scenario' },
        { name: 'Reset parameters', icon: FiTrash2, path: '/scenario' },
        { name: 'Export XML files', icon: FiDownload, path: '/scenario' },
        { name: 'Save parameters', icon: FiLock, path: '/scenario' },
      ];

    const Nav = () => {
        return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PARAMETER EDITOR</Text>
              
      };




  return (
        <>
            <Sidebar side="left" backgroundColor="white" title={<Nav/>} 
            content={
                    <>
                    <NavigationItem current={props.current}  items={LinkItems} clickedcolor="#AEC8CA" color="#FFFF" exitButton={false} setCurrent={props.setCurrent}  />
                    
                    <Divider/>
                        <BPMNSwitcher bpmns={props.bpmns} currentBpmn={props.currentBpmn} setBpmn={props.setBpmn} scenarios={props.scenarios} data={props.data} currentScenario={props.currentScenario}/>

                        <ScenarioSwitcher currentScenario={props.currentScenario} setScenario={props.setScenario} scenarios={props.scenarios} data={props.data}  />
                    <Divider/>


                    <Spacer/>


                    <NavigationItem items={LinkItems2} clickedColor="blackAlpha.400" color="blackAlpha.00" bottom="0" setStarted={props.setStarted} exitButton={true} />                    
                    </>
                } />
        </>
  )
}

export default Navigation;