import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import axios from "axios";


 function BpmnParser({currentBpmn, bpmns, data, setData }) {

        const [diagram, diagramSet] = useState("");
        const [modelerRef, setModeler] = useState(null)
        
       
        useEffect(() => {
         
            axios
              .get(
                bpmns[currentBpmn].file
              )
              .then((r) => {
                diagramSet(r.data)
              })
              .catch((e) => {
                console.log(e);
              });
          
        }, [bpmns, currentBpmn]);
      
      
        useEffect(() =>{

          if(diagram.length > 0){

            var mod = new Modeler();
        
            setModeler(mod)
          }
        }, [diagram])
      
      
        useEffect(() =>{
          if(modelerRef && diagram.length > 0){
            modelerRef
            .importXML(diagram)
            .then(({ warnings }) => {
              if (warnings.length) {
                console.log("Warnings", warnings);
              }

              var elementRegistry = modelerRef.get('elementRegistry');

              var internal = {
                activities: [],
                gateways: [],
                events: [],
                sequences: []
              }

              var elements = elementRegistry.getAll()
              

              elements.forEach(element => {
                if(element.type.includes("Gateway")){
                  internal.gateways.push(
                    {
                      "id": element.id,
                      "type": element.type,
                      "incoming": element.incoming.map(seq => seq.id),
                      "outgoing": element.outgoing.map(seq => seq.id),
                    }
                    )
                }

                if(element.type.includes("Task")){
                  internal.activities.push(
                    {
                      "id": element.id,
                      "type": element.type,
                      "resource": "Courier",
                      "duration": 5,
                      "unit": "mins",
                      "cost": 2,
                      "currency": "euro"
                    }
                    )
                }

                if(element.type.includes("Event")){
                  internal.events.push(
                    {
                      "id": element.id,
                      "type": element.type,
                      "resource": "Courier",
                      "duration": 5,
                      "unit": "mins",
                      "cost": 2,
                      "currency": "euro"
                    }
                    )
                }

                if(element.type.includes("Sequence")){
                  
                  internal.sequences.push(
                    {
                      "id": element.id,
                      "type": element.type,
                      "probability": 0.25
                    }
                    )
                }

                }
              )
                
              setData(data.modelParameter = internal)
            })
            .catch((err) => {
              console.log("error", err);
            });
          }
        }, [diagram, modelerRef, setData])

        return (
         
        <></>
        );
}

export default BpmnParser;
  