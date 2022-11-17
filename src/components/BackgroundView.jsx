import React, { useEffect, useState } from 'react'
import BpmnView from './Background/BpmnView'

import {
    Box
  } from '@chakra-ui/react'

function BackgroundView(props) {
  
    const [bpmnViews, setViews] = useState(<></>)


    useEffect(() => {
        setViews(props.bpmns.map((x) =><BpmnView currentBpmn={x} />))
    },[props.bpmns])

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
  