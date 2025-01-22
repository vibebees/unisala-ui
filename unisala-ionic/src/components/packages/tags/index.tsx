import React from "react"
import { CardSubtitle, Row } from "../../defaults"

export const LikeATag = ({colorTitle = "blue", colorValue = "yellow", title, value, skipBg = false}) => {
    const titleColorClass = `text-${colorTitle}-500 font-bold`
    const valueColorClass = `bg-${colorValue}-400 text-white rounded-full px-2 py-1`

    return (
      <Row style={{marginTop: "20px"}}>
        <CardSubtitle className={titleColorClass}>
          <span className="mr-2">{title}</span>
          <span className={skipBg ? "" : valueColorClass}>
            {value}
          </span>
        </CardSubtitle>
      </Row>
    )

  }
