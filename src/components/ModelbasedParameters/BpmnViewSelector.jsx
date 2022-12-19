import React, { useEffect, useState } from 'react'
import BpmnView from './BpmnView'

function BpmnViewSelector(props) {
    const [bpmnViews, setViews] = useState(<></>)


    useEffect(() => { 
        props.setCurrent("Modelbased Parameters")
        setViews(props.data[props.currentScenario].models.map((x, index) => <BpmnView key={index} currentBpmn={x} setObject={props.setObject} />))
    },[props.currentBpmn, props.currentScenario, props.setObject, props.data, props])





  return (
    <>
      {
        bpmnViews[props.currentBpmn]
      }
    </>
  )
}

export default BpmnViewSelector;
  