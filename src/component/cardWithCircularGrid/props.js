import { useState } from "react"
import useIsData from "hooks/useIsData"

export const getAllProps = ({ dataSource, parentProps }) => {
  const { uniData, isSideBar } = parentProps
  const [testScores, setTestScores] = useState(dataSource)
  const [width, setWidth] = useState(0)
  function generator({ testScore, title, key }) {
    let path = testScore?.[key]
    return {
      title,
      min: path?.percentile25,
      max: path?.percentile75,
      score: `${path?.percentile25} - ${path?.percentile75}`
    }
  }

  return {
    uniData,
    useIsData,
    isSideBar,
    testScores,
    setTestScores,
    header: "Test Scores",
    subHeader: {
      act: "ACT Score 25-75th Percentile",
      sat: "SAT Score 25-75th Percentile"
    },
    generator,
    width,
    setWidth
  }
}
