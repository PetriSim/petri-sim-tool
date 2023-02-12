import React from 'react'
import BpmnViewSelector from './TablesOverviewComparison/BpmnViewSelector';
import ResourcePage from './Pages/ResourcePage';
import ScenarioPage from './Pages/ScenarioPage';
import OverviewPage from './Pages/OverviewPage';

function Page(props){

    const Switcher = () => {

        switch (props.current) {
            case "Modelbased Parameters":  return <BpmnViewSelector current={props.current} currentScenario={props.currentScenario} data={props.data} currentBpmn={props.currentBpmn} bpmns={props.bpmns} setObject={props.setObject} zIndex={-5} />
            case "Resource Parameters": return <ResourcePage currentScenario={props.currentScenario} data={props.data} currentBpmn={props.currentBpmn}/>
            case "Scenario Parameters": return <ScenarioPage currentScenario={props.currentScenario} data={props.data} currentBpmn={props.currentBpmn}/>
            case "Simulation Overview": return <OverviewPage current={props.current} currentScenario={props.currentScenario} data={props.data} currentBpmn={props.currentBpmn} bpmns={props.bpmns} setObject={props.setObject} zIndex={-5}/>
                default:
                break;
        }



    }

    return (

        <Switcher/>

        /*
        {
            "Scenario Parameters": <ScenarioPage/>,
            "Resource Parameters": <ResourcePage/>,
            "Modelbased Parameters":  <BpmnViewSelector current={props.current} currentBpmn={props.currentBpmn} bpmns={props.bpmns} setObject={props.setObject} zIndex={-5} />
        }[props.current]
        */
    )
}

export default Page;