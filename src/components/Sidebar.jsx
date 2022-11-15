import React, {  useState } from 'react'


import {
    Flex,
    Text,
    Divider,
    Button
    
  } from '@chakra-ui/react'

  import { FiMenu } from 'react-icons/fi';



function Sidebar(props) {

    const [hidden, setHidden] = useState(false)



  return (
        <Flex
            boxShadow='sm' 
            p='6' 
            rounded='2xl'
            backgroundColor={props.backgroundColor}
            w="30vh"
            flexDir="column"
            gap="5"
            position="absolute"
            h={hidden ? "10px" : "95vh"}
            left={props.side === "left" ? "2vh" : ""}
            right={props.side === "right" ? "2vh" : ""}
        
        >
            <Button onClick={() => setHidden(!hidden)}>
                <FiMenu />
            </Button>


        {!hidden? props.content : ""}

         

        

        </Flex>   
    
  )
}

export default Sidebar;