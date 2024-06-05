import React from "react"
import TableDataLabel from "../atoms/TableDataLabel"
import TableData from "../atoms/TableData"

const TableSingleRow = ({ allProps }) => {
  const { label = "", values = [], numberOfCells } = allProps

  const renderTableData = () => {
    let tableData = []
    for (let i = 0; i < numberOfCells; i++) {
      tableData.push(<TableData key={i} data={values[i]} />)
    }
    return tableData
  }

  return (
    <tr>
      <TableDataLabel label={label} />

      {renderTableData()}
    </tr>
  )
}

export default TableSingleRow
