import React from "react"
import { Radio, Row, Text } from "@components/defaults"

const InvitationType = ({ allProps }) => {
  const { handleCheckbox, label, value } = allProps
  return (
    <Row className="flex flex-row items-center">
      <Radio onIonFocus={handleCheckbox} value={value} className="mr-2">
        {""}
      </Radio>
      <Text className="text-sm  font-medium  text-neutral-600">
        {label}
      </Text>
    </Row>
  )
}

export default InvitationType

