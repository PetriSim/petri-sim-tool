import {useTable, useRowSelect} from 'react-table'
import React, { useMemo } from 'react'
import { Checkbox } from '@chakra-ui/react'

export const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    
    const {selectedFlatRows} = useTable({columns, data}, useRowSelect, (hooks)=> {hooks.visibleColumns.push((columns) => {
        return[
            {
                Selection: 'selection',
                Header: ({getToggleAllRowsSelectedProps}) => (
                    <Checkbox {...getToggleAllRowsSelectedProps()} />
                ), 
                Cell: ({row }) => (
                    <Checkbox {...row.getToggleRowSelectedProps} />
                ),
                ...columns
            }
        ]
    })
    })
}
const { } = useTable({})
