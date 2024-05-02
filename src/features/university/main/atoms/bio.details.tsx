// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonList
} from "@ionic/react"
import { heart, location } from "ionicons/icons"
import useRating from "@hooks/useRating"
import Modal from "@components/packages/reusable/modal"
import SeeMoreButton from "@components/packages/reusable/buttons/SeeMoreButton"
import ListItemValue from "@components/packages/reusable/listValueItem"
import {ShareButton} from "@components/packages/share"
import { Typography } from "@components/defaults"

export const BioDetails = ({ allProps }) => {
  const { width, uniData, handleResize } = allProps
  const link =
    window.location.origin +
    `/university/${uniData?.elevatorInfo?.name
      ?.trim()
      ?.split(" ")
      ?.join("%20")}`

  const Iconstyle = {
    color: "grey",
    margin: "0 0px"
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  const ModalData = (
    <div>
      <IonList>
        <ListItemValue label={"Name"} value={uniData?.elevatorInfo?.name} />
        <ListItemValue label={"Bio"} value={uniData?.elevatorInfo?.bio} />
        <ListItemValue
          label={"Address"}
          value={uniData?.elevatorInfo?.briefAddress}
        />
        <ListItemValue
          label={"Calender System"}
          value={uniData?.elevatorInfo?.calendar}
        />
        <ListItemValue
          label={"Graduate offered"}
          value={uniData?.elevatorInfo?.graduateOffering}
        />
        <ListItemValue
          label={"Grants Medical Degree"}
          value={uniData?.elevatorInfo?.grantsMedicalDegree}
        />
        <ListItemValue
          label={"Has Hospital"}
          value={uniData?.elevatorInfo?.hasHospital}
        />
        <ListItemValue
          label={"Highest Degree Offered"}
          value={uniData?.elevatorInfo?.highestLevelOfOffering}
        />
        <ListItemValue
          label={"University Type"}
          value={uniData?.elevatorInfo?.ownType}
        />
        <ListItemValue
          label={"Undergraduate offered"}
          value={uniData?.elevatorInfo?.undergraduateOffering}
        />
      </IonList>
    </div>
  )

  return (
    <IonGrid className={width > 720 ? "ion-padding" : ""}>
      <IonRow>
        <IonCol>
          <Typography
            variant="h1"
            className="font-semibold max-md:text-center max-md:py-3 text-xl mt-3  "
          >
            {uniData?.elevatorInfo?.name}
          </Typography>

          <Typography variant="p" className=" py-1 mb-2 max-md:text-center">
            {uniData?.elevatorInfo?.bio}
          </Typography>

          <div className="inline-flex max-md:justify-center  w-full">
            <IonCardContent style={{ display: "flex", padding: "0 0" }}>
              <IonIcon
                style={{
                  fontSize: "20px",
                  alignSelf: "center"
                }}
                className="ion-icon"
                icon={location}
              />

              <Typography variant="p" className="px-1">
                {uniData?.elevatorInfo?.address?.city}
              </Typography>
            </IonCardContent>
            <IonCardContent style={{ display: "flex", padding: "0 12px" }}>
              <IonIcon
                style={{
                  fontSize: "20px",
                  alignSelf: "center"
                }}
                color="danger"
                className="ion-icon"
                icon={heart}
              />
              <Typography variant="p" className="px-1">
                {useRating(uniData?.reviews || []) || "N/A"} Review
              </Typography>
            </IonCardContent>
            <IonCardContent
              className="items-center gap-8"
              style={{ display: "flex", padding: "0 12px", height: "26px" }}
            >
              {/* <p style={{ alignSelf: "center" }}>See more </p> */}
              <Modal
                ModalButton={<SeeMoreButton />}
                ModalData={ModalData}
                header="About"
              />
              <ShareButton
                allProps={{
                  link,
                  unitId: uniData?.elevatorInfo?.unitId,
                  Iconstyle
                }}
              />
            </IonCardContent>
          </div>
        </IonCol>
        {/* <IonCol
                    size="auto"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto"
                    }}
                    className="ion-padding"
                >
                    <section
                        style={{
                            width: "250px",
                            margin: "auto"
                        }}
                    >
                        <section style={{ display: "flex" }}>
                            <IonCol>
                                <IonButton
                                    color="light"
                                    style={{ width: "100%" }}
                                >
                                    <IonIcon
                                        color="dark"
                                        className="padding-lg"
                                        icon={share}
                                    />
                                    {"  "}
                                    <IonLabel className="ion-padding-start">
                                        Share
                                    </IonLabel>
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton
                                    color="light"
                                    style={{ width: "100%" }}
                                >
                                    <IonIcon icon={heart} />
                                    {"  "}

                                    <IonLabel className="ion-padding-start">
                                        Save
                                    </IonLabel>
                                </IonButton>
                            </IonCol>
                        </section>
                        <IonButton style={{ width: "100%" }}>
                            <p>Easy Apply</p>
                        </IonButton>
                    </section>
                </IonCol> */}
      </IonRow>
    </IonGrid>
  )
}
