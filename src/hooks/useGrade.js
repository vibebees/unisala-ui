import React from "react"
import useIsData from "./useIsData"
const useGrade = (value) => {
    return useIsData(value) === "N/A"
        ? "N/A"
        : value < 15
        ? "F-"
        : value < 20
        ? "F"
        : value < 25
        ? "F+"
        : value < 30
        ? "E-"
        : value < 35
        ? "E"
        : value < 40
        ? "E+"
        : value < 45
        ? "D-"
        : value < 50
        ? "D"
        : value < 55
        ? "D+"
        : value < 60
        ? "C-"
        : value < 65
        ? "C"
        : value < 70
        ? "C+"
        : value < 75
        ? "B-"
        : value < 80
        ? "B"
        : value < 85
        ? "B+"
        : value < 90
        ? "A-"
        : value < 95
        ? "A"
        : "A+"
}
export default useGrade
