import React from 'react'
import Sidebar from './Sidebar';

import {
    Text,
  } from '@chakra-ui/react'

import ResourceParameters from './ParameterPages/ResourceParameters';
import ModelbasedParameters from './ParameterPages/ModelbasedParameters';


function Parameditor(props) {


    const Editor = () => {
    return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" textTransform="uppercase">{props.current}</Text>
                
            
    };

    return (
        <>
            <Sidebar side="right" backgroundColor="#F0F0F1" title={<Editor/>} content={
           
           
                {
                    'Scenario Parameters':  <ResourceParameters/>,
                    'Resource Parameters':  <ResourceParameters/>,
                    'Modelbased Parameters': <ModelbasedParameters selectedObject={props.selectedObject}/>
                }[props.current]
            
                
            } />
               
              
        </>
    )
}

export default Parameditor;