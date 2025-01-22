import React from "react"
import useIsData from "../../../../hooks/useIsData"

const TableData = ({ data = -1 }) => {
  return (
    <td className="border text-center py-2 text-sm px-2">
      {data === -1 ? "" : "$"} {""}
      {useIsData(data)}
    </td>
  )
}

export default TableData
