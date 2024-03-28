import React from "react"
import Table from "component/TableCard/template/Table"
import Typography from "component/defaults/Typography"

const ChargeTable = ({ allProps }) => {
  const { level } = allProps

  return (
    <div className="w-full">
      <Typography variant="h2" className="px-2 text-neutral-900 font-semibold">
        {level}
      </Typography>

      <Table allProps={allProps} />
    </div>
  )
}

export default ChargeTable
