import React, { FC } from "react";
import { IonIcon } from "@ionic/react";
import { location } from "ionicons/icons";
import { Row, Typography } from "@components/defaults";

const CardLocation: FC<ICardLocation> = ({
  city,
  stateAbbreviation,
  streetAddressOrPOBox,
}) => {
  const formattedAddress = `${city}, ${stateAbbreviation}, ${streetAddressOrPOBox}`;

  return (
    <Row className="ion-no-padding gap-1 items-center h-fit mt-1">
      <IonIcon
        className="ion-icon leading-none mt-0 text-primary text-base"
        icon={location}
      />
      <Typography
        variant="h5"
        className="text-xs leading-none m-0 h-fit ion-no-padding font-normal text-gray-600"
      >
        {formattedAddress}
      </Typography>
    </Row>
  );
};

export default CardLocation;
