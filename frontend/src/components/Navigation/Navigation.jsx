import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar';

import {
    Text,
    Divider,
    Spacer,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    Button,
    Input,
    FormLabel,
    ModalCloseButton,
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

  const toast = useToast()

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
        { name: 'Download parameters', icon: FiDownload, path: '/#', event: () => save() },
        { name: 'Save project as', icon: FiLock, path: '#', event: () => onOpen() },
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
        console.log(name)

        var fullData = {projectname: name, 
                        data:  props.data
                      }


        axios.post('http://localhost:8000/save', fullData)
            .then(res => toast({
              title: 'Saved project.',
              description: res.data,
              status: 'success',
              duration: 9000,
              isClosable: true,
            }))
            .catch(err => toast({
              title: 'Error',
              description: 'Could not save the project',
              status: 'error',
              duration: 9000,
              isClosable: true,
            }));

      }
      
      const setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            saveFile()
            return "test"
        });
    };

      useEffect(() => {
        setupBeforeUnloadListener()
        console.log("registred")
      }, [])

      const { isOpen, onOpen, onClose } = useDisclosure()

      const [name, setName] = useState("")



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


          <Modal
            
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Save project</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Provide a projectname under which your data is stored</Text>
                <FormControl>
                  <FormLabel>Projectname: </FormLabel>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Projectname' />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={saveFile}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
  )
}

export default Navigation;