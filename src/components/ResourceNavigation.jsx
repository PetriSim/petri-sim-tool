import React from 'react'
import { Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/react'
import { NavLink } from "react-router-dom";


function ResourceNavigation(){
return(
    <Breadcrumb separator=''>
    <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink as={NavLink} to='/resource/overview' style={({ isActive }) => isActive ? { color: "rgb(99 134 137)", borderBottom: "solid 2px rgb(99 134 137)"} : {} }>Resource overview</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/resource/timetable' style={({ isActive }) => isActive ? { color: "rgb(99 134 137)", borderBottom: "solid 2px rgb(99 134 137)"} : {} }>Timetable overview</BreadcrumbLink>
    </BreadcrumbItem>
    </Breadcrumb>
)
}

export default ResourceNavigation;