import React from 'react'

import Activity from './Modelbased/Activity';
import Gateway from './Modelbased/Gateway';


function ModelbasedParameters(props) {
  


    return (
        <>
          {props.selectedObject.id === undefined  ?
            <>
            {props.data[props.currentScenario].scenario.models[props.currentBpmn].name}
            
            
            </>

          : <></>
          }

          {props.selectedObject.id && props.selectedObject.id.includes("Gateway")  ?
          <Gateway selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }

          {props.selectedObject.id && props.selectedObject.id.includes("Task")  ?
          <Activity selectedObject={props.selectedObject} value={props.selectedObject.name? props.selectedObject.name : "" }/>
          : <></>
          }
        </>
    )
}

export default ModelbasedParameters;