import React from "react"
import { IonGrid, IonCardContent } from "@ionic/react"
import Headers from "../organism/Headers"
import Welcome from "./welcome"
const SelectOptions = React.lazy(() => import("../organism/SelectOptions"))
const InputOptions = React.lazy(() => import("../organism/InputOptions"))

const Step = ({ metaData }) => {
  return (
    <div>
      <div>
        <IonGrid className="mx-12 max-md:mx-4 mt-6 ">
          {metaData?.placeholder && (
            <Headers title={metaData?.name} subtitle={metaData?.placeholder} />
          )}
          {metaData.type === "html" && <Welcome metaData={metaData} />}
          {metaData.type === "select" && (
            <IonGrid className="mt-8  grid grid-cols-2 gap-8 max-md:grid-cols-1 ">
              <SelectOptions metaData={metaData} />
            </IonGrid>
          )}
          {metaData.type === "input" && (
            <IonCardContent className="ion-no-padding mt-3 ion-no-margin">
              <InputOptions metaData={metaData} />
            </IonCardContent>
          )}
        </IonGrid>
      </div>
    </div>
  )
}

export default Step
