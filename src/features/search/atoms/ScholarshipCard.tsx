/* eslint-disable camelcase */
import React, { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRow,
  IonCol,
  IonChip,
  IonGrid,
  IonButton,
  IonList
} from "@ionic/react"
import CardImage from "../../../components/packages/courseCard/atom/CardImage"
import {
  schoolOutline,
  starOutline,
  bookOutline,
  receiptOutline
} from "ionicons/icons"
import ScholarshipText from "./ScholarshipText"
 import Modal from "../../../components/packages/reusable/modal"
import { DetailItem } from "../../../components/packages/folderStructure/molecules/detailItem"
import { Table } from "../../../components/packages/folderStructure/molecules/table"
import IonWebPop from "../../university/sideDetails/visitWebsite/IonWebPop"
import { LikeATag } from "../../../components/packages/tags"

const ScholarshipCard = ({
  pictures = [],
  university_name = "",
  scholarship_name = "",
  level = "",
  gpa = {},
  act = {},
  sat = {},
  non_score_eligibility_requirements = "",
  tags = [],
  awards = [],
  scholarship_url = ""
}) => {
  const [popup, setPopup] = React.useState(false)
  const ModalData = (
    <div>
      <IonList>
        <DetailItem label="Scholarship Name" value={scholarship_name} />
        <DetailItem label="Level" value={level} />
        <DetailItem label="ACT Score" value={`${act.min} - ${act.max}`} />
        {awards.length > 0 && <Table awards={awards} />}
        <DetailItem label="SAT Score" value={`${sat.min} - ${sat.max}`} />
        <DetailItem
          label="Non Score Eligibility Requirements"
          value={non_score_eligibility_requirements}
        />
        <DetailItem
          label="Scholarship URL"
          value={
            <a
              href={scholarship_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {scholarship_url}
            </a>
          }
        />
      </IonList>
    </div>
  )

  return (
    <IonCard className="h-full max-md:p-0 max-md:m-0 max-md:my-2">
      <IonRow className="relative">
        <IonCol
          size="auto"
          style={{ margin: "auto" }}
          className="overflow-hidden "
        >
          <CardImage pictures={pictures} />
        </IonCol>
        <IonCardHeader className="ion-no-margin absolute bottom-0 w-fit  ion-no-padding bg-black py-2 px-5 bg-opacity-60">
          <IonCardSubtitle className="ion-text-center font-semibold !text-start text-base text-white  ">
            {university_name}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonRow>

      <IonCardContent className="h-full">
        <IonCardTitle className="ion-text-start py-2">
          {scholarship_name}{" "}
          <IonChip className="ion-no-padding ion-no-margin px-2 leading-none h-fit py-1 bg-blue-100 capitalize mx-1 text-xs text-blue-600 font-semibold">
            {level}
          </IonChip>
        </IonCardTitle>
        <IonGrid className=" mt-2  ">
          <IonRow className="flex-wrap max-md:grid items-stretch">
            <IonCol className="ion-no-padding">
              <ScholarshipText
                icon={schoolOutline}
                header={"GPA Requirement"}
                value={`${gpa?.min}-${gpa?.max}`}
                color="#38c238"
              />
              <br />

              <ScholarshipText
                icon={starOutline}
                header={"ACT Requirement"}
                value={`${act?.min}-${act?.max}`}
                color="#eab308"
              />
            </IonCol>
            <IonCol className="ion-no-padding max-md:mt-4">
              <ScholarshipText
                icon={bookOutline}
                header={"SAT Requirement"}
                value={`${sat?.min}-${sat?.max}`}
                color="#a855f7"
              />
              <br />
              <ScholarshipText
                icon={receiptOutline}
                header={"Non-Score Eligibility Requirements"}
                value={non_score_eligibility_requirements}
                color="#ec4899"
              />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonRow className="flex items-center mt-3 ">
          <IonCol>
            {tags?.length > 0 && (
              <LikeATag
                colorTitle="blue"
                colorValue="blue"
                title="tags: "
                value={tags?.join("#")}
                skipBg={true}
              />
            )}
          </IonCol>
          <IonCol size="auto" className="flex">
            <div className="w-fit">
              <Modal
                ModalButton={
                  <IonButton
                    className="w-fit rounded-md border hover:bg-neutral-50 border-blue-300 text-blue-500 capitalize "
                    fill="clear"
                  >
                    Learn More
                  </IonButton>
                }
                ModalData={ModalData}
                header="Scholarship Details"
              />
            </div>

            <IonButton
              className="w-fit rounded-md bg-neutral-700 hover:bg-neutral-800 text-neutral-100 ml-3  capitalize "
              fill="clear"
              color={"#333333"}
              onClick={() => setPopup(true)}
            >
              visit website
            </IonButton>
            <IonWebPop
              setPopup={setPopup}
              urls={scholarship_url}
              popup={popup}
              tab={false}
            />
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  )
}

export default ScholarshipCard
