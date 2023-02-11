import React, { useEffect } from 'react'
import BpmnView from './BpmnView'

function BpmnViewSelector({ data, currentScenario, currentBpmn, setObject, setCurrent }) {
  useEffect(() => { 
    setCurrent("Modelbased Parameters")
  }, [setCurrent])

  return (
    <BpmnView key={currentBpmn} currentBpmn={data[currentScenario].models[currentBpmn]} setObject={setObject} />
  )
}

export default BpmnViewSelector;
