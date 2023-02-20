import React, {useState, useEffect} from 'react'

import {
    Flex, Button, Divider, Text,Select, Box, Heading
     
  } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi';
import FileUpload from './FileUpload';
import axios from 'axios';

function StartView(props) {
  const [addExistingBPMN, setExistingBPMN] = useState(false);
  const [startNewProject, setNewProject] = useState(false);
  const [startExistingProject, setExistingProject] = useState(false);
  
  const pushToApp = (File) => {
    props.giveApp(File)
  }

  const startNewProjectNow = () => {
    setNewProject(true)
    setExistingProject(false)
  }
  const startExistingProjectNow = () => {
    setNewProject(false)
    setExistingProject(true)
  }



   const startNewData = () => {  
    axios
    .get(
      "http://127.0.0.1:8000/startdata"
    )
    .then(async (r) => {
      props.setData(r.data)
      })
    .catch((err) => {
        console.log("error", err);
    });

    // Set started to true => dashboard is loaded
    props.setStarted("true")
    sessionStorage.setItem('st', true); // ensures that dashboard is loaded even if the page is reloaded 

   }


   // Function for selecting an existing project
   const selectProject = (project) => {
    sessionStorage.setItem('currentProject', project); // selected project is set as current project
    props.setData(JSON.parse(localStorage.getItem(project))) // corresponding project data is loaded from local storage
    props.setName(project)
    props.setStarted("true") // Set started to true => dashboard is loaded
    sessionStorage.setItem('st', true);  // ensures that dashboard is loaded even if the page is reloaded 
   }


  

  function dateConverter(d){

    let x = new Date(d)
    var date = x.getDate();
    var month = x.getMonth() + 1;
    var year = x.getFullYear();
    var hours = x.getHours()
    var minutes = x.getMinutes()
        
    var dateStr = date + "/" + month + "/" + year + " " + hours + ":" + minutes;

    return dateStr
  }
    
  return (
    <Flex
      backgroundColor="white"
      alignItems="center"
      flexDir="column"
      gap="5"
      w = "100vw"
      h = "100vh"
      p = "6"
    >
      <gap />
      <Text fontSize="3xl" textAlign="left" color="H5C5C5C" fontWeight="bold" >PetriSim</Text>
      <Divider />

      {startNewProject || startExistingProject ? <></>
      :
      <>
      <gap /><gap /><gap /><gap /><gap />
      </>
      }
      
      <Flex
        backgroundColor="white"
        alignItems="center"
        flexDir="column"
        gap="50"     
      >
        {startNewProject ? 
        <>
          <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={400}          
          width={400} 
          >
            
            <gap />
            <Text fontSize="xl" textAlign="left" color="#485152" fontWeight="bold" > Start new project</Text>
            <gap />

            <FileUpload title = 'Event log:' accept = '.xes' getFile={pushToApp}/>

            <Flex width = '90%' flexDir = 'column'>
              <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select Discovery Tool:</Text>
              <Select placeholder = 'choose discovery tool' width = '100%' color="darkgrey" focusBorderColor='teal' backgroundColor= 'white' icon={<FiChevronDown />}>
                <option value='Simod'>Simod</option>
                <option value='Option 2'>Option 2</option>
                <option value='Option 3'>Option 3</option>
              </Select>
            </Flex>
             
            <Flex width = '90%' flexDir = 'column'>
              <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > Select Simulator:</Text>
              <Select placeholder = 'choose simulator' width = '100%' color="darkgrey" focusBorderColor='teal' backgroundColor= 'white' icon={<FiChevronDown />}>
                <option value='BIMP'>BIMP</option>
                <option value='Prosimus'>Prosimus</option>
                <option value='Scylla'>Scylla</option>
              </Select>
            </Flex>
         
            <Button color = 'white' colorScheme='teal' variant='solid' width='90%' onClick={startNewData} >
              Start parametrization
            </Button>

          </Flex>

        </> 
        :
          <Button boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={50}          
          width={400} 
          onClick={startNewProjectNow}
          fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">
            Start new project
          </Button>
        }

        {startExistingProject ? <>
          <Flex
          boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={addExistingBPMN ? 580 : 400}          
          width={400} 
        >
          
   
          <Text fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold" mt="5"> Open existing project from files</Text>
    


          <FileUpload title = 'Parameter file:' accept = '.json' getFile={pushToApp}/>

          <FileUpload title = 'BPMN file:' accept = '.bpmn' getFile={pushToApp}/>
        


          {addExistingBPMN ? <></> 
          :
          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' as = 'u' onClick={(()=> setExistingBPMN(true))}> 
            + add extra BPMN
          </Button>
          }         
          
          {addExistingBPMN ?
          <>
          <Divider borderColor="#485152" width = '90%'/>

          <FileUpload title = 'Parameter file:' accept = '.bpmn' getFile={pushToApp}/>
          <FileUpload title = 'BPMN file:' accept = '.bpmn' getFile={pushToApp}/>

          <Button color = 'grey' alignSelf= 'end' backgroundColor= '#F0F0F1' as = 'u' onClick={(()=> setExistingBPMN(false))}> 
            - remove BPMN
          </Button>
          </>
          : <></>
          }
         
          <Button colorScheme='teal' variant='solid' width='90%' onClick={() => props.setStarted("true")}>
            Start parametrization
          </Button>
        </Flex>

        </> 
        :
          <Button boxShadow='sm'
          rounded = '2xl'
          backgroundColor="#F0F0F1"
          alignItems="center"
          flexDir="column"
          gap="5"
          height={50}          
          width={400} 
          onClick={startExistingProjectNow}
          fontSize="xl" textAlign="left" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">
            Open project from files
          </Button>
        }
        

        <Flex flexDir="column" gap="5" width="100%" >
          <Heading size="md">Select existing project</Heading>
           <Flex h="30vh" overflowY="scroll" flexDir="column" gap="5">
                {!JSON.parse(localStorage.getItem('projects')) ? "" : JSON.parse(localStorage.getItem('projects')).sort((a, b) => new Date(b.date) - new Date(a.date)).map(project => {
                  return <Button p="4" h="20" onClick={() => selectProject(project.name)}><Flex direction="column" gap="3"><Text fontSize="lg">{project.name}</Text><Text fontSize="sm" color="gray.600">Last change: {dateConverter(project.date)}</Text></Flex></Button>
                })}
           </Flex>  
        </Flex>
      </Flex>
    </Flex> 
  )
}

export default StartView;