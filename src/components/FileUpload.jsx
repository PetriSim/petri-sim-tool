import React, {useState} from 'react'
import {
    Flex, Button, Divider, Text, IconButton, Input, InputGroup, InputRightElement, FormLabel, Select, Icon
     
  } from '@chakra-ui/react'
import { FiChevronDown, FiChevronsDown, FiFile, FiFilePlus, FiMenu, FiUnderline } from 'react-icons/fi';

{/* To use this file Uploader just import it and write <FileUpload title = 'Writer your title' />*/}



function FileUpload(props) {
    onchange = () => {
        const selectedFile = document.getElementById('file-upload')
        const firstFile = selectedFile.files[0];
        {console.log(firstFile)}
    }
        
    

    return (
        
        
            <Flex width = '90%' flexDir = 'column'>
                
                <Text fontSize="s" textAlign="start" color="#485152" fontWeight="bold" > {props.title} </Text>
                <InputGroup width = "100%">
                <label for='file-upload' class = 'custom-file-upload'>
                Select file 
                </label>
                <Input id = 'file-upload' type = 'file'  accept={props.accept}/> 
                <InputRightElement pointerEvents='none' children={<FiFile />} />
                </InputGroup>
    
            </Flex>
            
    )
    
    
}
export default FileUpload;