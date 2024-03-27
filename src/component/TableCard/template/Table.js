import React from "react"
import TableSingleRow from "../molecules/TableSingleRow"

const Table = ({ allProps }) => {
  const { tableHeadersLabel = [], TableRowData = [] } = allProps

  return (
    <>
      <table className="w-full mt-3">
        <thead className="border">
          <tr>
            {tableHeadersLabel.length > 0 &&
              tableHeadersLabel.map((header, index) => (
                <th
                  key={index}
                  className="border py-4 px-3 !text-neutral-700 !text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {TableRowData.map((data, index) => {
            let ObjecKeys = Object.keys(data)
            ObjecKeys = ObjecKeys.filter((key) => key !== "label")
            const values = ObjecKeys.map((key) => data[key])
            const tableSingleRowProps = {
              label: data.label,
              values: values,
              numberOfCells: ObjecKeys.length
            }

            return (
              <TableSingleRow key={index * 5} allProps={tableSingleRowProps} />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
