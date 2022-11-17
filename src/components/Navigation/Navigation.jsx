import React from 'react'
import Sidebar from '../Sidebar';

import {
    Button,
    Text,
    MenuButton,
    Menu,
    MenuItem,
    MenuList,
    Flex,
    Input,
    Divider
    
  } from '@chakra-ui/react'
import NavigationItem from './NavigationItem';

import {
    FiTrendingUp,
    FiStar,
    FiSettings,

  } from 'react-icons/fi';

function Navigation(props) {

    const Nav = () => {
        return <>
                <Text fontSize="sm" textAlign="right" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PARAMETER EDITOR</Text>
                </>
      };




  return (
        <>
            <Sidebar side="left" backgroundColor="white" title={<Nav/>} 
            content={
                    <>
                    <NavigationItem current={props.current} setCurrent={props.setCurrent} />


                    <Divider/>
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
                    <Divider/>


                    <Button colorScheme='teal' variant='solid' onClick={() => props.setStarted("false")}>
                        Exit
                    </Button>

                    
                    </>
                } />
        </>
  )
}

export default Navigation;