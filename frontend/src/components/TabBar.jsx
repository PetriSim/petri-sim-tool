import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


function TabBar({items, setCurrent}){

    return(
        <Tabs>
            <TabList>
                {
                    items.map((tab) => (
                        <Tab onClick={() => setCurrent(tab.link)}>{tab.tabname}</Tab>

                    ))
                }
            </TabList>

        <TabPanels>
                {
                    items.map((tab) => (
                        <TabPanel>{tab.content}</TabPanel>

                    ))
                }
        </TabPanels>
        </Tabs>

    )
}

export default TabBar