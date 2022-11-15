import React from 'react'
import BpmnView from './Background/BpmnView'

import {
    Box
  } from '@chakra-ui/react'

function BackgroundView(props) {
  return (<>
    
        {props.current === "BPMN" ?  <BpmnView /> : ""}
       </>
   
    
  )
}

export default BackgroundView;
  