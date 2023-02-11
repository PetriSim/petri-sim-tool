import React from 'react'
import { Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/react'
import { NavLink } from "react-router-dom";


function ResourceNavigation({currentTab}){
return(
    <Breadcrumb separator=''>
    <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink as={NavLink} to='/resource/overview' style={({ }) => currentTab === "overview" ? { color: "rgb(99 134 137)", borderBottom: "solid 2px rgb(99 134 137)"} : {} }>Resource overview</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/resource/timetable' style={({ }) =>  currentTab === "timetable" ? { color: "rgb(99 134 137)", borderBottom: "solid 2px rgb(99 134 137)"} : {} }>Timetable overview</BreadcrumbLink>
    </BreadcrumbItem>
    </Breadcrumb>
)
}

export default ResourceNavigation;