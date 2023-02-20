import {
    Button,
    Spacer,
    Stack,
    Box,
} from '@chakra-ui/react';

import React from 'react'
import {useState} from 'react';
import {Card, CardHeader, CardBody, Heading,} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import OverviewTableCompare from "../TablesOverviewComparison/OverviewTableCompare";
import ResourceTableCompare from "../TablesOverviewComparison/ResourceTableCompare";
import BPMNTableCompare from "../TablesOverviewComparison/BPMNTableCompare";


function ComparePage(props) {
// declaration of variables
    const {onOpen, onClose} = useDisclosure()
    let current_department, department, Cur = []
    let i, notsameRes = [], valueRes = [], ModelCompared = [];
    const [notsameScenario, notSameScenario] = useState([]);
    const [scenDiff, myScenDiff] = useState([]);
    const [ResourceCompared, setResourceCompared] = useState([]);
    let newItem

    // method to check if two array are the same
    const equalsCheck = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    notsameScenario.length = 0

    // in this loop we compare resource parameters of current scenario with resource parameters of other chosen scenarios
    // if parameter does not exist or is different we add the parameter to the ResourceCompared array, we use this array
    // later for the displaying

    for (i = 0; i < props.getData("allScenarios").length; i++) {
        // check if this scenario is included to the comparison
        if (props.scenariosCompare.includes(props.getData("allScenarios")[i].scenarioName)) {
            // check if generally are any differences
            if (props.getData("allScenarios")[i].resourceParameters.resources !== props.getData("currentScenario").resourceParameters.resources) {
                props.getData("currentScenario").resourceParameters.resources.map((current_element) => {
                    // find department for the resources
                    for (let role of props.getData("currentScenario").resourceParameters.roles) {
                        for (let resource of role.resources) {
                            if (resource.id === current_element.id) {
                                current_department = role.id;
                                break
                            } else current_department = "The Role does not exist in department"
                        }
                    }
                    for (let role of props.getData("allScenarios")[i].resourceParameters.roles) {
                        for (let resource of role.resources) {
                            if (resource.id === current_element.id) {
                                department = role.id;
                                break
                            } else department = "The Role does not exist in department"
                        }
                    }
                    // compare department of the resources
                    if (current_department !== department) {
                        newItem = {
                            field: "department",
                            id: current_element.id,
                            value: current_department
                        }
                        ResourceCompared.push(newItem);
                    }
                    let resource = props.getData("allScenarios")[i].resourceParameters.resources.find(item => item.id === current_element.id)
                    // compare resource parameters
                    if (resource !== undefined) {
                        // compare number of instances(quantity of resource)
                        if (current_element.numberOfInstances !== resource.numberOfInstances) {
                            newItem = {
                                field: "numberOfInstances",
                                id: current_element.id,
                                value: current_element.numberOfInstances
                            }
                            ResourceCompared.push(newItem);
                        }
                        // compare costs
                        if (current_element.costHour !== resource.costHour) {
                            newItem = {
                                field: "costHour",
                                id: current_element.id,
                                value: current_element.costHour
                            }
                            ResourceCompared.push(newItem);
                        }
                        // compare timetable
                        if (current_element.schedule !== resource.schedule) {
                            newItem = {
                                field: "schedule",
                                id: current_element.id,
                                value: current_element.schedule
                            }
                            ResourceCompared.push(newItem);
                        }

                    }
                    // if current resource does not exist in one of the scenarios
                    else {
                        notsameRes.push(current_element.id)
                        valueRes.push(current_element.id)
                        newItem = {
                            field: "id",
                            id: current_element.id,
                            value: current_element.id
                        }
                        ResourceCompared.push(newItem);
                    }
                })
            }
        } else {
        }
    }

    // Comparison of Simulation Scenario Parameters. If parameter is different for current scenario and other scenarios
    // we compare,
    // it's name is added to the scenDiff array
    for (i = 0; i < props.getData("allScenarios").length; i++) {

        if (props.scenariosCompare.includes(props.getData("allScenarios")[i].scenarioName)) {

            if (props.getData("allScenarios")[i].scenarioName !== props.getData("currentScenario").scenarioName) {
                scenDiff[scenDiff.length] = "scenarioName";
            }

            if (props.getData("allScenarios")[i].startingDate !== props.getData("currentScenario").startingDate) {
                scenDiff[scenDiff.length] = "startingDate";
            }

            if (props.getData("allScenarios")[i].startingTime !== props.getData("currentScenario").startingTime) {
                scenDiff[scenDiff.length] = "startingTime";
            }
            if (props.getData("allScenarios")[i].numberOfInstances !== props.getData("currentScenario").numberOfInstances) {
                scenDiff[scenDiff.length] = "numberOfInstances";
            }
            if (props.getData("allScenarios")[i].interArrivalTime.distributionType !== props.getData("currentScenario").interArrivalTime.distributionType) {
                scenDiff[scenDiff.length] = "distributionType";
            }
            if (props.getData("allScenarios")[i].timeUnit !== props.getData("currentScenario").timeUnit) {
                scenDiff[scenDiff.length] = "timeUnit";
            }
            if (props.getData("allScenarios")[i].interArrivalTime.values !== props.getData("currentScenario").interArrivalTime.values) {
                scenDiff[scenDiff.length] = "distribution";
            }

            if (props.getData("allScenarios")[i].currency !== props.getData("currentScenario").currency) {
                scenDiff[scenDiff.length] = "currency";
            }

        } else {
        }
    }

    // we compare parameters of current bpmn model of current scenario with the bpmn model of
    // other compared scenarios.

   //set array of different scenario simulation parameters for usage on other pages
    props.setNotSameScenario(scenDiff)
    // Here the index of current bpmn model is found
    let cur_model = props.getData("currentScenario").models.indexOf(props.getData("currentModel"))

    // creating of new array with scenarios to compare ONLY
    //let compare = props.scenariosCompare.concat(props.getData("currentScenario").scenarioName)
    const differentScenarios = props.getData("allScenarios").filter(item => props.scenariosCompare.includes(item.scenarioName))

    // in this loop we compare each activity parameter of bpmn model of current scenario with bpmns from other
    // compared scenario. if parameter is different we add it to ModelCompared array.
    // It is needed for further displaying
    for (i = 0; i < differentScenarios.length; i++) {

        props.getData("currentModel").modelParameter.activities.map((current_act) => {

            differentScenarios[i].models[cur_model].modelParameter.activities.map((act) => {
                // compare costs
                if (current_act.id === act.id) {
                    if (current_act.cost !== act.cost) {
                        newItem = {
                            field: "task_costs",
                            id: current_act.id,
                            value: current_act.cost
                        }
                        ModelCompared.push(newItem);
                    }
                    // compare time unit
                    if (current_act.unit !== act.unit) {
                        newItem = {
                            field: "timeUnit",
                            id: current_act.id,
                            value: current_act.unit
                        }
                        ModelCompared.push(newItem);
                    }
                    // compare currency
                    if (current_act.currency !== act.currency) {
                        newItem = {
                            field: "currency",
                            id: current_act.id,
                            value: current_act.currency
                        }
                        ModelCompared.push(newItem);

                    }
                    // compare distribution of the duration
                    if (current_act.duration.distributionType !== act.duration.distributionType) {
                        newItem = {
                            field: "distributionType",
                            id: current_act.id,
                            value: current_act.duration.distributionType
                        }
                        ModelCompared.push(newItem);

                    }
                    // compare distribution data
                    if (!equalsCheck(current_act.duration.values, act.duration.values)) {
                        newItem = {
                            field: "durationValues",
                            id: current_act.id,
                            value: current_act.id,
                        }
                        ModelCompared.push(newItem);
                    }
                    // compare resources
                    if (current_act.resources.length !== act.resources.length) {
                        newItem = {
                            field: "resources",
                            id: current_act.id,
                            value: "current_model.id",
                        }
                        ModelCompared.push(newItem);
                    } else {
                        for (let cur_res of current_act.resources) {
                            for (let res of act.resources) {
                                if (cur_res !== res) {
                                    newItem = {
                                        field: "resources",
                                        id: current_act.id,
                                        value: current_act.id,
                                    }
                                    ModelCompared.push(newItem);
                                }
                            }
                        }
                    }
                    // check if the activity of current bpmn exists in other bpmns
                   // differentScenarios[i].models.map((d_models) => {
                        // console.log(cur_model)
                        let activity = differentScenarios[i].models[cur_model].modelParameter.activities.find(item => item.id === current_act.id)
                        if (activity === undefined) {
                            newItem = {
                                field: "activity",
                                id: current_act.id,
                                value: current_act.id,
                            }
                            ModelCompared.push(newItem);
                        }
                  //  })
                }

            })
        })
    }
    // comparison of gateways
    // in this loop we compare gateway parameters of bpmn model of current scenario with gateway parameters from other
    // compared scenario. if parameter is different we add it to ModelCompared array.
    // It is needed for further displaying
    for (i = 0; i < differentScenarios.length; i++) {
        props.getData("currentModel").modelParameter.gateways.map((current_model) => {
            differentScenarios[i].models[cur_model].modelParameter.gateways.map((model) => {
                let gateway = differentScenarios[i].models[cur_model].modelParameter.gateways.find(item => item.id === current_model.id)
                // check if gateway exists in other models
                if (gateway === undefined) {
                    newItem = {
                        field: "gateway",
                        id: current_model.id,
                        value: current_model.id,
                    }
                    ModelCompared.push(newItem);
                }
                // compare type of gateway
                if (current_model.id === model.id) {
                    if (current_model.type !== model.type) {
                        newItem = {
                            field: "gatewayType",
                            id: current_model.id,
                            value: current_model.type
                        }
                        ModelCompared.push(newItem);

                    }
                    //incoming activity
                    if (current_model.incoming !== model.incoming) {
                        newItem = {
                            field: "incoming",
                            id: current_model.id,
                            value: current_model.id
                        }
                        ModelCompared.push(newItem);

                    }
                    // compare probability
                    current_model.outgoing.map((out) => {
                        let sequence = props.getData("currentModel").modelParameter.sequences.find(item => item.id === out)
                        if (sequence !== undefined) {
                            let current_probability = sequence.probability
                            let otherModel = differentScenarios[i].models[cur_model].modelParameter.sequences.find(item => item.id === out)
                            console.log("Other model probability " + otherModel.probability)
                            console.log("Current probability " + current_probability)
                            if (otherModel !== undefined) {
                                let otherModel_prob = otherModel.probability
                                if (current_probability !== otherModel.probability) {
                                    newItem = {
                                        field: "probability",
                                        id: current_model.id,
                                        value: current_model.id
                                    }
                                    ModelCompared.push(newItem);
                                }
                            }
                        }
                    })
                    // compare outgoing activities
                    if (current_model.outgoing !== model.outgoing) {
                        newItem = {
                            field: "outgoing",
                            id: current_model.id,
                            value: current_model.id
                        }
                        ModelCompared.push(newItem);

                    }
                }

            })
        })
    }

    // in this loop we compare  event parameters of bpmn model of current scenario with event parameters of the bpmns from other
    // compared scenario. if parameter is different we add it to ModelCompared array.
    // It is needed for further displaying
    // comparison of events
    for (i = 0; i < differentScenarios.length; i++) {
        props.getData("currentModel").modelParameter.events.map((current_event) => {
            differentScenarios[i].models[cur_model].modelParameter.events.map((event) => {
                let event_ch = differentScenarios[i].models[cur_model].modelParameter.events.find(item => item.id === current_event.id)
                // check if gateway exists in other models
                if (event_ch === undefined) {
                    newItem = {
                        field: "event",
                        id: current_event.id,
                        value: current_event.id,
                    }
                    ModelCompared.push(newItem);
                }
                // compare type of event
                if (current_event.id === event.id) {
                    if (current_event.type !== event.type) {
                        newItem = {
                            field: "eventType",
                            id: current_event.id,
                            value: current_event.type
                        }
                        ModelCompared.push(newItem);

                    }
                    // interArrivalTime comparison
                    console.log(current_event.interArrivalTime.distributionType)
                    console.log(event.interArrivalTime.distributionType)
                    if (current_event.interArrivalTime.distributionType !== event.interArrivalTime.distributionType) {
                        newItem = {
                            field: "distributionTypeEvent",
                            id: current_event.id,
                            value: current_event.interArrivalTime.distributionType
                        }
                        ModelCompared.push(newItem);

                    }
                    // compare distribution data
                    if (!equalsCheck(current_event.interArrivalTime.values, event.interArrivalTime.values)) {
                        newItem = {
                            field: "durationValuesEvent",
                            id: current_event.id,
                            value: current_event.id,
                        }
                        ModelCompared.push(newItem);
                    }
                }

            })
        })
    }
// this method allows to use ResourceCompared on other, not connected, pages (OnlyDiffirences Page)
    props.setResourceCompared(ResourceCompared)

    return (
        <>
            {/*Button Go back*/}
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
                    {/*Button Show differences*/}
                    <Button as={Link} to="/overview/compare/differences"
                            colorScheme='white'
                            variant='outline'
                            border='1px'
                            borderColor='#B4C7C9'
                            color='#6E6E6F'
                            onClick={() => '/overview/compare/differences'}
                            _hover={{bg: '#B4C7C9'}}>
                        Show differences
                    </Button>
                </Stack>
                {/*Simulation Scenario are displayed*/}
                {/*Card is used to display table on white background */}
                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Simulation Scenario Overview</Heading>
                    </CardHeader>
                    <CardBody>
                        {/*Call for another component - Table with compared Simulation Scenario Parameters*/}
                        <OverviewTableCompare getData={props.getData} scenDiff={scenDiff}
                                              scenariosCompare={props.scenariosCompare}/>
                    </CardBody>
                </Card>
                {/*Resource are displayed*/}
                <Card bg="white" mt="25px">
                    <CardHeader>
                        <Heading size='md'>Resource Overview</Heading>
                    </CardHeader>
                    <CardBody>
                        {/*Call for another component - Table with compared Resource Parameters*/}
                        <ResourceTableCompare getData={props.getData} scenDiff={scenDiff}
                                              scenariosCompare={props.scenariosCompare}
                                              notsameRes={notsameRes} valueRes={valueRes}
                                              ResourceCompared={ResourceCompared}/>
                    </CardBody>
                </Card>
                {/*Call for another component - Tables with compared Model-based Parameters*/}
                <BPMNTableCompare getData={props.getData} scenDiff={scenDiff}
                                  scenariosCompare={props.scenariosCompare}
                                  notsameRes={notsameRes} valueRes={valueRes}
                                  ModelCompared={ModelCompared} modelIndex={cur_model}/>
            </Box>
        </>
    )
}


export default ComparePage;