import { Text } from '@chakra-ui/react';
import {React, useState} from 'react'
import TabBar from '../Background/TabBar';

function ResourcePage(props) {
    const [tabs, setTabs] = useState([
        {
        tabname: "Organisational Chart",
        content: <Text>Organisational Chart content</Text> 
        },
        {
          tabname: "Timetabel",
          content: <Text>Timetable content</Text> 
        },
    
    ])


    return (
        <>
            <TabBar items={tabs}/>
            {props.data[props.currentScenario].scenario.models[props.currentBpmn].parameters.resource[0].role}
        </>
    )
}

export default ResourcePage;