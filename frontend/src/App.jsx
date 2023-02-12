import {React, useState, useEffect} from 'react';
import './styles/globals.css'
import {
  ChakraProvider, Box, theme, Flex, Container, Text, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, Button, Input, FormLabel, FormErrorMessage,  ModalCloseButton
} from '@chakra-ui/react';
import Navigation from './components/Navigation/Navigation';
import EditorSidebar from './components/EditorSidebar/EditorSidebar';
import StartView from './components/StartView/StartView';
import BpmnViewSelector from './components/ModelbasedParameters/BpmnViewSelector';
import ScenarioPage from './components/ScenarioParameters/ScenarioPage';
import OverviewPage from './components/Pages/OverviewPage';
import OnlyDifferencesPage from './components/Pages/OnlyDifferencesPage'
import ModelbasedParametersTable from './components/ModelbasedParameters/ModelbasedParametersTable';
import SimulationPage from './components/Pages/SimulationPage';
import ComparePage from "./components/Pages/ComparePage";
import TimetableOverview from './components/ResourceParameters/TimeTable/TimetableOverview';
import OrgCharTable from './components/ResourceParameters/Resources/OrgCharTable';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProgressPage from './components/StartView/ProgressPage';


const { compare } = require('js-deep-equals')

function App() {
  const [current, setCurrent] = useState("Scenario Parameters")

  const [projectStarted, setStarted] = useState(sessionStorage.getItem('st') || "false")

                                      
  const [currentBpmn, setBpmn] = useState(0)
  const [currentScenario, setScenario] = useState(0)
  const [currentObject, setObject] = useState({})

  const [parsed, setParsed] = useState(true)

  const [data, setDataInternal] = useState([])
  

  const [currentResource, setResource] = useState("")

  const [currentRole, setRole] = useState("")
  const [currentTimetable, setTimetable] = useState("")
  const [selectedScenario, setSelectedScenario] = useState("")

  const [scenariosCompare, setScenariosCompare] = useState("")
  const [notSameScenario, setNotSameScenario] = useState("")
  const [resourceCompared, setResourceCompared] = useState("")



const {onClose } = useDisclosure()

const [name, setName] = useState(sessionStorage.getItem('currentProject') || "")
const [nameHelper, setNameHelper] = useState(sessionStorage.getItem('currentProject') || "")

const toast = useToast()

const setData = (d) => {


  setDataInternal(d)

  if(name){

    if(!compare(JSON.parse(localStorage.getItem(name)), d)){
      toasting("success", "Saved", "Saved data")


      console.log(JSON.parse(localStorage.getItem(name)))
      console.log(d)

      localStorage.setItem(name, JSON.stringify(d));

      let projects = JSON.parse(localStorage.getItem('projects'))
      projects = projects.filter(project => project.name !== name)

      localStorage.setItem('projects', JSON.stringify([...projects, {name: name, date: new Date()}]));
    } else{
      toasting("warning", "Changes", "No changes were detected")
    }

  }

}


const toasting = (type, title, text) =>{
  toast({
    title: title,
    description: text,
    status: type,
    duration: 4000,
    isClosable: true,
  })
}

useEffect(() => {
  if(!sessionStorage.getItem('currentProject')){
    sessionStorage.setItem('st', false);
    setStarted("false")
  }

} ,[])

  useEffect(() => {
    if(name){
      console.log("has name")
      setDataInternal(JSON.parse(localStorage.getItem(name)))
    }

  }, [projectStarted]);


  useEffect(() => {
    console.log(data)
  })



  const [invalidName, setInvaild] = useState(false)

  const saveFile = () => {
    let projects = JSON.parse(localStorage.getItem('projects'))

    if((projects !== null && projects.map(x => x.name).includes(nameHelper)) || (projects !== null && nameHelper === "projects")){
      setInvaild(true)
    } else{
      setName(nameHelper)
      sessionStorage.setItem('currentProject', nameHelper);


      if(projects === null){
        localStorage.setItem('projects', JSON.stringify([{name: nameHelper, date: new Date()}]));
      } else{
        localStorage.setItem('projects', JSON.stringify([...projects, {name: nameHelper, date: new Date()}]));
      }

        localStorage.setItem(nameHelper, JSON.stringify(data));


        toasting("success", "Autosaving", "Autosaving is activated.")

    }
  }

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
      <Flex bg="#F9FAFC" h="100%" zIndex={-3} minH="100vh">
        {projectStarted === "false"?
          <StartView setStarted={setStarted} giveApp={addFile} setName={setName} setData={setData}/>
        :
        <>


      {data[0]?
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
              toasting={toasting}

              />
          </Box>

        
          <Container maxWidth="100%" padding={{base: "0", md:"5"}}>

          <Modal

            isOpen={name === ""}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Save project</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Provide a projectname under which your data is stored</Text>
                <FormControl isInvalid={invalidName}>
                  <FormLabel>Projectname: </FormLabel>
                  <Input autoFocus={true}  value={nameHelper} onChange={(e) => setNameHelper(e.target.value)} placeholder='Projectname' />
                  {invalidName?  <FormErrorMessage>Project with this name already exists</FormErrorMessage> : ""}

                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={saveFile}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

            <Routes>
              <Route path="/overview" element={<OverviewPage path="/overview" parsed={parsed} getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare}/>} />
              <Route path="/resource" element={<OrgCharTable path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/overview" element={<OrgCharTable path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/timetable" element={<TimetableOverview  path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />

              {/*<Route path="/scenario" element={<ScenarioPage  path="/scenario" setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} setScenario={setScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare}/>} />*/}
              <Route path="/compare" element={<ComparePage path="/overview" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare} notSameScenario={notSameScenario} setNotSameScenario={setNotSameScenario} resourceCompared={resourceCompared} setResourceCompared={setResourceCompared}/>}/>
              <Route path="/differences" element={<OnlyDifferencesPage path="/differences" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} notSameScenario={notSameScenario} setNotSameScenario={setNotSameScenario} resourceCompared={resourceCompared} setResourceCompared={setResourceCompared}/>}/>} />
              <Route path="/scenario" element={<ScenarioPage setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario}/>} />
              {/*<Route path="/differences" element={<OnlyDifferencesPage path="/differences" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare}/>} />*/}


              <Route path="/modelbased" element={ <BpmnViewSelector zIndex={-5} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} />} />
              <Route path="/modelbased/tableview" element={ <ModelbasedParametersTable parsed={parsed} setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}   data={data} currentScenario={currentScenario} />} />
              <Route path="/simulation" element={<SimulationPage path="/simulation" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} toasting={toasting} />} />
              <Route path='*' element={<Navigate to='/overview' />} />
            </Routes>
         </Container>

         <Box zIndex={2} paddingTop={{base: "0", md:"6"}} >
            <Routes>
            <Route path="/resource" element={<EditorSidebar  setCurrent={setCurrent} setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} currentResource={currentResource} setResource={setResource} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/overview" element={<EditorSidebar  setCurrent={setCurrent} setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} currentResource={currentResource} setResource={setResource} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />
              <Route path="/resource/timetable" element={<EditorSidebar  setCurrent={setCurrent} setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} currentResource={currentResource} setResource={setResource} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />
              
              <Route path="/scenario" element={<EditorSidebar  setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} selectedObject={currentObject}  currentScenario={currentScenario} setScenario={setScenario}  setCurrent={setCurrent} selectedScenario={selectedScenario} setSelectedScenario={selectedScenario}/> } />


              <Route path="/modelbased" element={<EditorSidebar  setData={setData} getData={getData} current={current} currentBpmn={currentBpmn} selectedObject={currentObject}  currentScenario={currentScenario}  setObject={setObject} />} />

            </Routes>
          </Box>
        </>
        : <ProgressPage/>}
        </>
        }
      </Flex>


    </ChakraProvider>
  );
}

export default App;
