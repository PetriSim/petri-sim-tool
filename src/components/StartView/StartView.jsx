import React, {useState} from 'react'

import {
    Flex, Button, Divider, Text, IconButton, Input, InputGroup, InputRightElement, FormLabel, Select, Icon
     
  } from '@chakra-ui/react'
import { FiChevronDown, FiChevronsDown, FiFile, FiFilePlus, FiMenu, FiUnderline } from 'react-icons/fi';
import FileUpload from './FileUpload';

function StartView(props) {
  const [addExistingBPMN, setExistingBPMN] = useState(false);
  const [startNewProject, setNewProject] = useState(false);
  const [startExistingProject, setExistingProject] = useState(false);
  
  const pushToApp = (File) => {
    props.giveApp(File)
  }

  const startNewProjectNow = () => {
    setNewProject(true)
    setExistingProject(false)
  }
  const startExistingProjectNow = () => {
    setNewProject(false)
    setExistingProject(true)
  }
  
    
  return (
    <Flex
      boxShadow='sm'
      rounded = '2xl'
      backgroundColor="white"
      alignItems="center"
      flexDir="column"
      gap="5"
      position="absolut"
      w = "97vw"
      h = "95vh"
      p = "6"
    >
      <gap />
      <Text fontSize="3xl" textAlign="left" color="H5C5C5C" fontWeight="bold" >PetriSim</Text>
      <Divider />

      {startNewProject || startExistingProject ? <></>
      :
      <>
      <gap /><gap /><gap /><gap /><gap />
      </>
      }
      
      <Flex
        backgroundColor="white"
        alignItems="center"
        flexDir="column"
        gap="50"     
      >
        {startNewProject ? 
        <>
          <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={400}          
          width={400} 
          >
            
            <gap />
            <Text fontSize="xl" textAlign="left" color="#485152" fontWeight="bold" > Start new project</Text>
            <gap />

            <FileUpload title = 'Event log:' accept = '.pdf' getFile={pushToApp}/>

            <Flex width = '90%' flexDir = 'column'>
              <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select Discovery Tool:</Text>
              <Select placeholder = 'choose simulator' width = '100%' color="darkgrey" focusBorderColor='teal' backgroundColor= 'white' icon={<FiChevronDown />}>
                <option value='Simod'>Simod</option>
                <option value='Option 2'>Option 2</option>
                <option value='Option 3'>Option 3</option>
              </Select>
            </Flex>
             
            <Flex width = '90%' flexDir = 'column'>
              <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select Simulator:</Text>
              <Select placeholder = 'choose simulator' width = '100%' color="darkgrey" focusBorderColor='teal' backgroundColor= 'white' icon={<FiChevronDown />}>
                <option value='BIMP'>BIMP</option>
                <option value='Prosimus'>Prosimus</option>
                <option value='Scylla'>Scylla</option>
              </Select>
            </Flex>
         
            <Button color = 'white' colorScheme='teal' variant='solid' width='90%' onClick={() => props.setStarted("true")}>
              Start parametrization
            </Button>

          </Flex>

        </> 
        :
          <Button boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={50}          
          width={400} 
          onClick={startNewProjectNow}
          fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">
            Start new project
          </Button>
        }

        {startExistingProject ? <>
          <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={addExistingBPMN ? 580 : 400}          
          width={400} 
        >
          
          <gap />
          <Text fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" > Open existing project</Text>
          <gap />
          <gap />


          <FileUpload title = 'Parameter file:' accept = '.xml' getFile={pushToApp}/>

          <FileUpload title = 'BPMN file:' accept = '.bpmn' getFile={pushToApp}/>
        


          {addExistingBPMN ? <></> 
          :
          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' as = 'u' onClick={(()=> setExistingBPMN(true))}> 
            + add extra BPMN
          </Button>
          }         
          
          {addExistingBPMN ?
          <>
          <Divider borderColor="#485152" width = '90%'/>

          <FileUpload title = 'Parameter file:' accept = '.bpmn' getFile={pushToApp}/>
          <FileUpload title = 'BPMN file:' accept = '.bpmn' getFile={pushToApp}/>

          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' as = 'u' onClick={(()=> setExistingBPMN(false))}> 
            - remove BPMN
          </Button>
          </>
          : <></>
          }
         
          <Button colorScheme='teal' variant='solid' width='90%' onClick={() => props.setStarted("true")}>
            Start parametrization
          </Button>
        </Flex>

        </> 
        :
          <Button boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={50}          
          width={400} 
          onClick={startExistingProjectNow}
          fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">
            Open existing project
          </Button>
        }
        
      </Flex>
    </Flex> 
  )
}

export default StartView;
  