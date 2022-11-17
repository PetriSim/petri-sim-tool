import React from 'react'


import {
    Flex, Button,
 
    
  } from '@chakra-ui/react'




function StartView(props) {


  return (
   
        <Flex
            boxShadow='sm' 
            backgroundColor="white"
            alignItems="baseline"
            flexDir="column"
            gap="5"
        
            position="absolute"
           
          
        
        >
            <Button colorScheme='teal' variant='solid' onClick={() => props.setStarted("true")}>
                Start PetriSim
            </Button>
        

        </Flex>   
    
  )
}

export default StartView;