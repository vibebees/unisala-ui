import React from "react"

const TableHeader = ({ header = "" }) => {
  return (
    <th className="border py-4 px-3 !text-neutral-700 !text-sm font-semibold">
      {header}
    </th>
  )
}

export default TableHeader
