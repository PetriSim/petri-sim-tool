import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import ViewButtons from "../Navigation/ViewButtons";
import axios from "axios";

import {
  ButtonGroup,
  IconButton,
  Flex,
  Box,
  Button
} from '@chakra-ui/react'

import { MinusIcon, AddIcon } from '@chakra-ui/icons'

function BpmnView({currentBpmn, setObject}) {
        const [diagram, diagramSet] = useState("");
        const [container, setContainer] = useState(null)
        const [clickedElement, clickedSet] = useState({});
        const [modelerRef, setModeler] = useState(null)
        
        

        useEffect(() => {
          setContainer(document.getElementById("container"))
        }, [])

        useEffect(() =>{
          if (container){
            container.innerHTML = ""
            setContainer(document.getElementById("container"))
            diagramSet("")
            setModeler("")
          }

        },[container])
       
        useEffect(() => {
          if (diagram.length === 0) {
            axios
              .get(
                currentBpmn.BPMN
              )
              .then((r) => {
                diagramSet(r.data)
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }, [diagram, container, currentBpmn.BPMN]);
      
      
        useEffect(() =>{

          if(diagram.length > 0){

            var mod = new Modeler({
              container,
              keyboard: {
                bindTo: document
              },
              additionalModules: [
    
                {
                  contextPad: ["value", {}],
                  contextPadProvider: ["value", {}],
                  palette: ["value", {}],
                  paletteProvider: ["value", {}],
                  dragging: ["value", {}],
                  move: ["value", {}],
                  create: ["value", {}],
            
                }
              ],
            });
        
            setModeler(mod)
          }
        }, [diagram, container])
      
      
        useEffect(() =>{
          if(modelerRef && diagram.length > 0){
            modelerRef
            .importXML(diagram)
            .then(({ warnings }) => {
              if (warnings.length) {
                console.log("Warnings", warnings);
              }
              modelerRef.get('canvas').zoom('fit-viewport', 'auto');
              modelerRef.get('zoomScroll').stepZoom(-2)
            })
            .catch((err) => {
              console.log("error", err);
            });
          }
        }, [diagram, modelerRef])
      
    

        useEffect(() => {
          if(modelerRef){
            modelerRef.get('zoomScroll').stepZoom(-1);

            var eventBus = modelerRef.get('eventBus');
            
            eventBus.on("element.click", (event) => {
              clickedSet(event.element.businessObject)

            });
          }
      }, [diagram,modelerRef]);
      
      
        useEffect(() => {
            if(Object.keys(clickedElement).length !== 0){
              setObject(clickedElement)
            }
        }, [clickedElement, setObject]);
      
      
        useEffect(() => {
    
          let timeoutId = null;
          const resizeListener = () => {
        
            clearTimeout(timeoutId);
    
            console.log("Resize")
            timeoutId = setTimeout(() => modelerRef.get('canvas').zoom('fit-viewport', 'auto'), 500);
          };
          window.addEventListener('resize', resizeListener);
      
          return () => {
            window.removeEventListener('resize', resizeListener);
          }
        }, [diagram, modelerRef])

        function zoomIn(){
          modelerRef.get('zoomScroll').stepZoom(1)
        }
    
        function zoomOut(){
          modelerRef.get('zoomScroll').stepZoom(-1)
        }
      
      
        return (
         <Flex>
            
          <Box id="container" w="100%" maxWidth="100%" h="90vh">
          </Box>
          

            <ButtonGroup 
                size='md' 
                spacing='6' 
                variant='unstyled' 
                position="absolute" 
                justifyContent="center" 
                bottom="10" 
                left="0px" 
                right="0px">
                  
                
                <IconButton onClick={zoomIn} 
                    icon={<AddIcon color="RGBA(0, 0, 0, 0.64)" />}  
                    bg="white"  
                    _hover={{bg: "blackAlpha.100"}}
                    rounded="20" 
                    shadow="md"/>
                <IconButton 
                    onClick={zoomOut} 
                    icon={<MinusIcon color="RGBA(0, 0, 0, 0.64)" />} 
                    bg="white" 
                    _hover={{bg: "blackAlpha.100", color: "RGBA(0, 0, 0, 0.94)"}}
                    rounded="20"
                    shadow="md" />
                
            
            
            <ViewButtons/>
            </ButtonGroup>
          </Flex>
          
          
        );
}

export default BpmnView;
  