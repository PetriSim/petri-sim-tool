import {React, useState, useEffect} from 'react';
import './styles/globals.css'
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
} from '@chakra-ui/react';
import BackgroundView from './components/BackgroundView'
import Navigation from './components/Navigation/Navigation';
import Parameditor from './components/Parameditor';
import StartView from './components/StartView';

function App() {
  const [current, setCurrent] = useState("Modelbased Parameters")
  const [projectStarted, setStarted] = useState(sessionStorage.getItem('st') || false)
  const [bpmns, setBpmns] = useState([{
                                        name: "Warenversand",
                                        file : "https://raw.githubusercontent.com/camunda/bpmn-for-research/master/BPMN%20for%20Research/German/01-Vorbereitung-des-Warenversands/03-Musterl%C3%B6sung/vorbereitung-des-warenversands.bpmn" 
                                      },
                                      {
                                        name: "Schufascoring",
                                        file : "https://raw.githubusercontent.com/camunda/bpmn-for-research/master/BPMN%20for%20Research/German/03-Schufascoring/03-Musterl%C3%B6sung/schufascoring-asynchron.bpmn"
                                      },
                                      {
                                        name: "Selbstbedienung",
                                        file : "https://raw.githubusercontent.com/camunda/bpmn-for-research/master/BPMN%20for%20Research/German/04-Selbstbedienungsrestaurant/03-Musterl%C3%B6sung/selbstbedienungsrestaurant.bpmn"
                                      }])

                                      
  const [currentBpmn, setBpmn] = useState(0)
  const [currentObject, setObject] = useState({})
  
  
  useEffect(() => {
    sessionStorage.setItem('st', projectStarted);
  }, [projectStarted]);




  return (
    <ChakraProvider theme={theme}>
      <Flex bg="#F9FAFC" p="6" h="100vh" zIndex={-3}>
        {projectStarted === "false" ?
          <StartView setStarted={setStarted}/>
        :
        <>
          <Box zIndex={2}>
            <Navigation setCurrent={setCurrent}  setStarted={setStarted} current={current} bpmns={bpmns} currentBpmn={currentBpmn} setBpmn={setBpmn} />
          </Box>
          <Box zIndex={2}>
            <Parameditor current={current} selectedObject={currentObject}  />
          </Box>
          <Box>
            <BackgroundView current={current} currentBpmn={currentBpmn} bpmns={bpmns} setObject={setObject} zIndex={-5}/>
          </Box>
        </>
        }
      </Flex>
    </ChakraProvider>
  );
}

export default App;
