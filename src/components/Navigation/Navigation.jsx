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
    Icon
    
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
                    <Menu>
                    <MenuButton as={Button} w="100%"  textAlign="left" p={3} borderRadius={8}>
                        <Flex alignItems='center' >
                            <Flex 
                            borderRadius='lg' bg="#FFFF" color='white' h={7} w={7} justifyContent='center' alignItems='center' >
                                <Icon as={FiStar} fontSize="md" color={"RGBA(0, 0, 0, 0.64)"} />
                            </Flex>
                            
                            <Text ml={5} fontSize="sm" color="RGBA(0, 0, 0, 0.64)" fontWeight="bold" display="flex">{props.bpmns[props.currentBpmn].name}</Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        {props.bpmns.map((bpmn, index) => {
                            return  <MenuItem onClick={() =>  props.setBpmn(index)}>{bpmn.name + " " + index}</MenuItem>
                        })

                        }
                       

                    </MenuList>
                    </Menu>

                    <NavigationItem current={props.current} setCurrent={props.setCurrent} />
                    <Button colorScheme='teal' variant='solid' onClick={() => props.setStarted("false")}>
                        Exit
                    </Button>
                    </>
                } />
        </>
  )
}

export default Navigation;