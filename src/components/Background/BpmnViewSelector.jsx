import React, { useEffect, useState } from 'react'
import BpmnView from './BpmnView'

function BpmnViewSelector(props) {
    const [bpmnViews, setViews] = useState(<></>)

  useEffect(() =>{
    props.setCurrent("Modelbased Parameters")
  },[props])

    useEffect(() => {      
        console.log("current:" + props.currentBpmn)
        setViews(props.data[props.currentScenario].scenario.models.map((x, index) => <BpmnView key={index} currentBpmn={x} setObject={props.setObject} />))
    },[props.currentBpmn, props.currentScenario, props.setObject, props.data])



  return (
        <>
          {
            bpmnViews[props.currentBpmn]
          }
        </>
  )
}

export default BpmnViewSelector;
  