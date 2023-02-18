import React from 'react'

import {
    Flex,  Divider, Text,CircularProgress
     
  } from '@chakra-ui/react'


function ProgressPage() {
 
    
  return (
    /* Progress page is displayed as long as the app component has not received the data form the discovery tool*/
    <Flex
      backgroundColor="white"
      alignItems="center"
      flexDir="column"
      gap="5"
      w = "100vw"
      h = "100vh"
      p = "6"
    >
    
      <Text fontSize="3xl" textAlign="left" color="H5C5C5C" fontWeight="bold" >PetriSim</Text>
      <Divider />
      

          <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          gap="5"
          height={360}          
          width={400} 

          >
            <Text fontWeight="bold" fontSize="26">Waiting</Text>
            <Text fontWeight="bold">Waiting for the discovery tool to send the data</Text>
            <CircularProgress isIndeterminate color='#A2987F'  size="160px"/>

          </Flex>
 

      </Flex>
       
  )
}

export default ProgressPage;