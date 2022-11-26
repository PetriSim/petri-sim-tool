import React from 'react'
import BpmnViewSelector from './Background/BpmnViewSelector';
import ResourcePage from './Pages/ResourcePage';
import ScenarioPage from './Pages/ScenarioPage';



function Page(props){

return (

    {
        "Scenario Parameters": <ScenarioPage/>,
        "Resource Parameters": <ResourcePage/>,
        "Modelbased Parameters":  <BpmnViewSelector current={props.current} currentBpmn={props.currentBpmn} bpmns={props.bpmns} setObject={props.setObject} zIndex={-5} />
    }[props.current]

)


}

export default Page;