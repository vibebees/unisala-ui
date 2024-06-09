import React from "react"
import Table from "../../../tableCard/template/Table"
import { Typography } from "../../../../../components/defaults"

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
