import React from 'react'
import Sidebar from '../Sidebar';

import {
    Text,
    Divider,
    Spacer,
  } from '@chakra-ui/react'
import NavigationItem from './NavigationItem';

import {
    FiStar,
    FiSettings,
    FiFileText,
    FiTrash2,
    FiDownload,
    FiPlay,
    FiEye,
    FiUser
  } from 'react-icons/fi';

  import saveAs from 'file-saver';
  import BPMNSwitcher from './BPMNSwitcher';
  import ScenarioSwitcher from './ScenarioSwitcher';

  function Navigation({setCurrent, data, bpmns,setScenario, currentScenario, setBpmn, scenarios, current, currentBpmn, setStarted}) {



    const LinkItems = [
        { name: 'Overview', icon: FiEye, path: '/overview', event: () =>  setCurrent("Overview") },
        { name: 'Scenario Parameters', icon: FiSettings, path: '/scenario', event: () =>  setCurrent("Scenario Parameters") },
        { name: 'Resource Parameters', icon: FiUser, path: '/resource', event: () =>  setCurrent("Resource Parameters") },
        { name: 'Modelbased Parameters', icon: FiStar, path: '/modelbased', event: () =>  setCurrent("Modelbased Parameters") },
        { name: 'Run Simulation', icon: FiPlay, path: '/simulation', event: () =>  setCurrent("Run Simulation") }
      ];
     
      const LinkItems2 = [
        { name: 'Add BPMN', icon: FiFileText, path: '#', event: () => {} },
        { name: 'Reset parameters', icon: FiTrash2, path: '#', event: () => {} },
        { name: 'Download parameters', icon: FiDownload, path: '/#', event: () => save() },
      ];

      
    const Nav = () => {
        return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PetriSim</Text> 
      };

      const save = () =>{
        const jsonData = JSON.stringify(data);
        const blob = new Blob([jsonData], { type: "application/json" });
        saveAs(blob, "data.json");
      }
      
  return (
        <>
          <Sidebar side="left" backgroundColor="white" title={<Nav/>} 
            content={
                  <>
                  <NavigationItem current={current}  items={LinkItems} clickedcolor="#AEC8CA" color="#FFFF" exitButton={false} setCurrent={setCurrent}  />
                  
                  <Divider/>
                      <BPMNSwitcher bpmns={bpmns} currentBpmn={currentBpmn} setBpmn={setBpmn} scenarios={scenarios} data={data} currentScenario={currentScenario}/>
                      <ScenarioSwitcher currentScenario={currentScenario} setScenario={setScenario} scenarios={scenarios} data={data}  />
                  <Divider/>
                  <Spacer/>
                  <NavigationItem items={LinkItems2} clickedColor="blackAlpha.400" color="blackAlpha.00" bottom="0" setStarted={setStarted} exitButton={true} />                    
                  </>
              } 
          />
        </>
  )
}

export default Navigation;