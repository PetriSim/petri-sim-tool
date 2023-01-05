import {React, useState, useEffect} from 'react'
import OrgCharTable from '../Background/OrgCharTable';
import TimetableOverview from '../Background/TimetableOverview';
import TabBar from '../TabBar'; 

function ResourcePage(props) {

    useEffect(() =>{
        props.setCurrent("Resource Parameters")
      },[props])

      useEffect(() =>{
        props.setCurrent("Resource Parameters for Roles")
      },[props])


    const [tabs] = useState([
        {
        tabname: "Organisational Chart", 
        content: < OrgCharTable getData = {props.getData} currentResource={props.currentResource} setResource={props.setResource} currentRole={props.currentRole} setRole={props.setRole}/>
        },
        {
          tabname: "Timetable",
          content: <TimetableOverview getData = {props.getData}/> 
        }
    ])

    return (
        <>            
            <TabBar items={tabs}/>

        </>
    )
}

export default ResourcePage;