import React, {useState} from 'react'

import {
    Flex, Button, Divider, Text, IconButton, Input, InputGroup, InputRightElement, FormLabel
     
  } from '@chakra-ui/react'
import { FiFile, FiFilePlus, FiMenu } from 'react-icons/fi';

function StartView(props) {
  const [addExistingBPMN, setExistingBPMN] = useState(false);
  const [addNewBPMN, setNewBPMN] = useState(false);
  const [startNewProject, setNewProject] = useState(false);
  const [startExistingProject, setExistingProject] = useState(false);

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
      <gap /><gap /><gap /><gap /><gap />

    
    
      <Flex
        backgroundColor="white"
        alignItems="center"
        flexDir="column"
        gap="100"
                
      >
        {startNewProject ? <>
          <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={addNewBPMN ? 500 : 350}          
          width={400} 
          >
            
            <gap />
            <Text fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" > Start new project</Text>
            <gap />
            <gap />
            
            <InputGroup width = "90%">
            <label for='file-upload' class = 'custom-file-upload'>
            Select file 1
            </label>
            <Input id = 'file-upload' type = 'file'/>            
            <InputRightElement pointerEvents='none' children={<FiFile />} />
            </InputGroup>
            
            <InputGroup width = "90%">
            <label for='file-upload' class = 'custom-file-upload'>
            Select file 2
            </label>
            <Input id = 'file-upload' type = 'file'/>            
            <InputRightElement pointerEvents='none' children={<FiFile />} />
            </InputGroup>

            {addNewBPMN ? <span></span> :
            <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' onClick={(()=> setNewBPMN(true))}> 
              + add BPMN
            </Button>
            }

            {addNewBPMN ?
            <>
            <InputGroup width = "90%">
            <label for='file-upload' class = 'custom-file-upload'>
            Select file 1
            </label>
            <Input id = 'file-upload' type = 'file'/>            
            <InputRightElement pointerEvents='none' children={<FiFile />} />
            </InputGroup>
            <InputGroup width = "90%">
            <label for='file-upload' class = 'custom-file-upload'>
            Select file 2
            </label>
            <Input id = 'file-upload' type = 'file'/>            
            <InputRightElement pointerEvents='none' children={<FiFile />} />
            </InputGroup>
            <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' onClick={(()=> setNewBPMN(false))}> 
              - remove BPMN
            </Button>
            </>
            : <span></span>}
            
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
          height={addExistingBPMN ? 500 : 350}
          width={400} 
        >
          
          <gap />
          <Text fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" > Open existing project</Text>
          <gap />
          <gap />
          
          <InputGroup width = "90%">
          <label for='file-upload' class = 'custom-file-upload'>
           Select file 1
          </label>
          <Input id = 'file-upload' type = 'file'/>            
          <InputRightElement pointerEvents='none' children={<FiFile />} />
          </InputGroup>
          
          <InputGroup width = "90%">
          <label for='file-upload' class = 'custom-file-upload'>
           Select file 2
          </label>
          <Input id = 'file-upload' type = 'file'/>            
          <InputRightElement pointerEvents='none' children={<FiFile />} />
          </InputGroup>

          {addExistingBPMN ? <Divider width = '90%'/> :
          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' onClick={(()=> setExistingBPMN(true))}> 
            + add BPMN
          </Button>
          }         
          
          {addExistingBPMN ?
          <>
          <InputGroup width = "90%">
          <label for='file-upload' class = 'custom-file-upload'>
           Select file 1
          </label>
          <Input id = 'file-upload' type = 'file'/>            
          <InputRightElement pointerEvents='none' children={<FiFile />} />
          </InputGroup>
          <InputGroup width = "90%">
          <label for='file-upload' class = 'custom-file-upload'>
           Select file 2
          </label>
          <Input id = 'file-upload' type = 'file'/>            
          <InputRightElement pointerEvents='none' children={<FiFile />} />
          </InputGroup>
          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' onClick={(()=> setExistingBPMN(false))}> 
            - remove BPMN
          </Button>
          </>
          : <span></span>}
         
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
            Start existing project
          </Button>
        }
        
        

        
  
      </Flex>
    </Flex> 
  )
}

export default StartView;
  