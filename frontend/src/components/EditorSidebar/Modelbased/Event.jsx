import {  FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react'


class Event extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      return ( 
        <>
         <FormControl>
            <FormLabel>Selected Event:</FormLabel>
            <Input title="Test date" value={this.props.selectedObject.name? this.props.selectedObject.name : "" } type="inputRead" />
        </FormControl>

       
            
        </>
      );
    }
  }



export default Event;