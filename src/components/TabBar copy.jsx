import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


function TabBar(props){

    return(
        <Tabs>
            <TabList>
                {
                    props.items.map((tab) => (
                        <Tab onClick={() => props.setCurrent(tab.link)}>{tab.tabname}</Tab>

                    ))
                }
            </TabList>

        <TabPanels>
                {
                    props.items.map((tab) => (
                        <TabPanel>{tab.content}</TabPanel>

                    ))
                }
        </TabPanels>
        </Tabs>

    )
}

export default TabBar