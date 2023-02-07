import {React, useState, useEffect} from 'react'
import TimetableOverview from '../Background/TimetableOverview';
import TabBar from '../TabBar'; 
import OrgCharTable from '../Background/OrgCharTable';
import {Box} from '@chakra-ui/react';

function ResourcePage(props) {


    useEffect(() => {
        console.log(1)
    }, [props.currentScenario, props])


    const [tabs] = useState([
        {
        tabname: "Organisational Chart", 
        content: < OrgCharTable setCurrent={props.setCurrent} getData = {props.getData} currentResource={props.currentResource} setResource={props.setResource} currentRole={props.currentRole} setRole={props.setRole}/>,
        link: "Resource Parameters"
        },
        {

          tabname: "Timetable",
          content: <TimetableOverview getData = {props.getData} setCurrent={props.setCurrent} currentScenario={props.currentScenario}/>,
          link: "Timetable"
        }

    ])

    return (
        <>      
        <Box h="93vh" overflowY="auto" w="100%" >     
            <TabBar items={tabs} setCurrent={props.setCurrent}/>
        </Box> 

        </>
    )
}

export default ResourcePage;