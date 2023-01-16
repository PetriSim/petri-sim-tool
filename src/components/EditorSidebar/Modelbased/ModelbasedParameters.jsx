import {React, useEffect} from 'react'

import Activity from './Activity';
import Event from './Event';
import Gateway from './Gateway';


function ModelbasedParameters(props) {
  
useEffect(() => {
  
console.log(props.currentBpmn)

}, [props.currentBpmn])


    return (
        <>
          {props.selectedObject.$type === undefined  ?
            <>
            {props.getData("currentModel").name}
            
            
            </>

          : <></>
          }

          {props.selectedObject.$type && props.selectedObject.$type.includes("Gateway")  ?
          <Gateway setDataObj={props.setDataObj} selectedObject={props.selectedObject} setData={props.setData} getData={props.getData} currentBpmn={props.currentBpmn} currentScenario={props.currentScenario} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }

          {props.selectedObject.$type && props.selectedObject.$type.includes("Task")  ?
          <Activity setDataObj={props.setDataObj} selectedObject={props.selectedObject} setData={props.setData} getData={props.getData} currentBpmn={props.currentBpmn} currentScenario={props.currentScenario} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }

          {props.selectedObject.$type && props.selectedObject.$type.includes("Event") && !props.selectedObject.$type.includes("Gateway")  ?
          <Event setDataObj={props.setDataObj} selectedObject={props.selectedObject} setData={props.setData} getData={props.getData} currentBpmn={props.currentBpmn} currentScenario={props.currentScenario} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }
        </>
    )
}

export default ModelbasedParameters;