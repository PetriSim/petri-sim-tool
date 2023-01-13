import {React, useState} from 'react'
import TimetableOverview from '../Background/TimetableOverview';
import TabBar from '../TabBar'; 
import OrgCharTable from '../Background/OrgCharTable';
import {Box} from '@chakra-ui/react';

function ResourcePage(props) {





    const [tabs] = useState([
        {
        tabname: "Organisational Chart", 
        content: < OrgCharTable setCurrent={props.setCurrent} getData = {props.getData} currentResource={props.currentResource} setResource={props.setResource} currentRole={props.currentRole} setRole={props.setRole}/>
        },
        {

          tabname: "Timetable",
          content: <TimetableOverview getData = {props.getData}/> 
        }

    ])

    return (
        <>      
        <Box h="93vh" overflowY="auto" w="100%" >     
            <TabBar items={tabs}/>
        </Box> 

        </>
    )
}

export default ResourcePage;