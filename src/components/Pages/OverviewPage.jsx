import { Text } from '@chakra-ui/react';
import {React, useState, useEffect} from 'react'
import OverviewTable from '../Background/OverviewTable';

function OverviewPage(props) {


    return (
        <>
            <OverviewTable/>
            {props.data}
        </>
    )
}

export default OverviewPage;