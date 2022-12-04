import {  FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react'
import Field from '../../Field';


class Event extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      return ( 
        <>
         <FormControl>
            <FormLabel>Selected Event:</FormLabel>
            <Field title="Test date" value={this.props.selectedObject.name? this.props.selectedObject.name : "" } type="inputRead" />
        </FormControl>

       
            
        </>
      );
    }
  }



export default Event;