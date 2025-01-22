import React from "react"
import useIsData from "./useIsData"
const useGradeColor = (value) => {
    return useIsData(value) === "N/A"
        ? "#c4c4c4"
        : value < 15
        ? "rgb(255, 0, 0)"
        : value < 20
        ? "rgb(255, 0, 0)"
        : value < 25
        ? "rgb(255, 64, 0)"
        : value < 30
        ? "rgb(255, 64, 0)"
        : value < 35
        ? "rgb(255, 128, 0)"
        : value < 40
        ? "rgb(255, 128, 0)"
        : value < 45
        ? "rgb(255, 191, 0)"
        : value < 50
        ? "rgb(255, 191, 0)"
        : value < 55
        ? "rgb(212, 212, 31)"
        : value < 60
        ? "rgb(212, 212, 31)"
        : value < 65
        ? "rgb(212, 212, 31)"
        : value < 70
        ? "rgb(212, 212, 31)"
        : value < 75
        ? "rgb(212, 212, 31)"
        : value < 80
        ? "rgb(212, 212, 31)"
        : value < 85
        ? "rgb(0, 255, 64)"
        : value < 90
        ? "rgb(0, 255, 64)"
        : value < 95
        ? " #28BA62"
        : " #28BA62"
}
export default useGradeColor
