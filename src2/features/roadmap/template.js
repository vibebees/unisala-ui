import React, { useState } from "react"
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonRadio,
  IonRadioGroup,
  IonInput,
  IonItem
} from "@ionic/react"

import ProgressReport from "./progressReport"
// import StepInput from "../../component/roadmap/StepInput"
import "./styles.css"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"

export const StudyAbroadRoadmapInput = () => {
  const [firstStep, setfirstStep] = useState(true)
  const [data, setdata] = useState({
    stepOne: "",
    stepTwo: "",
    stepThree: "",
    stepFour: ""
  })

  return (
      <IonGrid style={{ maxWidth: "900px", margin: "auto" }} className="w-full">
        <ProgressReport />
        <IonRow class="w-full gap-6 h-full mt-10 ">
          {/* <IonCol className="h-full ">
            <h4 className="font-semibold pl-4">Other useful information</h4>
            <div className="h-full mt-4 bg-neutral-100 border border-neutral-400 border-opacity-20 rounded-md px-5 py-6">
              <p className="text-sm text-neutral-600">
                As soon as we hear anything on your case we will update you
              </p>
              <br />
              <p className="text-sm text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                doloremque commodi magni, soluta optio tenetur quisquam fugiat
                architecto ipsa quam at nobis dolorum, assumenda cupiditate ut
                <br />
                <br />
                architecto ipsa quam at nobis dolorum, assumenda cupiditate ut
                architecto ipsa quam at nobis dolorum, assumenda cupiditate ut
                officia! Ipsum, voluptas corrupti.
              </p>
            </div>
          </IonCol> */}

        </IonRow>
      </IonGrid>
  )
}
