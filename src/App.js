import {React, useState} from 'react';
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

function App() {
  const [current, setCurrent] = useState("BPMN")

  return (
    <ChakraProvider theme={theme}>
      <Flex bg="#F9FAFC" p="6"  h="100vh" zIndex={-3}>
        <Box zIndex={2}>
          <Navigation setCurrent={setCurrent} current={current} />
        </Box>
        <Box zIndex={2}>
          <Parameditor current={current}/>
        </Box>
        <Box>
          <BackgroundView current={current} zIndex={-5}/>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
