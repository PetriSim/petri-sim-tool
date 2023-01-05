import React from 'react'
import Sidebar from '../Sidebar';

import {
    Text,
  } from '@chakra-ui/react'

import ResourceParameters from './ResourceParameters';
import ModelbasedParameters from './ModelbasedParameters';
import ScenarioParameters from './ScenarioParameters';


function Parameditor(props) {


    const Editor = () => {
    return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" textTransform="uppercase">{props.current}</Text>            
    };


    const SelectEditor = () =>{
        switch (props.current) {
            case "Scenario Parameters": return  <ScenarioParameters currentScenario={props.currentScenario} setScenario={props.setScenario} getData={props.getData}/>
            case "Resource Parameters": return <ResourceParameters/>
            case "Modelbased Parameters": return <ModelbasedParameters setDataObj={props.setDataObj} selectedObject={props.selectedObject} setData={props.setData} getData={props.getData} currentBpmn={props.currentBpmn} currentScenario={props.currentScenario}/>
            default:
                <></>
        }
    }
    return (
        <>
            <Sidebar side="right" backgroundColor="#F0F0F1" title={<Editor/>} content={<SelectEditor/>} />
               
              
        </>
    )
}

export default Parameditor;