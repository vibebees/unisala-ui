// InvitationTypesCheckbox.jsx
import React from "react"
import { Col, RadioGroup, Row, Text } from "@components/defaults"
import InvitationType from "../atoms/InvitationType"

const InvitationTypesCheckbox = ({ allProps }) => {
  const { admin, invitationType, setInvitationType } = allProps

  const handleCheckbox = (e) => {
    setInvitationType(e.detail.value)
  }

  return (
    <Col className="flex w-full my-3 ion-no-margin ion-no-padding h-full flex-col ">
      <Text className="ion-no-margin mt-3">
        <h1 className="text-base font-semibold text-neutral-800">
          current status
        </h1>
      </Text>
      <Row className="mt-3 ">
        <RadioGroup
          allowEmptySelection={false}
          className="flex flex-row gap-6"
          value={invitationType}
          onChange={handleCheckbox}
        >
          {admin && (
            <InvitationType
              allProps={{
                invitationType,
                label: "Members",
                value: "member"
              }}
            />
          )}
          <InvitationType
            allProps={{
              invitationType,
              label: "Student",
              value: "student"
            }}
          />
          <InvitationType
            allProps={{
              invitationType,
              label: "Alumini",
              value: "alumini"
            }}
          />
        </RadioGroup>
      </Row>
    </Col>
  )
}

export default InvitationTypesCheckbox
