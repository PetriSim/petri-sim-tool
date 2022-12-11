import React, {useState} from 'react'
import {
    Flex, Button, Divider, Text, IconButton, Input, InputGroup, InputRightElement, FormLabel, Select, Icon
     
  } from '@chakra-ui/react'
import { FiCheck, FiChevronDown, FiChevronsDown, FiFile, FiFilePlus, FiMenu, FiUnderline, FiUserCheck } from 'react-icons/fi';

{/* To use this file Uploader just import it and write <FileUpload title = 'Writer your title' />*/}



function FileUpload(props, ) {
    const [fileUploaded, setFileUplaoded] = useState(false);
    var thisFile;
    const [thisFile2, setThisFile2] = useState();
    
    onchange = () => {
        const selectedFile = document.getElementById('file-upload')
        thisFile = selectedFile.files[selectedFile.files.length -1];
        {thisFile == null ? <></>
        :
        setFileUplaoded(true)
        }
        setThisFile2(thisFile);
        props.getFile(thisFile)
        
    }
        
    

    return (
        
            <Flex width = '90%' flexDir = 'column'>
                
                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > {props.title} </Text>
                <InputGroup width = "100%">
                {fileUploaded ?
                <label for='file-upload' class = 'custom-file-upload'>
                {thisFile2.name + ''} 
                </label>
                :
                <label for='file-upload' class = 'custom-file-upload'>
                Select file 
                </label>
                }
                
                <Input id = 'file-upload' type = 'file'  accept={props.accept}/> 
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