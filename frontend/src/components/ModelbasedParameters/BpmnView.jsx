import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import ViewButtons from "./ViewButtons";
import axios from "axios";
import { ButtonGroup, IconButton, Flex, Box } from '@chakra-ui/react'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'

function BpmnView({currentBpmn, setObject}) {

  // State storing the bpmn diagram
  const [diagram, setDiagram] = useState("");
  //state to sore the refrence of the container that caintins the modeler
  const [containerRef, setContainerRef] = useState(null);
  // state to store the current clicked elementid of an activity, event or gateway
  const [clickedElement, setClickedElement] = useState({});
  //state storing the reference of the bpmn modeler
  const [modeler, setModeler] = useState(null);

  // set the container reference wehen component is mounted
  useEffect(() => {
    setContainerRef(document.getElementById("container"));
  }, []);

  // acces bpmn diagram and set bpmn diagram
  useEffect(() => {
    axios
      .get(currentBpmn.BPMN)
      .then(({ data }) => {
        setDiagram(data);
      })
      .catch(console.error);
  }, [currentBpmn.BPMN]);



  useEffect(() => {
    if (!containerRef || !diagram) return;

    containerRef.innerHTML = "";
    setModeler(
      new Modeler({
        container: containerRef,
        keyboard: {
          bindTo: document,
        },

        // remove sidebar from bpmn.io which is used to add elements to bpmn diagram
        additionalModules: [
          {
            contextPad: ["value", {}],
            contextPadProvider: ["value", {}],
            palette: ["value", {}],
            paletteProvider: ["value", {}],
            dragging: ["value", {}],
            move: ["value", {}],
            create: ["value", {}],
          },
        ],
      })
    );
  }, [containerRef, diagram]);


  // Initialize the BPMN modeler when the container reference and diagram are available
  useEffect(() => {
    if (!modeler || !diagram) return;

    modeler
      .importXML(diagram)
      .then(({ warnings }) => {
        if (warnings.length) {
          console.log("Warnings", warnings);
        }
        modeler.get("canvas").zoom("fit-viewport", "auto");
        modeler.get("zoomScroll").stepZoom(-2);
      })
      .catch(console.error);
  }, [modeler, diagram]);

  // zoom into diagram after it is initialized
  useEffect(() => {
    if (!modeler) return;

    modeler.get("zoomScroll").stepZoom(-1);
    const eventBus = modeler.get("eventBus");
    eventBus.on("element.click", (event) => {
      setClickedElement(event.element.businessObject);
    });
  }, [modeler]);


      // set clicked element and pass to App component => selected element is displayed in editorsidebar      
        useEffect(() => {
            if(Object.keys(clickedElement).length !== 0){
              setObject(clickedElement)
            }
        }, [clickedElement, setObject]);
      
      
        // ensures that diagram is centered if window is resized
        useEffect(() => {
    
          let timeoutId = null;
          const resizeListener = () => {
        
            clearTimeout(timeoutId);
    
            console.log("Resize")
            timeoutId = setTimeout(() => modeler.get('canvas').zoom('fit-viewport', 'auto'), 500);
          };
          window.addEventListener('resize', resizeListener);
      
          return () => {
            window.removeEventListener('resize', resizeListener);
          }
        }, [diagram, modeler])

        function zoomIn(){
          modeler.get('zoomScroll').stepZoom(1)
        }
    
        function zoomOut(){
          modeler.get('zoomScroll').stepZoom(-1)
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
  