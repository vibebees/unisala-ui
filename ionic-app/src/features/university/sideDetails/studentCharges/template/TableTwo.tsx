import React from "react"
import ChargeTable from "../atoms/ChargeTable"

const TableTwo = ({ data, level }) => {
  const allProps = {
    tableHeadersLabel: [
      "Category",
      "On Campus",
      "Off Campus with Family",
      "Off Campus not with Family"
    ],
    TableRowData: [
      {
        label: "Cost of Attendance (In-State)",
        onCampus: data?.onCampus?.costOfAttendance?.inState,
        offCampusWithFamily:
          data?.offCampusWithFamily?.costOfAttendance?.inState,
        offCampusNotWithFamily:
          data?.offCampusNotWithFamily?.costOfAttendance?.inState
      },
      {
        label: "Cost of Attendance (Out-State)",
        onCampus: data?.onCampus?.costOfAttendance?.outOfState,
        offCampusWithFamily:
          data?.offCampusWithFamily?.costOfAttendance?.outOfState,
        offCampusNotWithFamily:
          data?.offCampusNotWithFamily?.costOfAttendance?.outOfState
      },
      {
        label: "Room and Board",
        onCampus: data?.onCampus?.roomAndBoard,
        offCampusWithFamily:
          data?.offCampusWithFamily?.offCampusWithFamily?.roomAndBoard,
        offCampusNotWithFamily: data?.offCampusNotWithFamily?.roomAndBoard
      },
      {
        label: "Other Expenses",
        onCampus: data?.onCampus?.otherExpenses,
        offCampusWithFamily: data?.offCampusWithFamily?.otherExpenses,
        offCampusNotWithFamily: data?.offCampusNotWithFamily?.otherExpenses
      }
    ],

    level
  }

  if (
    !data?.onCampus &&
    !data?.offCampusWithFamily &&
    !data?.offCampusNotWithFamily
  ) {
    return <div></div>
  }
  return <ChargeTable allProps={allProps} />
}

export default TableTwo
