import React from "react"
import AffiliatedUniCard from "../courseCard/index"

export const UniFeed = ({ data }) => {
  const allProps = data[data?.section]

  // Define an object where keys are component names and values are props
  const componentMap = {
    elevatorInfo: <AffiliatedUniCard allProps={{ ...allProps, onSearch: false }} />
    // Add more components and props here as needed
  }

  // Check if the section exists in the componentMap
  if (data?.section in componentMap) {
    // Render the component based on the section
    return componentMap[data.section]
  }

}
