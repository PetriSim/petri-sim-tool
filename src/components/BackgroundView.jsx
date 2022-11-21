import React, { useEffect, useState } from 'react'
import BpmnView from './Background/BpmnView'

import {
    
  } from '@chakra-ui/react'

function BackgroundView(props) {
  
    const [bpmnViews, setViews] = useState(<></>)


    useEffect(() => {
        setViews(props.bpmns.map((x) =><BpmnView currentBpmn={x} setObject={props.setObject} />))
    },[props.bpmns, props.setObject])

    console.log(props.currentBpmn)

  return (<>
        {props.current === "Modelbased Parameters" ?  
        <>

        {
          bpmnViews[props.currentBpmn]
        }

        </>

 
        : ""}
       </>
   
    
  )
}

export default BackgroundView;
  