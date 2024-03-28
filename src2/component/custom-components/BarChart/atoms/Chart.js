import React, { useRef } from "react"
import "chart.js/auto"
import { Bar } from "react-chartjs-2"
import ObjectFilter from "utils/components/ObjectFilter"

const Chart = ({ allProps }) => {
  const {
    chatLabels,
    data = {},
    header = "",
    YAxisLabel = "",
    maxvalue = null
  } = allProps
  const newData = { ...data }
  ObjectFilter(newData, -1)

  delete newData.__typename
  delete newData.unitId
  delete newData.grandTotal
  const values = Object.values(newData)
  const labels = Object.keys(newData).map((key) => chatLabels[key])

  const datas = {
    labels: labels,
    datasets: [
      {
        label: YAxisLabel,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1
      }
    ]
  }

  const yOptions = {
    beginAtZero: true,
    max: maxvalue,
    title: {
      display: true,
      text: YAxisLabel // Y-axis label
    }
  }

  return (
    <div className="h-4/5 pb-5">
      <h2 className="font-semibold px-7 py-4 text-lg">{header}</h2>
      <div>
        <Bar
          data={datas}
          options={{
            scales: {
              y: maxvalue ? yOptions : null,
              x: {
                ticks: {
                  font: {
                    size: 10
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default Chart
