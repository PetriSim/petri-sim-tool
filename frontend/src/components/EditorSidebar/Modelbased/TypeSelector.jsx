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

  if (selectedObject.$type === undefined) {
    return <>{getData('currentModel').name}</>;
  }

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

  return <></>;
}

export default TypeSelector;