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
        <Text ml={2} fontSize="sm" textAlign="left" color="RGBA(0, 0, 0, 0.64)" fontWeight="bold" display="flex">Current BPMN Model:</Text>      
        <Flex justifyContent="space-between">                      
            <Input placeholder={props.bpmns[props.currentBpmn].name} variant="filled" isDisabled w="65%" bg="blackAlpha.200" _hover="blackAlpha.200" />

            <MenuButton as={Button} variant="outline" textAlign="left" p={3} borderRadius={8} w="30%">
                    <Text fontSize="sm" color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">Change</Text>
            </MenuButton>
        </Flex>
        <MenuList>
            {props.bpmns.map((bpmn, index) => {
                return  <MenuItem onClick={() =>  props.setBpmn(index)}>{bpmn.name + " " + index}</MenuItem>
            })

            }
        </MenuList>
    </Menu> 
  )
  }
  export default BPMNSwitcher;
  