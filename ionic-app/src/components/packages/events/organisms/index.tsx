import { IonAlert, IonCard, IonCardContent, IonImg } from "@ionic/react";
import React, { useState } from "react";
import RegisterButton from "../atoms/RegisterButton";
import { EventCardHeader } from "./cardHeader";
import { defaultEventsImages } from "../../feed/default.images";
export const EventCard = ({ event }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [buttonText, setButtonText] = useState("Register Now");
  const [buttonColor, setButtonColor] = useState("primary");
  const handleRegister = () => setShowAlert(true);
  const handleUserActivity = (value) => {
    setSelectedYear(value);
    setButtonText("Registered!");
    setButtonColor("success");
    setShowAlert(false);
    // Trigger button animation if needed
  };
  const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior"].map(
    (year) => ({
      label: year,
      type: "radio",
      value: year,
    })
  );

  const handleUserAcitivity = (value) => {
    setSelectedYear(value);
    setButtonText("Registered!");
    setShowAlert(false);
    setButtonColor("success");
  };

  const randomEventImage = defaultEventsImages[10];
  return (
    <section>
      <IonCard>
        <IonImg
          src={event?.images[0] ?? randomEventImage.small_s3}
          alt={randomEventImage.alts}
        ></IonImg>
        <EventCardHeader event={event} />
        <IonCardContent>
          <div dangerouslySetInnerHTML={{ __html: event?.description }} />
          <RegisterButton
            buttonText={buttonText}
            buttonColor={buttonColor}
            onClick={handleRegister}
            event={event}
          />
          <IonAlert
            isOpen={showAlert}
            className="confirmation"
            trigger="present-alert"
            header="Select your year in college "
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                handler: () => {
                  setShowAlert(false);
                },
              },
              {
                text: "OK",
                role: "confirm",
                handler: (value) => handleUserAcitivity(value),
              },
            ]}
            inputs={yearOptions}
            onDidDismiss={() => setShowAlert(false)}
          ></IonAlert>
        </IonCardContent>
      </IonCard>
    </section>
  );
};
