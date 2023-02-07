import {
    Button,
    Spacer,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Box,
} from '@chakra-ui/react';


import {React} from 'react'
import {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Heading,} from '@chakra-ui/react'
import {Highlight} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Portal,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody
} from '@chakra-ui/react';
import OverviewTableCompare from "../Background/OverviewTableCompare";


function ComparePage(props) {

    const {onOpen, onClose} = useDisclosure()
    let i, notsameRes = [], valueRes = [], ResourceCompared = [];
    const [isOpen, setIsOpen] = useState(false);
    const [specificValue, setSpecificValue] = useState(null);
    let distr_values = []
    let scenario_name, scenario_date, x
    const [notsameScenario, notSameScenario] = useState([]);
    const [scenDiff, myScenDiff] = useState([]);
    let newItem

    /*    const isPopover1 = (field_id) => {
            if (notsameScenario.includes(field_id)) {
                return true
            } else return false
        };*/

    const isPopover = (field_id) => {
        if (scenDiff.includes(field_id)) {
            return true
        } else return false
    };

    const isDifferentPopover = (field_id) => {
        ResourceCompared.map((role) => {
            if (role.field === field_id) {
                return true
            } else return false
        })
    };

    const isPopDiff = (field_id, id, value) => {
        for (let i = 0; i < ResourceCompared.length; i++) {
            if (ResourceCompared[i].id && ResourceCompared[i].field === field_id && ResourceCompared[i].value === value) {
                return true;
            }
        }
        return false;
        /*
            ResourceCompared.map((role) => {
                if (role.field === field_id && role.id === id && role.value === value) {
                    return true
                } else return false
            })*/
    };

    const isDiffTextColor = (field_id, id, value) => {
        ResourceCompared.map((role) => {
            if (role.field === field_id && role.id === id && role.value === value) {
                return {color: '#6d0d06'};
            } else {
                return {color: 'black'};
            }
        })
    };

    const isPopoverRes = (field_id, value_res) => {
        if (notsameRes.includes(field_id) && valueRes.includes(value_res)) {
            return true
        } else {
            return false
        }
    }
    const isPopoverRol = (field_id) => {
        if (notsameRes.includes(field_id)) {
            return true
        } else {
            return false
        }
    }

    const rolePopover = (role) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let res = element.resourceParameters.roles.find(item => item.id === role)
                if (res !== undefined) {
                    return <div>{element.scenarioName}: {role}</div>
                }
                return <Text>{element.scenarioName}: this department is not defined</Text>
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
    {props.getData("allScenarios").map((element) => {{
        props.scenariosCompare.includes(element.scenarioName) === true ? element.resourceParameters.resources.map((res) => {
                x =  element.scenarioName + ":" + " " + res.id + ":" + " " + res.costHour})
            : x = null }
        return <div >{x}</div>
    })}
let res = []
    let resource = []

    const costsPopover = (role) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                res = element.resourceParameters.roles.find(item => item.id === role)
                if (res !== undefined) {
                   return res.resources.map((ele) => {
                        resource = element.resourceParameters.resources.find(item => item.id === ele.id)
                       if (resource !== undefined) {
                           return <Text>{element.scenarioName}: {resource.id}: {resource.costHour} </Text>
                       }
                    })
                    return <Text>{element.scenarioName}: role is not defined</Text>
                }
                return <Text>{element.scenarioName}: this department is not defined</Text>
            }
        })
    }

    const quantityPopover = (role) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                res = element.resourceParameters.roles.find(item => item.id === role)
                if (res !== undefined) {
                    return res.resources.map((ele) => {
                        resource = element.resourceParameters.resources.find(item => item.id === ele.id)
                        if (resource !== undefined) {
                            return <Text>{element.scenarioName}: {resource.id}: {resource.numberOfInstances} </Text>
                        }
                    })
                    return <Text>{element.scenarioName}: role is not defined</Text>
                }
                return <Text>{element.scenarioName}: this department is not defined</Text>
            }
        })
    }

    const resourcePopover = (role) => {
        return props.getData("allScenarios").map((element) => {
            if (props.scenariosCompare.includes(element.scenarioName) === true) {
                let res = element.resourceParameters.roles.find(item => item.id === role)
                if (res !== undefined) {
                    //element.resourceParameters.roles.resources.map((res) => {
                      //  return <div>{res.id}</div>
                    return res.resources.map((ele) =><div>{element.scenarioName}: {ele.id}</div>)
                    //})
                    //return  <Text>{element.scenarioName}</Text>
                }
                  else {
                  return <Text>{element.scenarioName}: department is not defined</Text>
                 }
            }
                })
            }

    /*    const getColor = (field_id) => {
            if (notsameScenario.includes(field_id)) {
                return {bg: "#dce5e6"};
            } else {
                return {bg: 'white'};
            }
        }

        const getColRoles = (field_id) => {
            if (notsameRes.includes(field_id)) {
                return {backgroundColor: '#dce5e6'};
            } else {
                return {backgroundColor: 'white'};
            }
        }

        const getColorRes = (field_id, value_res) => {
            if (notsameRes.includes(field_id) && valueRes.includes(value_res)) {
                return {backgroundColor: '#dce5e6'};
            } else {
                return {backgroundColor: 'white'};
            }
        }*/

    const getTextColor = (field_id, value_res) => {
        if (notsameRes.includes(field_id) && valueRes.includes(value_res)) {
            return {color: '#6d0d06'};
        } else {
            return {color: 'black'};
        }
    }


    notsameScenario.length = 0
    let each_scenarioRoles

    for (i = 0; i < props.getData("allScenarios").length; i++) {
        each_scenarioRoles = props.getData("allScenarios")[i].resourceParameters.roles;
        if (props.scenariosCompare.includes(props.getData("allScenarios")[i].scenarioName)) {
            if (props.getData("allScenarios")[i].resourceParameters.roles !== props.getData("currentScenario").resourceParameters.roles) {

                props.getData("currentScenario").resourceParameters.roles.map((current_element) => {
                    props.getData("allScenarios")[i].resourceParameters.roles.map((element) => {
                        newItem = 0
                        if (current_element.id !== element.id) {
                            newItem = {
                                field: "role_id",
                                id: current_element.id,
                                value: current_element.id
                            }
                            ResourceCompared.push(newItem);
                        }

                        if (element.schedule !== current_element.schedule) {
                            notsameRes.push("schedule")
                            valueRes.push(current_element.schedule)
                            newItem = {
                                field: "schedule",
                                id: current_element.id,
                                value: current_element.schedule
                            }
                            ResourceCompared.push(newItem);
                        }

                        if (element.resources !== current_element.resources) {
                            {
                                element.resources.map((resource1) => {
                                    {
                                        current_element.resources.map((current_resource) => {

                                            if (resource1.id !== current_resource.id) {
                                                notsameRes.push("resource")
                                                valueRes.push(current_resource.id)
                                                newItem = {
                                                    field: "resource",
                                                    id: current_resource.id,
                                                    value: current_resource.id
                                                }
                                                ResourceCompared.push(newItem);
                                            }

                                            if (resource1.id === current_resource.id) {
                                                if (resource1.numberOfInstances !== current_resource.numberOfInstances) {
                                                    ResourceCompared.field.push("quantity")
                                                    ResourceCompared.id.push(current_resource.id)
                                                    ResourceCompared.value.push(current_resource.numberOfInstances)
                                                }
                                                if (resource1.costHour !== current_resource.costHour) {
                                                    ResourceCompared.field.push("cost")
                                                    ResourceCompared.id.push(current_resource.id)
                                                    ResourceCompared.value.push(current_resource.costHour)
                                                }
                                            }
                                        })
                                    }

                                })
                            }


                        }

                    })
                })
            }

        } else {
        }

    }

    /*  props.getData("allScenarios")[i].resourceParameters.roles.map((element) => {

      if (element.id !== current_element.id) {
          notsameRes.push("id")
          valueRes.push(current_element.id)
          /!* ResourceCompared.field.push("role_id")
           ResourceCompared.id.push(current_element.id)
           ResourceCompared.value.push(current_element.id)*!/

      }


      if (element.numberOfInstances !== current_element.numberOfInstances) {
          notsameRes.push("numberOfInstances")
          valueRes.push(current_element.numberOfInstances)

      }
*/

    for (i = 0; i < props.getData("allScenarios").length; i++) {

        if (props.scenariosCompare.includes(props.getData("allScenarios")[i].scenarioName)) {

            if (props.getData("allScenarios")[i].scenarioName !== props.getData("currentScenario").scenarioName) {
                //notsameScenario.push("scenarioName")
                scenDiff[scenDiff.length] = "scenarioName";
            }

            if (props.getData("allScenarios")[i].startingDate !== props.getData("currentScenario").startingDate) {
                // notsameScenario.push("startingDate")
                scenDiff[scenDiff.length] = "startingDate";
            }

            if (props.getData("allScenarios")[i].startingTime !== props.getData("currentScenario").startingTime) {
                // notsameScenario.push("startingTime")
                scenDiff[scenDiff.length] = "startingTime";
            }
            if (props.getData("allScenarios")[i].numberOfInstances !== props.getData("currentScenario").numberOfInstances) {
                //notsameScenario.push("numberOfInstances")
                scenDiff[scenDiff.length] = "numberOfInstances";
            }
            if (props.getData("allScenarios")[i].interArrivalTime.distributionType !== props.getData("currentScenario").interArrivalTime.distributionType) {
                // notsameScenario.push("distributionType")
                scenDiff[scenDiff.length] = "distributionType";
            }
            if (props.getData("allScenarios")[i].timeUnit !== props.getData("currentScenario").timeUnit) {
                // notsameScenario.push("timeUnit")
                scenDiff[scenDiff.length] = "timeUnit";
            }
            if (props.getData("allScenarios")[i].interArrivalTime.values !== props.getData("currentScenario").interArrivalTime.values) {
                // notsameScenario.push("distribution")
                scenDiff[scenDiff.length] = "distribution";
            }

            if (props.getData("allScenarios")[i].currency !== props.getData("currentScenario").currency) {
                //notsameScenario.push("currency")
                scenDiff[scenDiff.length] = "currency";
            }

        } else {
        }
    }
    props.setNotSameScenario(scenDiff)

    return (
        <>
            <Box h="93vh" overflowY="auto" p="5">
                <Stack direction='row' spacing={4} w="70vw">
                    <Button as={Link} to="/overview"
                            colorScheme='#ECF4F4'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={onOpen}
                            _hover={{bg: '#B4C7C9'}}>
                        Go back
                    </Button>
                    <Spacer/>
                    <Spacer/>
                    <Button as={Link} to="/differences"
                            colorScheme='white'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={() => '/differences'}
                            _hover={{bg: '#B4C7C9'}}>
                        Show differences
                    </Button>
                    <Button colorScheme='white'
                            variant='outline'
                            border='1px'
                            color='#6E6E6F'
                            borderColor='#B4C7C9'
                            _hover={{bg: '#B4C7C9'}}>
                        Add new scenario
                    </Button>
                </Stack>
                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Scenario Overview</Heading>
                    </CardHeader>
                    <CardBody>
                        <OverviewTableCompare getData={props.getData} scenDiff={scenDiff}
                                              scenariosCompare={props.scenariosCompare}/>
                    </CardBody>
                </Card>

                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Resource Overview</Heading>
                    </CardHeader>
                    <CardBody>
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
                                {props.getData("currentScenario").resourceParameters.roles.map((role) => {
                                    return <Tr>
                                        {/*Department*/}
                                        <Td>
                                            {/*{isPopoverRes("id", role.id) === false ?*/}
                                            {isPopDiff("role_id", role.id, role.id) === false ?
                                                <Text> {role.id} </Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button> {role.id}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6' zIndex={4}>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>{rolePopover(role.id)}</PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>

                                            }
                                        </Td>
                                        {/*Roles*/}
                                        <Td>
                                            {isPopoverRol("resource") === false ?
                                                role.resources.map((resource) => {
                                                    return <Text> {resource.id} </Text>
                                                })
                                                :
                                                <>
                                                    <Stack direction='row'>
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <Box
                                                                    as='button'
                                                                    bg="#e2eaea"
                                                                    rounded="lg"
                                                                    minwidth="130px">
                                                                    {role.resources.map((resource) => {
                                                                        return<div>  <Text align="left"
                                                                                           style={getTextColor("resource", resource.id)}
                                                                                           fontWeight='semibold'> {resource.id} </Text> </div>
                                                                    })}
                                                                    {/*<Text fontSize={13}
                                                                               color='#6E6E6F'>Others</Text>*/}
                                                                </Box>
                                                            </PopoverTrigger>
                                                            <Portal>
                                                                <PopoverContent bg='#dce5e6'>
                                                                    <PopoverArrow/>
                                                                    <PopoverCloseButton/>
                                                                    <PopoverBody>
                                                                        {resourcePopover(role.id)}
                                                                        {/*   {props.getData("allScenarios").map((element) => {{
                                                                            props.scenariosCompare.includes(element.scenarioName) === true ?
                                                                                element.resourceParameters.roles.resources.map((res) => {
                                                                                    x =   res.id})
                                                                                : x = null }
                                                                            return <div>{x}</div>
                                                                        })}*/}

                                                                    </PopoverBody>
                                                                </PopoverContent>
                                                            </Portal>
                                                        </Popover>
                                                       {/* <Stack direction='column'>
                                                            {role.resources.map((resource) => {
                                                                return <Text align="left"
                                                                             style={getTextColor("resource", resource.id)}
                                                                             fontWeight='semibold'> {resource.id} </Text>
                                                            })}
                                                        </Stack>*/}
                                                    </Stack>
                                                </>
                                            }
                                        </Td>
                                        {/*Quantity*/}
                                        <Td>
                                            {isDifferentPopover("quantity") === false ?
                                                role.resources.map((resource) => {
                                                    return <Text> {resource.numberOfInstances} </Text>
                                                })
                                                :
                                                <>
                                                    <Stack direction='row'>
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <Box
                                                                    as='button'
                                                                    bg="#e2eaea"
                                                                    rounded="lg"
                                                                    width="50px">
                                                                    {role.resources.map((resource) => {
                                                                        let resource1 = props.getData("currentScenario").resourceParameters.resources.find(item => item.id === resource.id)
                                                                        return <Text align="center"
                                                                                     style={isDiffTextColor("quantity", resource.id, resource1.numberOfInstances)}
                                                                                     fontWeight='semibold'>{resource1.numberOfInstances}</Text>
                                                                    })}
                                                                    {/*<Text fontSize={13}
                                                                               color='#6E6E6F'>Others</Text>*/}
                                                                </Box>
                                                               {/* <Button> <Text fontSize={13}
                                                                               color='#6E6E6F'>Others</Text>
                                                                </Button>*/}
                                                            </PopoverTrigger>
                                                            <Portal>
                                                                <PopoverContent bg='#dce5e6'>
                                                                    <PopoverArrow/>
                                                                    <PopoverCloseButton/>
                                                                    <PopoverBody>
                                                                        {quantityPopover(role.id)}
                                                                   {/*     {props.getData("allScenarios").map((element) => {{
                                                                          props.scenariosCompare.includes(element.scenarioName) === true ? element.resourceParameters.resources.map((res) => {
                                                                        x =  element.scenarioName + ":" + " " + res.id + ":" + " " + res.numberOfInstances})
                                                                    : x = null}
                                                                return <div >{x}</div>
                                                            })}*/}
                                                                    </PopoverBody>
                                                                </PopoverContent>
                                                            </Portal>
                                                        </Popover>
                                                        {/*<Stack direction='column'>
                                                            {role.resources.map((resource) => {
                                                                let resource1 = props.getData("currentScenario").resourceParameters.resources.find(item => item.id === resource.id)
                                                                return <Text align="left"
                                                                             style={isDiffTextColor("quantity", resource.id, resource1.numberOfInstances)}
                                                                             fontWeight='semibold'>{resource1.numberOfInstances}</Text>
                                                            })}
                                                        </Stack>*/}
                                                    </Stack>
                                                </>
                                            }
                                        </Td>


                                        {/*Costs*/}
                                        <Td>
                                            {isDifferentPopover("cost") === false ?
                                                role.resources.map((resource) => {
                                                    return <Text> {resource.costHour} </Text>
                                                })
                                                :
                                                <>
                                                    <Stack direction='row'>
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <Box
                                                                    as='button'
                                                                    bg="#e2eaea"
                                                                    rounded="lg"
                                                                    width="50px">
                                                                    {role.resources.map((resource) => {
                                                                        let resource1 = props.getData("currentScenario").resourceParameters.resources.find(item => item.id === resource.id)
                                                                        return <Text align="center"
                                                                                     style={isDiffTextColor("cost", resource.id, resource1.numberOfInstances)}
                                                                                     fontWeight='semibold'>{resource1.costHour}</Text>
                                                                    })}
                                                                    {/*<Text fontSize={13}
                                                                               color='#6E6E6F'>Others</Text>*/}
                                                                </Box>

                                                            </PopoverTrigger>
                                                            <Portal>
                                                                <PopoverContent bg='#dce5e6'>
                                                                    <PopoverArrow/>
                                                                    <PopoverCloseButton/>
                                                                    <PopoverBody>
                                                                        {costsPopover(role.id)}
                                                                        {/* {props.getData("allScenarios").map((element) => {{
                                                                          props.scenariosCompare.includes(element.scenarioName) === true ? element.resourceParameters.resources.map((res) => {
                                                                        x =  element.scenarioName + ":" + " " + res.id + ":" + " " + res.costHour})
                                                                    : x = null }
                                                                return <div >{x}</div>
                                                            })}*/}
                                                                    </PopoverBody>
                                                                </PopoverContent>
                                                            </Portal>
                                                        </Popover>
                                                       {/* <Stack direction='column'>
                                                            {role.resources.map((resource) => {
                                                                let resource1 = props.getData("currentScenario").resourceParameters.resources.find(item => item.id === resource.id)
                                                                return <Text align="left"
                                                                             style={isDiffTextColor("cost", resource.id, resource1.numberOfInstances)}
                                                                             fontWeight='semibold'>{resource1.costHour}</Text>
                                                            })}
                                                        </Stack>*/}
                                                    </Stack>
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
                                                                            x = null
                                                                            props.scenariosCompare.includes(element.scenarioName) === true ?
                                                                                x = element.scenarioName + ":" + " " + element.currency
                                                                                : x = null
                                                                        }
                                                                        return <div>{x}</div>
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
                                            {isPopoverRes("schedule", role.schedule) === false ?
                                                <Text> {role.schedule}</Text>
                                                :
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button> {role.schedule}</Button>
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent bg='#dce5e6'>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverBody>
                                                                {timetablePopover(role.id)}
                                                                {/*{props.getData("allScenarios").map((element) => {
                                                                    {
                                                                        props.scenariosCompare.includes(element.scenarioName) === true ?
                                                                            x = element.scenarioName + ":" + " " + element.schedule
                                                                            : x = null
                                                                    }
                                                                    return <div>{x}</div>
                                                                })}*/}
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
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}


export default ComparePage;