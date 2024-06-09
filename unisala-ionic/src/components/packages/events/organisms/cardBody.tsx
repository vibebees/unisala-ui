import React, { useRef, useEffect, useState } from "react"
import {
  IonAlert,
  IonBadge,
  IonButton,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  createAnimation
} from "@ionic/react"
import { EventList } from "../molecules/eventList"
import RegisterButton from "../atoms/RegisterButton"

export const EventCardBody = ({ props = {}, data }) => {
  const [interesetUsers, setIntresedUsers] = useState(data?.interestedUsers)
  const {
    showAlert,
    clickOptions,
    buttonEl,
    animation,
    setShowAlert,
    currentOptions
  } = props

  useEffect(() => {
    animation.current = createAnimation()
      .addElement(buttonEl.current)
      .duration(1000)
      .iterations(2) // Run the animation twice
      .keyframes([
        { offset: 0, transform: "scale(1)", opacity: "1" },
        { offset: 0.5, transform: "scale(1.2)", opacity: "0.3" },
        { offset: 1, transform: "scale(1)", opacity: "1" }
      ])
  }, [])

  return (
    <IonCardContent id="up-coming-event">
      <p dangerouslySetInnerHTML={{ __html: data?.description }}></p>
      <EventList
        props={{
          ...props,
          interesetUsers
        }}
        data={data}
      />
      <RegisterButton
        setIntresedUsers={setIntresedUsers}
        eventId={data?._id}
        event={data}
      />
      <IonAlert
        isOpen={showAlert}
        className="confirmation"
        trigger="present-alert"
        header={currentOptions?.header}
        buttons={clickOptions}
        inputs={currentOptions?.body}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </IonCardContent>
  )
}
