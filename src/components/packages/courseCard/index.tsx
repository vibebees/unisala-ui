import React from "react";
import { LikeATag } from "../tags";
import Location from "../../../features/search/atoms/CardLocation";
import ApplicationCharges from "../../../features/search/atoms/ApplicationCharges";
import Offerings from "../../../features/search/atoms/Offerings";
import RatingCard from "../../../features/search/atoms/RatingCard";
import CardImage from "./atom/CardImage";
import ShareButton from "../share/index";
import clsx from "clsx";
import { CustomTrackingLink } from "../../analytics/LinkTrack";
import { Card, Col, Grid, Row, Typography } from "../../defaults";

function CourseCard({ allProps }) {
  const {
    name,
    ownType,
    tags,
    pictures,
    undergraduateApplicationFee,
    graduateApplicationFee,
    graduate,
    totalPeopleVoted,
    overallRating,
    undergraduate,
    unitId,
  } = allProps;

  const link =
    window.location.origin +
    `/university/${name.trim().split(" ")?.join("%20")}`;

  return (
    <Card className="max-md:mx-0 relative">
      <CustomTrackingLink
        title={`${name} clicked on university result filter `}
        to={`/university/${name}`}
        destination={`/university/${name}`}
      >
        <Grid>
          <Row>
            <Col
              style={{ margin: "auto" }}
              className="overflow-hidden "
              size={"auto"}
            >
              <CardImage pictures={pictures} />
            </Col>
            <Row>
              <Row>
                <Row>
                  <Row className="ion-no-padding m-0   items-center  h-fit">
                    <Col size="12">
                      <div style={{ display: "flex", float: "right" }}></div>

                      <Typography
                        variant="h2"
                        className="text-base font-medium"
                        color="dark"
                      >
                        {name}
                      </Typography>

                      <Location
                        city={allProps?.address?.city}
                        stateAbbreviation={allProps?.address?.stateAbbreviation}
                        streetAddressOrPOBox={
                          allProps?.address?.streetAddressOrPOBox
                        }
                      />
                    </Col>
                    <Col className="h-fit">
                      <RatingCard
                        allProps={{ overallRating, totalPeopleVoted }}
                      />
                    </Col>
                  </Row>
                  <Offerings allProps={allProps} />
                  <ApplicationCharges
                    undergraduateApplicationFee={undergraduateApplicationFee}
                    undergraduate={undergraduate}
                    graduateApplicationFee={graduateApplicationFee}
                    graduate={graduate}
                  />

                  {ownType?.length > 0 && (
                    <LikeATag
                      colorTitle="green"
                      colorValue="yellow"
                      title="Own Type:"
                      value={ownType}
                    />
                  )}
                  {/* {tags?.map((tag, index) => <LikeATag colorTitle="blue" colorValue="yellow" title="Tags:" value={tag} key={index} />)} */}
                  {tags?.length > 0 && (
                    <LikeATag
                      colorTitle="blue"
                      colorValue="blue"
                      title="tags: "
                      value={tags?.join("#")}
                      skipBg={true}
                    />
                  )}

                  {/* <IonRow>
                  <IonCol>
                    <h4>Mission Statement:</h4>
                    <p>{missionStatement}</p>
                  </IonCol>
                </IonRow> */}
                  {/* Other columns go here */}
                </Row>
              </Row>
            </Row>
          </Row>
        </Grid>
      </CustomTrackingLink>
      <div
        className={clsx(
          "absolute bottom-5 right-3",
          pictures.length === 0 ? "top-4" : "top-1/2"
        )}
      >
        <ShareButton allProps={{ link: link, unitId: unitId }} />
      </div>
    </Card>
  );
}

export default CourseCard;
