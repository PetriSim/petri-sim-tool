import React from 'react'

import {
    Flex, Button, Divider, Text, IconButton, Input, InputGroup, InputRightElement, FormLabel
     
  } from '@chakra-ui/react'
import { FiFile, FiFilePlus, FiMenu } from 'react-icons/fi';

function StartView(props) {
   
    
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
        flexDir="row"
        gap="100"
                
      >
        <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={350}
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
          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' > 
            + add BPMN
          </Button>

          
          <Button colorScheme='teal' variant='solid' width='90%' onClick={() => props.setStarted("true")}>
            Start parametrization
          </Button>
        </Flex>

        <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={350}
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
          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' > 
            + add BPMN
          </Button>
         
          <Button colorScheme='teal' variant='solid' width='90%' onClick={() => props.setStarted("true")}>
            Start parametrization
          </Button>
        </Flex>
  
      </Flex>
    </Flex> 
  )
}

export default StartView;
  