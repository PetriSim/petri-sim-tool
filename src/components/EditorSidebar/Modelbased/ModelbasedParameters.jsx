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
          <Gateway setData={props.setData} getData={props.getData}  selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }

          {props.selectedObject.$type && props.selectedObject.$type.includes("Task")  ?
          <Activity setData={props.setData} getData={props.getData} selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }

          {props.selectedObject.$type && props.selectedObject.$type.includes("Event") && !props.selectedObject.$type.includes("Gateway")  ?
          <Event setData={props.setData} getData={props.getData} selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }
        </>
    )
}

export default ModelbasedParameters;