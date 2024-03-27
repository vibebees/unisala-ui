import {useMemo, useRef, useState} from "react"
import {handleResize} from "utils/screen"
import useGrade from "hooks/useGrade"
import useGradeColor from "hooks/useGradeColor"

export const getAllProps = ({dataSource, parentProps}) => {

      const
        {isSideBar, uniData} = parentProps,
        [width, setWidth] = useState(window.innerWidth),
        [reportCard, setReportCard] = useState([]),
         [more, setMore] = useState(false),
         [report, setReport] = useState(dataSource),
         [records, setRecords] = useState([
        {
            title: "Academicccss",
            report: report?.academics
        },
        {
            title: "Diveristy",
            report: report?.diversity
        },
        {
            title: "Value",
            report: report?.value
        },
        {
            title: "Athletics",
            report: report?.atheltics
        },
        {
            title: "Party Scene",
            report: report?.partyScene
        },
        {
            title: "Professors",
            report: report?.professors
        },
        {
            title: "Location",
            report: report?.location
        },
        {
            title: "Dorms",
            report: report?.dorms
        },
        {
            title: "Campus Food",
            report: report?.campusFood
        },
        {
            title: "Student Life",
            report: report?.studentLife
        },
        {
            title: "Safety",
            report: report?.safety
        },
        {
            title: "Professors",
            report: report?.professors
        }
    ])
     handleResize({width, setWidth})
    return {
        width,
        setWidth,
        more,
        setMore,
        reportCard,
        setReportCard,
        useGrade,
        useGradeColor,
        report,
        setReport,
        records,
        setRecords,
        uniData,
        isSideBar
    }

}
