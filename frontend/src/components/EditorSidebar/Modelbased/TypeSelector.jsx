import React, { useEffect } from 'react';
import Activity from './Activity';
import Event from './Event';
import Gateway from './Gateway';

function TypeSelector({
  currentBpmn,
  getData,
  selectedObject,
  setData,
  setDataObj,
  currentScenario
}) {
  useEffect(() => {
    console.log(currentBpmn);
  }, [currentBpmn]);

  // If no selectedObject is defined, render the name of the current model
  if (selectedObject.$type === undefined) {
    return <>{getData('currentModel').name}</>;
  }
// If the selectedObject is a gateway, render the Gateway component 
  if (selectedObject.$type.includes('Gateway')) {
    return (
      <Gateway
        currentBpmn={currentBpmn}
        currentScenario={currentScenario}
        getData={getData}
        selectedObject={selectedObject}
        setData={setData}
        setDataObj={setDataObj}
        value={selectedObject.name || ''}
      />
    );
  }

  // If the selectedObject is a task, render the Activity component 
  if (selectedObject.$type.includes('Task')) {
    return (
      <Activity
        currentBpmn={currentBpmn}
        currentScenario={currentScenario}
        getData={getData}
        selectedObject={selectedObject}
        setData={setData}
        setDataObj={setDataObj}
        value={selectedObject.name || ''}
      />
    );
  }

  // If the selectedObject is an event, render the Event 
  if (selectedObject.$type.includes('Event') && !selectedObject.$type.includes('Gateway')) {
    return (
      <Event
        currentBpmn={currentBpmn}
        currentScenario={currentScenario}
        getData={getData}
        selectedObject={selectedObject}
        setData={setData}
        setDataObj={setDataObj}
        value={selectedObject.name || ''}
      />
    );
  }

  // If none of the above conditions are met, render nothing
  return <></>;
}

export default TypeSelector;