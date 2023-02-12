import React, { useState, useRef } from "react";
import { Flex, Heading, Card, CardHeader, CardBody, Text, Select, Stack, Button, Progress, Box, Textarea, UnorderedList, ListItem } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import axios from 'axios';

const SimulationPage = ({ data, setScenario, toasting }) => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [response, setResponse] = useState({});

  const source = useRef(null);

  const start = async () => {
    setResponse({ message: "", files: [{ name: "", link: "" }] });
    setFinished(false);
    setStarted(true);

    source.current = axios.CancelToken.source();

    try {
      const r = await axios.get("http://127.0.0.1:8000/startScylla", {
        cancelToken: source.current.token
      });

      setResponse(r.data);
      setFinished(true);
      setStarted(false);
      console.log(r.data);
      toasting("success", "Success", "Simulation was successful");
    } catch (err) {
      if (axios.isCancel(err)) {
        toasting("success", "Success", "Simulation was canceled");
      } else {
        toasting("error", "error", "Simulation was not successful");
      }
    }
  };

  const abort = () => {
    console.log("abort");
    source.current.cancel("Simulation was canceled");
    setStarted(false);
    setResponse({ message: "canceled" });
  };

  const download = async (link, name, type) => {
    const res = await fetch(link);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sessionStorage.getItem("currentProject")}_${name}.${type}`;
    a.click();
  };


    return (
        <Box h="93vh" overflowY="auto" p="5" >
        <Stack gap="2">
        <Heading size='lg' >Run Simulation</Heading>

        {started&& 
        <Card bg="white" p="5" >
            <Progress isIndeterminate isAnimated hasStripe value={100} colorScheme="green" />
        </Card>}

        {finished&& 
        <Card bg="white" p="5" >
            <Progress  hasStripe value={100} colorScheme="green" />
        </Card>}
            <Card bg="white">
                <CardHeader>
                    <Heading size='ms'> Simulation settings </Heading>
                </CardHeader>
                <CardBody>
                  
                    <Flex
                        gap="5"
                        flexDirection="row"
                        alignItems="end"
                        mt="-4"
                        >               
                            <Box>
                                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select scenario:</Text>
                                <Select placeholder = 'choose scenario' width = '100%' color="darkgrey" backgroundColor= 'white' icon={<FiChevronDown />}>
                                {data.map((scenario, index) => {
                                return  <option value= {scenario.scenarioName} onClick={() =>  setScenario(index)}>{scenario.scenarioName}</option>
                                })}
                                </Select>
                            </Box>
                            <Box>
                                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select simulator:</Text>
                                <Select placeholder = 'choose simulator' width = '100%' color="darkgrey"  backgroundColor= 'white' icon={<FiChevronDown />}>
                                    <option value='Simod'>Scylla</option>
                                </Select>
                            </Box>
                            
                            {!started&& 
                            <Button variant="outline" bg="#FFFF" onClick={start} >
                                <Text color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">Start Simulation</Text>
                            </Button>}

                            {started&& 
                            <Button variant="outline" bg="#FFFF" onClick={abort}>
                                <Text color="RGBA(0, 0, 0, 0.64)" fontWeight="bold">Abort Simulation</Text>
                            </Button>
                            }

                        </Flex>
                </CardBody>
            </Card>

            <Card bg="white">
                <CardHeader>
                    <Heading size='ms'> Simulator feedback </Heading>
                </CardHeader>
                <CardBody>
                    <Textarea isDisabled  value={response.message} />
                    {response.files && response.message && <>
                        <Heading size='ms' mt={5}>Click on the name of the file to download it:</Heading>
                        <UnorderedList>
                        {response.files.map(x => (<ListItem><Button onClick={() => download(x.link, x.name, x.type)} variant="link">{x.name}</Button></ListItem>)) }
                        </UnorderedList>
                    </>}
                </CardBody>
            </Card>
            
        
            
        </Stack>
        </Box>
    )
}
export default SimulationPage;