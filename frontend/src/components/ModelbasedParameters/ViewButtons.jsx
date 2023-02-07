import React,{useState} from "react";
import {
    Button
  } from '@chakra-ui/react'
  import { Link } from "react-router-dom";


function ViewButtons(props){
    const [view, setview] = useState(false)

        const changeview  = () => {
          view ? setview(false) : setview(true)
        }


    return(
        <>
        <Button 
              bg = {view ? 'blackAlpha.100' : 'white'}
              position = 'absolute'
              bottom = '40px'
              left = '330px'
              variant='unstyled' 
              _hover={{bg: "blackAlpha.100"}}
              rounded="20" 
              shadow="md"
              onClick={changeview}
            >
              View
            </Button>

            {view ? 
            <>
              <Button 
                bg = 'white'
                position = 'absolute'
                bottom = '10px'
                left = '370px'
                variant='unstyled' 
                height= '25px'
                width = '75px'
                _hover={{bg: "blackAlpha.100"}}
                rounded="10" 
                shadow="md"
                size='20'

                onClick={changeview}
              >
                XML
              </Button>
              <Button as={Link} to="/modelbased/tableview"
             
                bg = 'white'
                position = 'absolute'
                bottom = '40px'
                left = '375px'
                variant='unstyled' 
                height= '25px'
                width = '75px'
                _hover={{bg: "blackAlpha.100"}}
                rounded="10" 
                shadow="md"
                size='20'
                onClick={changeview}
              >
                Table
              </Button>
              <Button as={Link} to="/modelbased"
              bg = 'white'
                position = 'absolute'
                bottom = '70px'
                left = '370px'
                variant='unstyled' 
                height= '25px'
                width = '75px'
                _hover={{bg: "blackAlpha.100"}}
                rounded="10" 
                shadow="md"
                size='20'
                onClick={changeview}
              >
                Model
              </Button>
            </>
            : <></>}
        </>
    )
}
export default ViewButtons;