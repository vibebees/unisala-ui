import React from "react"
import { Item, Card, Label, Text } from "../../../defaults"

const index = ({ label, value }) => {
  return (
    <Item>
      <Text className="flex ion-paddings shadow-none w-full shrink-0 flex-col py-2">
        <Label>{label}</Label>
        <span className="!text-sm tracking-wide mt-1 text-neutral-500">
          {value}
        </span>
      </Text>
    </Item>
  )
}

export default index
