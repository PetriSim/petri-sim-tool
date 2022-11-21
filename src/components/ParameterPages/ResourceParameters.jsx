import React from 'react'



import Field from '../Field';


function ResourceParameters() {

    return (
        <>
            <Field title="Test date" value="2013-01-08" type="date" />
            <Field title="Test Time" value="10:10" type="time" />
            <Field title="Test Number" value="10" type="number" />
            <Field title="Test Selection" value="tessst" type="selection" options={["a", "b"]} />
        </>
    )
}

export default ResourceParameters;