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
            gap={{base: "3", md:"5"}}
            width={hidden ? "" :{
              sm: '220px', 
              md: '300px'
            }}
            p={hidden ? "" :[
              '3', 
              '3',
              '6', 
              '6', 
            ]}
            paddingRight={{
              sm: "7 !important",
              md: "10 !important"
            }}

            position="absolute"
            h={hidden ? "" : "95vh"}
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