import React from 'react'

import {
    Flex,
    Text,
    Link,
    Icon,
    Menu,
    MenuButton,
  } from '@chakra-ui/react'



function NavigationItem(props) {


  return (
        <>
        {props.items.map((link) => (
           <>
            <Flex w="100%">
                <Menu placement="right"  w="100%">
                    <Link
                        backgroundColor={link.name === props.current? props.clickedColor : props.color }
                        p={3}
                        borderRadius={8}
                        _hover={{ backgroundColor: props.clickedColor }}
                        transition="background-color 400ms linear"
                        w="100%"
                        

                    >
                        <MenuButton  w="100%"  onClick={() => {props.exitButton? props.setStarted("false") :  props.setCurrent(link.name)}}>
                            <Flex alignItems='center' >
                                <Flex 
                                borderRadius='lg' bg="#FFFF" color='white' h={7} w={7} justifyContent='center' alignItems='center' >
                                    <Icon as={link.icon} fontSize="md" color={"RGBA(0, 0, 0, 0.64)"} />
                                </Flex>
                                
                                <Text ml={2} fontSize="sm" textAlign="left" color="RGBA(0, 0, 0, 0.64)" fontWeight="bold" display="flex">{link.name}</Text>
                            </Flex>
                        </MenuButton>
                    </Link>
                    </Menu>
                </Flex>
            </>
      ))}
      </>    
  )
  }
  export default NavigationItem;
  