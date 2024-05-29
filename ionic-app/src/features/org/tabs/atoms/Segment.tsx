import React from "react"
import { Icon, Label, SegmentButton } from "@components/defaults"
import * as icons from "ionicons/icons"
import {useLocation} from "react-router"
import ReactGA from "react-ga4"

const Segment = ({name = "", icon = "", onClick = () => {}, nav = ""}) => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const iconName = icon in icons ? icons[icon] : icons["alert"]
    let isActive = false

        // Check if any query parameter value matches the 'name'
        queryParams.forEach((value) => {
            if (value.toLowerCase() === name.toLowerCase()) {
                isActive = true
            }
        })

    const activeClasses = isActive ? "bg-blue-500 text-white" : "bg-transparent text-gray-600"
    return (
        <>
            <SegmentButton value={name} onClick={(e) => {
                onClick(e, nav)
                ReactGA.event({
                    category: "Segment",
                    action: name + " clicked",
                    label: name,
                    nav: nav
                })
            }} className={activeClasses}>
                <Icon icon={iconName}></Icon>
                <Label>{name}</Label>
            </SegmentButton>
        </>

    )

}
export default Segment
