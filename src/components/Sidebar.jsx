import React, {  useState } from 'react'


import {
    Flex,
    Text,
    Divider,
    IconButton
    
  } from '@chakra-ui/react'

  import { FiMenu } from 'react-icons/fi';



function Sidebar(props) {

    const [hidden, setHidden] = useState(false)



  return (
        <Flex
            boxShadow='sm' 
            backgroundColor={props.backgroundColor}
            alignItems="baseline"
            flexDir="column"
            gap="5"
        
            position="absolute"
            w={hidden ? "" : "20vw"}
            h={hidden ? "" : "95vh"}
            p={hidden ? "0" : "6"}
            rounded={hidden ? "xl" : "2xl"}
            left={props.side === "left" ? "2vh" : ""}
            right={props.side === "right" ? "2vh" : ""}

          
        
        >
        <Flex alignItems="center">
            <IconButton onClick={() => setHidden(!hidden)} icon={<FiMenu />} fontSize="19" variant="unstyled" />
            {!hidden? props.title : ""}
            
        </Flex>
      
        <Divider display={hidden ? "none" : "block"}/>


        {!hidden? props.content : ""}

        

        </Flex>   
    
  )
}

export default Sidebar;