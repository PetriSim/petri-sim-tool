import { Input, FormControl, FormLabel, Box, Stack } from "@chakra-ui/react";
import {React, useState, useEffect} from "react";

const Gateway = ({ selectedObject, getData }) => {
  const [probabilities, setProbabilities] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    const selectedGateway = getData("currentModel").modelParameter.gateways.find((value) => value.id === selectedObject.id);
    if (selectedGateway) {
      setProbabilities(
        selectedGateway.outgoing.map(
          (element) =>
            getData("currentModel").modelParameter.sequences.find(
              (value) => value.id === element
            ).probability
        )
      );
      setOutgoing(selectedGateway.outgoing);
    }
  }, [selectedObject, getData]);

  const handleprobability = (event, index, seq) => {
    const value = event.target.value;
    const newProbabilities = [...probabilities];
    newProbabilities[index] = value;
    setProbabilities(newProbabilities);
    getData("currentModel").modelParameter.sequences.find(
      (seqq) => seqq.id === seq
    ).probability = newProbabilities[index];
  };


  
  

  return (
    <Box w="100%">
          <Stack gap="2">        
            <FormControl>
              <FormLabel>Selected Gateway:</FormLabel>
              <Input
                title="Test date"
                value={selectedObject.id ? selectedObject.id : ""}
                type="inputRead"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Probability:</FormLabel>
              {outgoing.map((element, index) => (
                <>
                  <Input type="inputRead" value={element} w="65%" />
                  <Input
                    onChange={(event) => handleprobability(event, index, element)}
                    value={probabilities[index]}
                    bg="white"
                    w="30%"
                    marginLeft="4%"
                    marginBottom="10px"
                  />
                </>
              ))}
            </FormControl>
        </Stack>
        </Box>
  );
};

export default Gateway;
