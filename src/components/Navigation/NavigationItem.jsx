import React from 'react'

import {
    Flex,
    Text,
    Link,
    Icon,
    Menu,
    MenuButton,
  } from '@chakra-ui/react'

  import { Link as ReachLink } from "@reach/router"



function NavigationItem(props) {


  return (
        <>
        {props.items.map((link, index) => (
        
            <Flex w="100%" key={index}>
                <Menu placement="right" w="100%">
                    <Link as={ReachLink} to={link.path}
                
                        p={3}
                        borderRadius={8}
                        _hover={{ backgroundColor: props.clickedcolor }}
                        transition="background-color 400ms linear"
                        w="100%"
                      
                        getProps={({ isCurrent }) => {
                        return {
                            style: {
                                backgroundColor: isCurrent ? props.clickedcolor : props.color 
                            }
                        };
                        }}

                        onClick={() => props.setCurrent(link.name)}
                    >
                        <MenuButton  w="100%"   >
                            <Flex alignItems='center' >
                                <Flex 
                                    borderRadius='lg' 
                                    bg="#FFFF" 
                                    color='white' 
                                    h={7} 
                                    w={7} 
                                    justifyContent='center' 
                                    alignItems='center' >
                                    <Icon as={link.icon} fontSize="md" color={"RGBA(0, 0, 0, 0.64)"} />
                                </Flex>
                                
                                <Text 
                                    ml={2} 
                                    fontSize={{base: "2xs", md:"sm"}}
                                    textAlign="left" 
                                    color="RGBA(0, 0, 0, 0.64)" 
                                    fontWeight="bold" 
                                    display="flex">{link.name}
                                </Text>
                            </Flex>
                        </MenuButton>
                    </Link>
                    </Menu>
                </Flex>
        
      ))}
      </>    
  )
  }
  export default NavigationItem;
  