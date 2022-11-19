import React from 'react'

import Field from '../../Field';


function Gateway(props) {

    return (
        <>
        Gateway

            <Field title="Test date" value={props.selectedObject.id? props.selectedObject.id : "" } type="inputRead" />
        </>
    )
}

export default Gateway;