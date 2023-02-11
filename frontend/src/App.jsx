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
import SimulationPage from './components/Simulation/SimulationPage';
import ComparePage from "./components/Pages/ComparePage";
import TimetableOverview from './components/ResourceParameters/TimeTable/TimetableOverview';
import OrgCharTable from './components/ResourceParameters/Resources/OrgCharTable';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProgressPage from './components/StartView/ProgressPage';

const { compare } = require('js-deep-equals')

function App() {
  const [projectStarted, setStarted] = useState(sessionStorage.getItem('st') || "false") // checks if the starting flaf is stet in the session storage to display the dashboard or otherwise the startpage

        
  const [parsed, setParsed] = useState(true) // to be removed 

  const [data, setDataInternal] = useState([]) // method is used to save data from the discoverytool 

  // State is used for changing / adding a project name, it firest checks if project is already set as current in the session storage
  const [name, setName] = useState(sessionStorage.getItem('currentProject') || "")
  const [nameHelper, setNameHelper] = useState(sessionStorage.getItem('currentProject') || "")


  
  const [current, setCurrent] = useState("Scenario Parameters")  // Current Page => Imoprtant for the navigation to highlight the current page

  // store and set information which BPMN and scenario is currently selected
  const [currentBpmn, setBpmn] = useState(0)
  const [currentScenario, setScenario] = useState(0)


  // These states are used to store information which "items" are currently selected in the table and are then displayed on the rigth sidebar (EditorSidebar)
  const [currentResource, setResource] = useState("")           
  const [currentRole, setRole] = useState("")                   
  const [currentTimetable, setTimetable] = useState("")
  const [selectedScenario, setSelectedScenario] = useState("")

  // State is used to store information about which BPMN object (event, gateway, task) is selected and displayed on the rigth sidebar (EditorSidebar)
  const [currentObject, setObject] = useState({})



  const [scenariosCompare, setScenariosCompare] = useState("")



  const {onClose } = useDisclosure()


// This method updates the internal data in the tool if a subcomponent calls the setData method. 
//But before the data is changed first it checks if there is realy a change in the data and gives returns a message which is displayed 
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

// Is a state that comes from the Chakra-UI and is used to display messages (success, warning or error)
const toast = useToast()

// Function coming from chakra UI and is used to display messages (success, warning or error)
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


// if a project is started and has a name (meaning it is started by selecting and existing project), the internal data is filled with data from the localStorage 
useEffect(() => {
  if(name){
    setDataInternal(JSON.parse(localStorage.getItem(name)))
  }
  
}, [projectStarted]);
  

// code for debugging
useEffect(() => {
  console.log(data)
})


  // state to check if a project name already exists 
  const [invalidName, setInvaild] = useState(false)

  // function to save a project in the localstorage with a name
  // The name is also added to the array "projects" in the localstorage, which includes all project names that are saved in the localStorage
  const saveProject = () => {
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

// Function to make it easy to access only parts of the data  
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
      <Flex bg="#F9FAFC" h="100%" zIndex={-3} minH="100vh" overflowX="hidden">

      {/*If not session exists the start view is displayed */}

        {projectStarted === "false"?
          <StartView setStarted={setStarted} giveApp={addFile} setName={setName} setData={setData}/>
        :
        <>

      {/*If a session and data exists the dashboard is displayed */}
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

        
          <Container maxWidth="100%" padding={{base: "0", md:"5"}} overflowX="scroll">

            {/* Modal is a chakra UI component similar to a popup. Her it is used to save a pproject by its name and display an error if the name already existis  */}
          <Modal
            isOpen={name === ""}  //Modal is only shown as long as no name is set
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
                <Button colorScheme='blue' mr={3} onClick={saveProject}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

            {/*  These routes define which components are loaded into the center of the page for each path and pass the needed props*/}
            <Routes>
              <Route path="/overview" element={<OverviewPage path="/overview" parsed={parsed} getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare}/>} />
              <Route path="/resource" element={<OrgCharTable path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/overview" element={<OrgCharTable path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} />} />
              <Route path="/resource/timetable" element={<TimetableOverview  path="/resource" setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable}/>} />

              <Route path="/scenario" element={<ScenarioPage setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}  data={data} setScenario={setScenario} currentScenario={currentScenario} currentResource={currentResource} setResource={setResource} currentRole={currentRole} setRole={setRole} currentTimetable={currentTimetable} setTimetable={setTimetable} selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario}/>} />
              <Route path="/compare" element={<ComparePage path="/overview" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare}/>} />
              <Route path="/differences" element={<OnlyDifferencesPage path="/differences" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} scenariosCompare={scenariosCompare} setScenariosCompare={setScenariosCompare}/>} />


              <Route path="/modelbased" element={ <BpmnViewSelector zIndex={-5} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} />} />
              <Route path="/modelbased/tableview" element={ <ModelbasedParametersTable parsed={parsed} setData={setData} getData={getData} current={current} setCurrent={setCurrent} setObject={setObject} currentBpmn={currentBpmn}   data={data} currentScenario={currentScenario} />} />
              <Route path="/simulation" element={<SimulationPage path="/simulation" getData={getData} setCurrent={setCurrent} current={current} setObject={setObject} currentBpmn={currentBpmn}  data={data} currentScenario={currentScenario} toasting={toasting} />} />
              <Route path='*' element={<Navigate to='/overview' />} />
            </Routes>
         </Container>

{/*  These routes define which components are loaded into the right side of the page (sidebar) for each path and pass the needed props*/}   
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
        : <ProgressPage/> }  {/*  The progresspage is showen if a session is started but the data is still not there (waiting from the discovery tool) */}
        </>
        }
      </Flex>

      
    </ChakraProvider>
  );
}

export default App;
