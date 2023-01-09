import {React, useState, useEffect} from 'react'
import OrgCharTable from '../Background/OrgCharTable';
import TimetableOverview from '../Background/TimetableOverview';
import TabBar from '../TabBar'; 

function ResourcePage(props) {

    useEffect(() =>{
        props.setCurrent("Resource Parameters")
      },[props])


    const [tabs] = useState([
        {
        tabname: "Organisational Chart",
        content: < OrgCharTable getData = {props.getData}/>
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