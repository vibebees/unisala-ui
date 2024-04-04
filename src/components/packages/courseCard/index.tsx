import React, { useState } from "react"
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonCardTitle,
  IonSkeletonText
} from "@ionic/react"
import { saveOutline, shareOutline } from "ionicons/icons"
import { LikeATag } from "../tags"
import Location from "../../../features/search/atoms/CardLocation"
import ApplicationCharges from "../../../features/search/atoms/ApplicationCharges"
import Offerings from "../../../features/search/atoms/Offerings"
import RatingCard from "../../../features/search/atoms/RatingCard"
import CardImage from "./atom/CardImage"
import ShareButton from "../share/index"
// import CustomTrackingLink from "features/analytics/LinkTrack"
import clsx from "clsx"

function CardActions({ allProps }) {
  const { showSave = false, showShare = false } = allProps

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {showShare && (
        <IonIcon style={{ fontSize: "25px" }} icon={shareOutline} />
      )}
      {showSave && <IonIcon style={{ fontSize: "25px" }} icon={saveOutline} />}
    </div>
  )
}

export function LoadingScreen() {
  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol style={{ margin: "auto" }} size={"auto"}>
            <IonSkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></IonSkeletonText>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                <IonText color="dark">
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "80%" }}
                  ></IonSkeletonText>
                </IonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                {/* {tags?.map((tag, index) => <LikeATag colorTitle="blue" colorValue="yellow" title="Tags:" value={tag} key={index} />)} */}
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>

                {/* <IonRow>
                <IonCol>
                  <h4>Mission Statement:</h4>
                  <p>{missionStatement}</p>
                </IonCol>
              </IonRow> */}
                {/* Other columns go here */}
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  )
}

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
    unitId
  } = allProps
  const link =
    window.location.origin + `/university/${name.trim().split(" ")?.join("%20")}`

  return (
    <IonCard className="max-md:mx-0 relative">
      <CustomTrackingLink
        title={`${name} clicked on university result filter `}
        to={`/university/${name}`}
        destination={`/university/${name}`}
      >
        <IonGrid>
          <IonRow>
            <IonCol
              style={{ margin: "auto" }}
              className="overflow-hidden "
              size={"auto"}
            >
              <CardImage pictures={pictures} />
            </IonCol>
            <IonCol>
              <IonRow>
                <IonCol>
                  <IonRow className="ion-no-padding m-0   items-center  h-fit">
                    <IonCol size="12">
                      <div style={{ display: "flex", float: "right" }}>
                        <CardActions allProps={allProps} />
                      </div>

                      <IonText color="dark">
                        <IonCardTitle>{name}</IonCardTitle>
                      </IonText>

                      <Location allProps={allProps} />
                    </IonCol>
                    <IonCol className="h-fit">
                      <RatingCard
                        allProps={{ overallRating, totalPeopleVoted }}
                      />
                    </IonCol>
                  </IonRow>
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
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </CustomTrackingLink>
      <div
        className={clsx(
          "absolute bottom-5 right-3",
          pictures.length === 0 ? "top-4" : "top-1/2"
        )}
      >
        <ShareButton allProps={{ link: link, unitId: unitId }} />
      </div>
    </IonCard>
  )
}

export default CourseCard
