import React, { FC, useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { schoolOutline } from "ionicons/icons";
import { URLgetter } from "../../../utils/lib/URLupdate";
import { Col, Label, Row } from "@components/defaults";

const Offerings: FC<IOfferings> = ({
  graduateOffering = "",
  undergraduateOffering = "",
}) => {
  const [selectedDeg, setSelectedDeg] = useState<
    "graduate" | "undergraduate" | null
  >(null);

  useEffect(() => {
    const data = URLgetter("deg");
    if (data) {
      if (data === "u") {
        setSelectedDeg("undergraduate");
      }
      if (data === "g") {
        setSelectedDeg("graduate");
      }
    } else {
      setSelectedDeg(null);
    }
  }, []);

  return (
    <Row className="ion-no-padding pl-1 mt-2 h-fit ">
      <Row className="ion-no-padding justify-start h-fit">
        <IonIcon
          className="ion-icon text-primar text-lg"
          icon={schoolOutline}
        />
        {((graduateOffering && selectedDeg === "graduate") ||
          selectedDeg === null) && (
          <Col size="auto" className="ion-no-padding ml-2 w-fit p-0 h-fit">
            <Label className="ion-padding-start p-0 font-semibold  text-red-500">
              {graduateOffering.substring(0, 30)}
            </Label>
          </Col>
        )}

        {((undergraduateOffering && selectedDeg === "undergraduate") ||
          selectedDeg === null) && (
          <Col size="auto" className="ion-no-padding h-fit ">
            <Label className="ion-padding-start  font-bold text-blue-500">
              {undergraduateOffering.substring(0, 35)} 📚
            </Label>
          </Col>
        )}
      </Row>
    </Row>
  );
};

export default Offerings;
