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
  const [current, setCurrent] = useState("BPMN")
  const [projectStarted, setStarted] = useState(sessionStorage.getItem('st') || false)
  
  
  console.log(projectStarted ? "true": "false" )
  useEffect(() => {
    sessionStorage.setItem('st', projectStarted);
  }, [projectStarted]);


  return (
    <ChakraProvider theme={theme}>
      <Flex bg="#F9FAFC" p="6"  h="100vh" zIndex={-3}>

    {projectStarted == "false" ?
      <StartView setStarted={setStarted}/>
    :
    <>
      <Box zIndex={2}>
        <Navigation setCurrent={setCurrent}  setStarted={setStarted} current={current} />
      </Box>
      <Box zIndex={2}>
        <Parameditor current={current}/>
      </Box>
      <Box>
        <BackgroundView current={current} zIndex={-5}/>
      </Box>
    </>
    }





      </Flex>
    </ChakraProvider>
  );
}

export default App;
