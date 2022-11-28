import React from 'react'

import Activity from './Modelbased/Activity';
import Gateway from './Modelbased/Gateway';


function ModelbasedParameters(props) {
  


    return (
        <>
          {props.selectedObject.id === undefined  ?
            <>
            {props.getData("currentModel").name}
            
            
            </>

          : <></>
          }

          {props.selectedObject.id && props.selectedObject.id.includes("Gateway")  ?
          <Gateway setData={props.setData} getData={props.getData}  selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }

          {props.selectedObject.id && props.selectedObject.id.includes("Task")  ?
          <Activity setData={props.setData} getData={props.getData} selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }
        </>
    )
}

export default ModelbasedParameters;