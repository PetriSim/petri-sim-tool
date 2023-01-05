
import {React, useState, useEffect} from 'react'


function ScenarioPage(props) {


    return (
        <>
        
            {props.data[props.currentScenario].scenarioName}
        </>
    )
}

export default ScenarioPage;