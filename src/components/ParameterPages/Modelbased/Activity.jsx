import React from 'react'
import Field from '../../Field';


function Activity(props) {
    return (
        <>
        Activity
    
            <Field title="Test date" value={props.selectedObject.name? props.selectedObject.name : "" } type="inputRead" />
        </>
    )
}

export default Activity;