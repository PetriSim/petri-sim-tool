import React from 'react'
import Sidebar from '../Sidebar';

import {
    Text,
  } from '@chakra-ui/react'


import TypeSelector from './Modelbased/TypeSelector';
import AddTimetable from './Timetable/AddTimetable';
import AddResource from './ResourcesBased/AddResource';
import AddRole from './ResourcesBased/AddRole';
import EditTimetable from './Timetable/EditTimetable';
import AddScenario from './Scenario/AddScenario';
import EditScenario from './Scenario/EditScenario';
import EditResource from './ResourcesBased/EditResource';
import EditRole from './ResourcesBased/EditRole';

function Parameditor(props) {
    const Editor = () => {
    return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" textTransform="uppercase">{props.current}</Text>            
    };


    const SelectEditor = () =>{
        switch (props.current) {
            case "Resource Parameters": return <EditResource currentResource={props.currentResource} setResource={props.setResource} getData={props.getData} setCurrent={props.setCurrent} currentScenario={props.currentScenario} setData={props.setData}/>
            case "Resource Parameters for Roles": return <EditRole currentRole={props.currentRole} setRole={props.setRole} getData={props.getData} setCurrent={props.setCurrent} currentScenario={props.currentScenario} setData={props.setData}/>
            case "Add Scenario": return  <AddScenario currentScenario={props.currentScenario} setScenario={props.setScenario} getData={props.getData} setCurrent={props.setCurrent} selectedScenario={props.selectedScenario} setSelectedScenario={props.selectedScenario} setData={props.setData}/>
            case "Edit Scenario": return  <EditScenario currentScenario={props.currentScenario} setScenario={props.setScenario} getData={props.getData} setCurrent={props.setCurrent} selectedScenario={props.selectedScenario} setSelectedScenario={props.selectedScenario} setData={props.setData}/>
            case "Modelbased Parameters": return <TypeSelector setDataObj={props.setObject} selectedObject={props.selectedObject} setData={props.setData} getData={props.getData} currentBpmn={props.currentBpmn} currentScenario={props.currentScenario}/>
            case "Add Timetable": return <AddTimetable getData={props.getData}  setData={props.setData} currentScenario={props.currentScenario} setScenario={props.setScenario} setCurrent={props.setCurrent} currentTimetable={props.currentTimetable} setTimetable={props.setTimetable}/>
            case "Edit Timetable": return <EditTimetable getData={props.getData}  setData={props.setData} currentScenario={props.currentScenario} setScenario={props.setScenario} setCurrent={props.setCurrent} currentTimetable={props.currentTimetable} setTimetable={props.setTimetable} />
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