import React from 'react'
import Sidebar from '../Sidebar';

import {
    Text,
  } from '@chakra-ui/react'

import ResourceParameters from './ResourcesBased/ResourceParameters';
import ModelbasedParameters from './Modelbased/ModelbasedParameters';
import ResourceParametersForRoles from './ResourcesBased/ResourceParametersForRoles';
import ScenarioParameters from './ScenarioParameters';
import Timetable from './ResourcesBased/Timetable';
import AddResource from './ResourcesBased/AddResource';
import AddRole from './ResourcesBased/AddRole';

function Parameditor(props) {
    const Editor = () => {
    return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" textTransform="uppercase">{props.current}</Text>            
    };


    const SelectEditor = () =>{
        switch (props.current) {

            case "Resource Parameters": return <ResourceParameters currentResource={props.currentResource} setResource={props.setResource} getData={props.getData} setCurrent={props.setCurrent} currentScenario={props.currentScenario} setData={props.setData}/>
            case "Resource Parameters for Roles": return <ResourceParametersForRoles currentRole={props.currentRole} setRole={props.setRole} getData={props.getData} setCurrent={props.setCurrent} currentScenario={props.currentScenario} setData={props.setData}/>
            case "Scenario Parameters": return  <ScenarioParameters currentScenario={props.currentScenario} setScenario={props.setScenario} getData={props.getData}/>
            case "Modelbased Parameters": return <ModelbasedParameters setDataObj={props.setDataObj} selectedObject={props.selectedObject} setData={props.setData} getData={props.getData} currentBpmn={props.currentBpmn} currentScenario={props.currentScenario}/>
            case "Timetable": return <Timetable getData={props.getData}  setData={props.setData} currentScenario={props.currentScenario} setScenario={props.setScenario} />
            case "Add Resource": return <AddResource getData={props.getData}  setData={props.setData} setCurrent={props.setCurrent}  currentScenario={props.currentScenario}/>
            case "Add Role": return <AddRole getData={props.getData}  setData={props.setData} setCurrent={props.setCurrent}  currentScenario={props.currentScenario}/>
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