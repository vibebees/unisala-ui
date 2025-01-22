import React from "react"
import useGradeColor from "../../../hooks/useGradeColor"
import useGrade from "../../../hooks/useGrade"

const Grade = ({ allProps }) => {
  const { average, width } = allProps

  return (
    <div
      style={{
        background: useGradeColor(average),
        margin: "auto"
      }}
      className="card-report"
    >
      <h6 style={{ fontSize: width > 800 ? "14px" : "12px", margin: "0" }}>
        {useGrade(average)}
      </h6>
    </div>
  )
}

export default Grade
