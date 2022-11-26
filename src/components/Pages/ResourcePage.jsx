import { Text } from '@chakra-ui/react';
import {React, useState, UseEffect} from 'react'
import TabBar from '../Background/TabBar';

function ResourcePage() {
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
        </>
    )
}

export default ResourcePage;