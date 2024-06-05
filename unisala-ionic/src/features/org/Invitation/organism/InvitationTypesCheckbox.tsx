import React from "react";
import { Col, RadioGroup, Row, Text } from "@components/defaults";
import InvitationType from "../atoms/InvitationType";

const InvitationTypesCheckbox = ({ allProps }) => {
  const { admin, invitationType, setInvitationType } = allProps;

  const handleCheckbox = (e) => {
    setInvitationType(e.detail.value); // Assuming e.detail.value contains the selected value
    console.log("selected -------> ", e.detail.value);
  };

  return (
    <Col className="flex w-full my-3 ion-no-margin ion-no-padding h-full flex-col ">
      <Text className="ion-no-margin mt-3">
        <h1 className="text-base font-semibold text-neutral-800">
          Current Status
        </h1>
      </Text>
      <Row className="mt-3">
        <RadioGroup
          allowEmptySelection={false}
          className="flex flex-row gap-6"
          value={invitationType}
          onIonChange={handleCheckbox} // Use onIonChange for Ionic components
        >
          {admin && (
            <InvitationType
              allProps={{
                invitationType,
                label: "Members",
                value: "member",
              }}
            />
          )}
          <InvitationType
            allProps={{
              invitationType,
              label: "Student",
              value: "student",
            }}
          />
          <InvitationType
            allProps={{
              invitationType,
              label: "Alumini",
              value: "alumini",
            }}
          />
        </RadioGroup>
      </Row>
    </Col>
  );
};

export default InvitationTypesCheckbox;
