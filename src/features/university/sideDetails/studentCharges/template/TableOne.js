import ChargeTable from "../atoms/ChargeTable"

const TableOne = ({ data, level }) => {
  const allProps = {
    tableHeadersLabel: ["Category", "In-State", "Out-of-State"],
    TableRowData: [
      {
        label: "Tuition",
        inState: data?.inState?.tuition,
        outOfState: data?.outOfState?.tuition
      },
      {
        label: "Required Fees",
        inState: data?.inState.requiredFees,
        outOfState: data?.outOfState.requiredFees
      },
      {
        label: "Per Credit Hour",
        inState: data?.inState.perCreditHourCharge,
        outOfState: data?.outOfState.perCreditHourCharge
      }
    ],

    level
  }

  return <ChargeTable allProps={allProps} />
}

export default TableOne
