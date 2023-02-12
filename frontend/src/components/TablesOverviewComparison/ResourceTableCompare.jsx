import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Popover,
    PopoverTrigger,
    Button,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
} from '@chakra-ui/react'


function ResourceTableCompare(props) {

    const isPopover = (field_id) => {
        if (props.scenDiff.includes(field_id)) {
            return true
        } else return false
    };
    let department
    const getDepartment = (resource_id) => {
        for (let role of props.getData("currentScenario").resourceParameters.roles) {
            for (let resource of role.resources) {
                if (resource.id === resource_id) {
                    return department = role.id;
                }
            }
        }

    }
    let return_text, currency, x
    const fillDepartment = (resource_id, department_id) => {
        return props.getData("allScenarios").map((element) => {
        if (props.scenariosCompare.includes(element.scenarioName) === true) {
               let role = element.resourceParameters.roles.find(item => item.id === department_id)
                if (role !== undefined) {
                    for (let resource of role.resources) {
                        if (resource.id === resource_id) {
                            return return_text = element.scenarioName + ": The Role exist in " + role.id + "."
                        }
                       // else return_text = element.scenarioName + ": The Role does not exist in the scenario."
                       // return <div>{return_text}</div>
                    }
                    for (let dep of element.resourceParameters.roles) {
                        for (let res of dep.resources) {
                            if (res.id === resource_id) {
                                return return_text = element.scenarioName + ": The Role exist in" + dep.id + "."
                            } else return_text = element.scenarioName + ": The Role does not exist in the scenario."
                        }

                    }

                } else {
                    for (let dep of element.resourceParameters.roles) {
                        for (let resource of dep.resources) {
                            if (resource.id === resource_id) {
                                return return_text = element.scenarioName + ": The Role exist in" + dep.id + "."
                            } else return_text = element.scenarioName + ": The Role and the Department do not exist in the scenario."
                        }
                       // return return_text
                    }
                   // return <div><Text>{return_text}</Text></div>
                }
                 return <div>{return_text}</div>
            }
        })
    }
    const isDifferentPopover = (field_id, id, value) => {
        let isDifferent = false
        props.ResourceCompared.map((role) => {
            if (field_id === role.field && id === role.id && value === role.value) {
                return isDifferent = true
            }
        })
        return isDifferent
    };


    const resPopover = (resource) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let res = element.resourceParameters.resources.find(item => item.id === resource)
                if (res !== undefined) {
                    return <Text ontWeight='semibold'>{element.scenarioName}: {resource}</Text>
                }
                return <Text>{element.scenarioName}: this role is not defined</Text>
            }
        })
    }

    const timetablePopover = (role) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let res = element.resourceParameters.roles.find(item => item.id === role)
                if (res !== undefined) {
                    return <div>{element.scenarioName}: {res.schedule}</div>
                }
                return <Text>{element.scenarioName}: this department is not defined</Text>
            }
        })
    }
  /*  {
        props.getData("allScenarios").map((element) => {
            {
                props.scenariosCompare.includes(element.scenarioName) === true ? element.resourceParameters.resources.map((res) => {
                        x = element.scenarioName + ":" + " " + res.id + ":" + " " + res.costHour
                    })
                    : x = null
            }
            return <div>{x}</div>
        })
    }*/
    let res = []
    let resource = []

    const costsPopover = (resource) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                res = element.resourceParameters.resources.find(item => item.id === resource)
                if (res !== undefined) {
                    return <> <Text fontWeight='semibold'>{element.scenarioName}: </Text>
                        <Text> {res.id}: {res.costHour} </Text>
                    </>
                } else return <Text fontWeight='semibold'>{element.scenarioName}:<Text fontWeight='normal'> Resource is
                    not defined</Text></Text>
            }
        })
    }

    const quantityPopover = (role) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                res = element.resourceParameters.resources.find(item => item.id === resource)
                if (res !== undefined) {
                    return <> <Text fontWeight='semibold'>{element.scenarioName}: </Text>
                        <Text> {res.id}: {res.numberOfInstances} </Text>
                    </>
                } else return <Text fontWeight='semibold'>{element.scenarioName}:<Text fontWeight='normal'> Resource is
                    not defined</Text></Text>
            }
        })
    }


    return (
        <>
            {x}
            <Table variant='simple'>
                <Thead w="100%">
                    <Tr>
                        <Th>Department</Th>
                        <Th>Role</Th>
                        <Th>Quantity</Th>
                        <Th>Costs</Th>
                        <Th>Currency</Th>
                        <Th>Timetable</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.getData("currentScenario").resourceParameters.resources.map((resource) => {
                        return <Tr>
                            {/*Department*/}
                            <Td>
                                {!isDifferentPopover("department", resource.id, getDepartment(resource.id)) ?
                                    <Text>{getDepartment(resource.id)}</Text>
                                    :
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button>  {getDepartment(resource.id)}</Button>
                                        </PopoverTrigger>
                                        <Portal>
                                            <PopoverContent bg='#dce5e6' zIndex={4}>
                                                <PopoverArrow/>
                                                <PopoverCloseButton/>
                                                <PopoverBody>
                                                    {fillDepartment(resource.id, getDepartment(resource.id))}
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Portal>
                                    </Popover>

                                }
                            </Td>
                            <Td>
                                {!isDifferentPopover("id", resource.id, resource.id) ?
                                    <Text> {resource.id} </Text>
                                    :
                                    <>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button> {resource.id}</Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='#dce5e6'>
                                                    <PopoverArrow/>
                                                    <PopoverCloseButton/>
                                                    <PopoverBody>
                                                        {resPopover(resource.id)}
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </>
                                }
                            </Td>
                            {/*Quantity*/}
                            <Td>
                                {isDifferentPopover("numberOfInstances") === false ?
                                    <Text> {resource.numberOfInstances} </Text>
                                    :
                                    <>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button>{resource.numberOfInstances}
                                                </Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='#dce5e6'>
                                                    <PopoverArrow/>
                                                    <PopoverCloseButton/>
                                                    <PopoverBody>
                                                        {quantityPopover(resource.id)}
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </>
                                }
                            </Td>
                            {/*Costs*/}
                            <Td>
                                {isDifferentPopover("costHour", resource.id, resource.costHour) === false ?
                                    <Text> {resource.costHour} </Text>
                                    :
                                    <>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button>
                                                    {resource.costHour}
                                                </Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='#dce5e6'>
                                                    <PopoverArrow/>
                                                    <PopoverCloseButton/>
                                                    <PopoverBody>
                                                        {costsPopover(resource.id)}
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </>
                                }
                            </Td>
                            {/*Currency*/}
                            <Td>
                                {isPopover("currency") === false ?
                                    <Text> {props.getData("currentScenario").currency} </Text>
                                    :
                                    <>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button> {props.getData("currentScenario").currency}
                                                </Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent bg='#dce5e6'>
                                                    <PopoverArrow/>
                                                    <PopoverCloseButton/>
                                                    <PopoverBody>
                                                        {props.getData("allScenarios").map((element) => {
                                                            {
                                                                currency = null
                                                                props.scenariosCompare.includes(element.scenarioName) === true ?
                                                                    currency = element.scenarioName + ":" + " " + element.currency
                                                                    : currency = null
                                                            }
                                                            return <div>{currency}</div>
                                                        })}
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </>
                                }
                            </Td>
                            {/*Timetable*/}
                            <Td>
                                {isDifferentPopover("schedule", resource.id, resource.schedule) === false ?
                                    <Text> {resource.schedule}</Text>
                                    :
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button> {resource.schedule}</Button>
                                        </PopoverTrigger>
                                        <Portal>
                                            <PopoverContent bg='#dce5e6'>
                                                <PopoverArrow/>
                                                <PopoverCloseButton/>
                                                <PopoverBody>
                                                    {timetablePopover(resource.id)}
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Portal>
                                    </Popover>
                                }
                            </Td>


                        </Tr>
                    })}

                </Tbody>
            </Table>
        </>
    )
}

export default ResourceTableCompare


