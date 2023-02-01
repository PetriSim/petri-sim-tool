import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const Event = ({ selectedObject }) => {
  return (
    <FormControl>
      <FormLabel>Selected Event:</FormLabel>
      <Input
        title="Test date"
        value={selectedObject.name ? selectedObject.name : ""}
        type="inputRead"
      />
    </FormControl>
  );
};

export default Event;
