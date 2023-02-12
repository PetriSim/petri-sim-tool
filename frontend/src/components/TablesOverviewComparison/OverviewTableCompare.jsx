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
    Highlight,
} from '@chakra-ui/react'


function OverviewTableCompare(props){
    let scenario_name, scenario_date, x, distr_data = []

    const isPopover = (field_id) => {
        if (props.scenDiff.includes(field_id)) {
            return true
        } else return false
    };

    return(

        <Table variant='simple'>
            <Thead w="100%">
                <Tr>
                    <Th>Scenario</Th>
                    <Th>Starting date</Th>
                    <Th>Starting time</Th>
                    <Th>Replications</Th>
                    <Th>Inter-arrival Time:Distribution</Th>
                    <Th>Distribution Data</Th>
                    <Th>Time unit</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>
                        {isPopover("scenarioName") === false ?
                            <Text>{props.getData("currentScenario").scenarioName}</Text>
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>{props.getData("currentScenario").scenarioName}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                props.scenariosCompare.includes(element.scenarioName) === true ?
                                                    scenario_name = element.scenarioName  :
                                                    scenario_name = null }
                                                return <div>{scenario_name}</div>
                                            })
                                            }

                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        }
                    </Td>
                    <Td>
                        {isPopover("startingDate") === false ?
                            <Text>{props.getData("currentScenario").startingDate}</Text>
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>{props.getData("currentScenario").startingDate}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                x = null
                                                props.scenariosCompare.includes(element.scenarioName) === true ? x = element.scenarioName + ":" + " " + element.startingDate  :
                                                    x = null }
                                                return <div>{x}</div>
                                            })
                                            }
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        }
                    </Td>
                    <Td>
                        {isPopover("startingTime") === false ?
                            <Text>{props.getData("currentScenario").startingTime}</Text>
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>{props.getData("currentScenario").startingTime}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                x = null
                                                props.scenariosCompare.includes(element.scenarioName) === true ? x = element.scenarioName + ":" + " " + element.startingTime  :
                                                    x = null }
                                                return <div>{x}</div>
                                            })
                                            }
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        }
                    </Td>

                    <Td>
                        {isPopover("numberOfInstances") === false ?
                            <Text>{props.getData("currentScenario").numberOfInstances}</Text>
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>{props.getData("currentScenario").numberOfInstances}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                x = null
                                                props.scenariosCompare.includes(element.scenarioName) === true ? x = element.scenarioName + ":" + " " + element.numberOfInstances  :
                                                    x = null }
                                                return <div>{x}</div>
                                            })
                                            }
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        }
                    </Td>
                    <Td>
                        {isPopover("distributionType") === false ?
                            <Text>{props.getData("currentScenario").interArrivalTime.distributionType}</Text>
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>{props.getData("currentScenario").interArrivalTime.distributionType}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                x = null
                                                props.scenariosCompare.includes(element.scenarioName) === true ? x = element.scenarioName + ":" + " " + element.interArrivalTime.distributionType  :
                                                    x = null }
                                                return <div>{x}</div>
                                            })
                                            }
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        }
                    </Td>
                    <Td>
                        {isPopover("distribution") === false ?
                            props.getData("currentScenario").interArrivalTime.values.map((el) => {
                                return <Text>{el.id} : {el.value}</Text>
                            })
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button> {props.getData("currentScenario").interArrivalTime.values.map((elem, index) => {
                                        return <Text> {elem.id} : {elem.value} ⠀</Text>
                                    })}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                props.scenariosCompare.includes(element.scenarioName) === true ? element.interArrivalTime.values.map((distribution) => {
                                                        distr_data.push(element.scenarioName + ":" + " " + distribution.id + ":"  + " " + distribution.value)  })
                                                    : x = null }

                                            })}
                                            {distr_data.map(item => (
                                                <div>{item}</div>
                                            ))}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>

                        }
                    </Td>
                    <Td>
                        {isPopover("timeUnit") === false ?
                            <Text>{props.getData("currentScenario").timeUnit}</Text>
                            :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>{props.getData("currentScenario").timeUnit}</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='#dce5e6'>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        <PopoverBody>
                                            {props.getData("allScenarios").map((element) => {{
                                                x = null
                                                props.scenariosCompare.includes(element.scenarioName) === true ? x = element.scenarioName + ":" + " " + element.timeUnit :
                                                    x = null }
                                                return <div>{x}</div>
                                            })
                                            }
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        }
                    </Td>
                </Tr>
            </Tbody>
        </Table>
                    )
}

export default OverviewTableCompare


