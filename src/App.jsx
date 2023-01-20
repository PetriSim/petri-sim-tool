import {React, useState, useEffect} from 'react';
import './styles/globals.css'
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Container
} from '@chakra-ui/react';
import Navigation from './components/Navigation/Navigation';
import EditorSidebar from './components/EditorSidebar/EditorSidebar';
import StartView from './components/StartView/StartView';
import BpmnViewSelector from './components/ModelbasedParameters/BpmnViewSelector';
import ResourcePage from './components/Pages/ResourcePage';
import ScenarioPage from './components/Pages/ScenarioPage';
import BpmnModelParser from './BpmnModelParser';
import OverviewPage from './components/Pages/OverviewPage'

import startData from './startdata.json'

import axios from "axios";
import {Routes, Route
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ModelbasedParametersTable from './components/ModelbasedParameters/ModelbasedParametersTable';
import SimulationPage from './components/Pages/SimulationPage';
import ComparePage from "./components/Pages/ComparePage";
import TimetableOverview from './components/Background/TimetableOverview';
import OrgCharTable from './components/Background/OrgCharTable';


function App() {
  const [current, setCurrent] = useState("Scenario Parameters")

  const [projectStarted, setStarted] = useState(sessionStorage.getItem('st') || "false")

                                      
  const [currentBpmn, setBpmn] = useState(0)
  const [currentScenario, setScenario] = useState(0)
  const [currentObject, setObject] = useState({})

  const [parsed, setParsed] = useState(false)

  const [data, setData] = useState([])
  

  const [currentResource, setResource] = useState("")
  const [currentRole, setRole] = useState("")
  const [currentTimetable, setTimetable] = useState("")

// Initial Data Array is created by copying data from startdata.json
useEffect(() =>{
  var parsedData = JSON.parse(JSON.stringify(startData))
   
   setData(parsedData)
}, [])


  useEffect(() => {
    sessionStorage.setItem('st', projectStarted);
  }, [projectStarted]);

  
  useEffect(() => {
    console.log(data)
  }, [data])
  

  useEffect(() => {
    console.log(currentObject)
  }, [currentObject])


  useEffect( () => {
    console.log(data[0])
    if(data[0]){
      data.forEach((scen, indexscen) => {
        
        scen.models.forEach((element, indexmodel) =>{
          axios
          .get(
            data[indexscen].models[indexmodel].BPMN
          )
          .then(async (r) => {
            var x = data[indexscen].models[indexmodel]
              x.modelParameter = await BpmnModelParser(r.data)
              setParsed(true)
            
            })
          .catch((err) => {
              console.log("error", err);
          });
        })
      })
    }
  }, [data])
  

 const getData = (type) => {
  switch (type) {
    case "currentScenario": return data[currentScenario]
    case "allScenarios": return data
    case "currentModel": return data[currentScenario].models[currentBpmn]
    case "allModels": return data[currentScenario]
    default:
      return data
  }

 }
 const addFile = (File) => {
  setData(JSON.parse(JSON.stringify(eval(File))));

}



  return (
    <ChakraProvider theme={theme}>

      {data[0] && 
      <Flex bg="#F9FAFC" h="100%" zIndex={-3} minH="100vh">
        {projectStarted === "false"?
          <StartView setStarted={setStarted} giveApp={addFile}/>
        :
        <>
          <Box zIndex={2} paddingTop={{base: "0", md:"6"}} >
            <Navigation 
              setCurrent={setCurrent}  
              current={current} 
              setStarted={setStarted} 
              currentBpmn={currentBpmn} 
              setBpmn={setBpmn} 
              currentScenario={currentScenario}
              data={data} 
              setScenario={setScenario}
          
              />
          </Box>

        
          <Container maxWidth="100%" padding={{base: "0", md:"5"}}>
            <Routes>
              <Route path="/overview" element={<OverviewPage path="/overview" parsed={parsed} getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} />} />
              <Route path="/resource" element={<OrgCharTable path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />
              <Route path="/resource/overview" element={<OrgCharTable path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/timetable" element={<TimetableOverview  path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />

              <Route path="/scenario" element={<ScenarioPage  path="/scenario" setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} setScenario={setScenario}/>} />
              <Route path="/compare" element={<ComparePage path="/overview" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} />} />


              <Route path="/modelbased" element={ <BpmnViewSelector zIndex={-5} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} />} />
              <Route path="/modelbased/tableview" element={ <ModelbasedParametersTable parsed={parsed} setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}   data={data} currentScenario={currentScenario} />} />
              <Route path="/simulation" element={<SimulationPage path="/simulation" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} />} />
              <Route path='*' element={<Navigate to='/overview' />} />
            </Routes>
         </Container>

         <Box zIndex={2} paddingTop={{base: "0", md:"6"}} >
            <Routes>
            <Route path="/resource" element={<EditorSidebar  setCurrent={setCurrent} setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} currentResource={currentResource} setResource={setResource} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/overview" element={<EditorSidebar  setCurrent={setCurrent} setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} currentResource={currentResource} setResource={setResource} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />
              <Route path="/resource/timetable" element={<EditorSidebar  setCurrent={setCurrent} setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} currentResource={currentResource} setResource={setResource} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />
              
              <Route path="/scenario" element={<EditorSidebar  setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario}/>} />
              <Route path="/scenario" element={<EditorSidebar  setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario}/>} />

              <Route path="/modelbased" element={<EditorSidebar  setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} selectedObject={currentObject}  currentScenario={currentScenario} />} />

            </Routes>
          </Box>
        </>
        }
      </Flex>

      }
    </ChakraProvider>
  );
}

export default App;
