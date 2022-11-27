import React, { useEffect, useState } from 'react'
import BpmnView from './BpmnView'

function BpmnViewSelector(props) {
    const [bpmnViews, setViews] = useState(<></>)

    useEffect(() => {      
       
        console.log("current:" + props.currentBpmn)
        setViews(props.data[props.currentScenario].scenario.models.map((x, index) => <BpmnView key={index} currentBpmn={x} setObject={props.setObject} />))
        //setViews(props.bpmns.map((x, index) => <BpmnView key={index} currentBpmn={x} currentScenario={props.currentScenario} data={props.data} setObject={props.setObject} />))
    },[props.currentBpmn])



  return (
        <>
          {
            bpmnViews[props.currentBpmn]
          }
        </>
  )
}

export default BpmnViewSelector;
  