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
    FiLock,
    FiPlay,
    FiEye,
    FiUser
  } from 'react-icons/fi';
  import axios from "axios";
  import saveAs from 'file-saver';
import BPMNSwitcher from './BPMNSwitcher';
import ScenarioSwitcher from './ScenarioSwitcher';

function Navigation(props) {

    const LinkItems = [
        { name: 'Overview', icon: FiEye, path: '/overview', event: () =>  props.setCurrent("Overview") },
        { name: 'Scenario Parameters', icon: FiSettings, path: '/scenario', event: () =>  props.setCurrent("Scenario Parameters") },
        { name: 'Resource Parameters', icon: FiUser, path: '/resource', event: () =>  props.setCurrent("Resource Parameters") },
        { name: 'Modelbased Parameters', icon: FiStar, path: '/modelbased', event: () =>  props.setCurrent("Modelbased Parameters") },
        { name: 'Run Simulation', icon: FiPlay, path: '/simulation', event: () =>  props.setCurrent("Run Simulation") }
      ];
     
      const LinkItems2 = [
        { name: 'Add BPMN', icon: FiFileText, path: '#', event: () => {} },
        { name: 'Reset parameters', icon: FiTrash2, path: '#', event: () => {} },
        { name: 'Export XML files', icon: FiDownload, path: '/#', event: () => save() },
        { name: 'Save parameters', icon: FiLock, path: '#', event: () => saveFile() },
      ];

      
    const Nav = () => {
        return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PetriSim</Text>
              
      };

      const save = () =>{
        const jsonData = JSON.stringify(props.data);
        const blob = new Blob([jsonData], { type: "application/json" });
        saveAs(blob, "data.json");
      }
      
      const saveFile = () => {
        axios.post('http://localhost:8000/save', props.data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
      }
      


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