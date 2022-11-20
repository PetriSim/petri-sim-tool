import React from 'react'

import {
    Flex,
    Text,
    Menu,
    MenuButton,
    Input,
    Button,
    MenuList,
    MenuItem

  } from '@chakra-ui/react'
  

function BPMNSwitcher(props) {


  return (
    <Menu>
        <Text ml={2} fontSize={{base: "2xs", md:"sm"}} textAlign="left" color="RGBA(0, 0, 0, 0.64)" fontWeight="bold" display="flex">Current BPMN Model:</Text>      
        <Flex gap={{base: "3", md:"3"}} flexDirection={{base: "column", md:"row"}} w="100%">                      
            <Input placeholder={props.bpmns[props.currentBpmn].name} 
                  variant="filled" 
                  isDisabled 
                  w={{
                    base: '100%', 
                    md: '65%',
                  }}
                  bg="blackAlpha.200" 
                  _hover="blackAlpha.200" 
                  fontSize={{base: "2xs", md:"sm"}}
                  />

            <MenuButton 
                as={Button} 
                variant="outline" 
                textAlign="left" 
                p={3} 
                borderRadius={8} 
                w={{
                  base: '100%', 
                  md: '30%',
                }}
                
                >
                    <Text fontSize={{base: "2xs", md:"sm"}} color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">Change</Text>
            </MenuButton>
        
        <MenuList>
            {props.bpmns.map((bpmn, index) => {
                return  <MenuItem onClick={() =>  props.setBpmn(index)}>{bpmn.name + " " + index}</MenuItem>
            })

            }
        </MenuList>
        </Flex>
    </Menu> 
  )
  }
  export default BPMNSwitcher;
  