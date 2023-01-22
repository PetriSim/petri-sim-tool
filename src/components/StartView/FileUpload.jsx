import React, {useEffect, useState} from 'react'
import {Flex,Text, Input, InputGroup, InputRightElement, Box} from '@chakra-ui/react'
import { FiCheck, FiFile} from 'react-icons/fi';


/* To use this file Uploader just import it and write <FileUpload title = 'Writer your title' />*/


function FileUpload(props) {
    const [fileUploaded, setFileUplaoded] = useState(false);
    var thisFile;
    const [thisFile2, setThisFile2] = useState("");
    const [thisFile3, setThisFile3] = useState();

    
   const handleChange = e => {
        
        const selectedFile = document.getElementById('file-upload')
     
        thisFile = selectedFile.files[selectedFile.files.length -1];
        
        setThisFile3(thisFile);

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");

        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            var myFile = e.target.result
            setThisFile2(e.target.result);
        //   setThisFile2(e.target.result);

            setFileUplaoded(true)
            props.getFile(myFile)

         }
    }   
        
    

    return (
        
            <Flex width = '90%' flexDir = 'column'>
                
                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > {props.title} </Text>
                <InputGroup width = "100%">
                {fileUploaded ?
                <label for='file-upload' class = 'custom-file-upload'>
                {thisFile3.name + ''} 
                </label>
                :
                <label for='file-upload' class = 'custom-file-upload'>
                Select file 
                </label>
                }
           
                <Input id = 'file-upload' type = 'file'  accept={props.accept} onChange={handleChange}/> 
                {fileUploaded ?
                <InputRightElement pointerEvents='none' children={<FiCheck />} />
                :
                <InputRightElement pointerEvents='none' children={<FiFile />} />
                }
                </InputGroup>

               
    
            </Flex>
            
    )
    
    
}
export default FileUpload;