import React, { FC } from "react";

import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonText,
} from "@ionic/react";
import ImageWithLoader from "../reusable/Image/ImageWithLoader";
import { Card, Col, Grid, Row } from "../../defaults";
import { location, schoolOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { defaultUniImages } from "./default.images";

interface IUniversityProps {
  post: IPost;
}

export const University: FC<IUniversityProps> = ({ post }) => {
  const { elevatorInfo } = post;
  const { studentCharges } = post;
  const formattedAddress = `${elevatorInfo.address.city}, ${elevatorInfo.address.stateAbbreviation}, ${elevatorInfo.address.streetAddressOrPOBox}`;
  return (
    <Card
      style={{
        width: "100%",
        marginTop: "10px",
        // borderTop: "1px solid #e0e0e0"
      }}
      className="max-md:border-none ion-no-margin"
    >
      <IonCardHeader>
        <IonCardSubtitle>Suggested University</IonCardSubtitle>
      </IonCardHeader>
      <Grid>
        <Link to={`/university/${elevatorInfo.name}`}>
          <IonCardContent>
            <div className="grid grid-cols-4 gap-x-4">
              {elevatorInfo?.pictures?.length > 0
                ? elevatorInfo.pictures
                    .slice(0, 4)
                    .map((img) => (
                      <ImageWithLoader
                        key={img}
                        alt="University Image"
                        className={"object-cover h-48"}
                        src={img}
                      />
                    ))
                : defaultUniImages
                    .slice(0, 4)
                    .map((img) => (
                      <ImageWithLoader
                        key={img.small}
                        className={"object-cover h-48"}
                        src={img.full}
                        alt={img.alts}
                      />
                    ))}
            </div>
            <div className="mt-4">
              <IonItem>
                <IonText color="dark">
                  <IonCardTitle>{elevatorInfo.name}</IonCardTitle>
                </IonText>
              </IonItem>
              <IonItemDivider />
              <Row
                className="ion-no-padding gap-1 items-center h-fit mt-2"
                lines="none"
              >
                <IonIcon
                  className="ion-icon leading-none mt-0 text-primar text-lg"
                  icon={location}
                />
                <IonText className="text-sm leading-none m-0 h-fit ion-no-padding font-semibold text-gray-600">
                  {formattedAddress}
                </IonText>
              </Row>
              <Row className="mt-4">
                <IonText className="text-[#55D283] font-semibold">
                  Own Type: {elevatorInfo.ownType}
                </IonText>
              </Row>
              <Row className="mt-4 font-semibold">
                <IonText className="text-blue-600 font-semibold">
                  Tags: {elevatorInfo?.tags?.join(", ")}
                </IonText>
              </Row>

              <Row className="mt-4 font-semibold items-center space-x-2 ">
                <IonIcon
                  className="ion-icon text-primar text-lg"
                  icon={schoolOutline}
                />
                <Col className="p-0">
                  <IonText className="text-red-600 font-semibold">
                    Graduate Application Fee: $
                    {studentCharges?.graduateApplicationFee ?? "N/A"}
                  </IonText>
                </Col>
                <Col className="p-0">
                  <IonText className="text-blue-600 font-semibold">
                    Undergradutate Application Fee: $
                    {studentCharges?.undergraduateApplicationFee ?? "N/A"} 📚
                  </IonText>
                </Col>
              </Row>

              <Row className="mt-4 text-green-600">
                <Col>
                  {studentCharges?.graduate?.inState && (
                    <IonText className=" font-semibold">
                      Gradutate In-State Tuition: $
                      {studentCharges?.graduate?.inState?.tuition ?? "N/a"}
                    </IonText>
                  )}
                </Col>
                <Col>
                  {studentCharges?.graduate?.outOfState && (
                    <IonText className=" font-semibold">
                      Gradutate Out-State Tuition: $
                      {studentCharges?.graduate?.outOfState?.tuition ?? "N/a"}
                    </IonText>
                  )}
                </Col>
              </Row>
              <Row className="text-yellow-500">
                <Col>
                  {studentCharges?.undergraduate?.inState && (
                    <IonText className=" font-semibold">
                      Undergradutate In-State Tuition: $
                      {studentCharges?.undergraduate?.inState?.tuition ?? "N/a"}
                    </IonText>
                  )}
                </Col>
                <Col>
                  {studentCharges?.undergraduate?.outOfState && (
                    <IonText className=" font-semibold">
                      Undergradutate Out-State Tuition: $
                      {studentCharges?.undergraduate?.outOfState?.tuition ??
                        "N/a"}
                    </IonText>
                  )}
                </Col>
              </Row>
            </div>
          </IonCardContent>
        </Link>
      </Grid>
    </Card>
  );
};
