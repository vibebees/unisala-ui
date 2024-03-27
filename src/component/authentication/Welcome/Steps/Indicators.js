import React from "react"
import { IonGrid } from "@ionic/react"
import clsx from "clsx"

const Indicators = ({ currentStep, totalSteps }) => {
  return (
    <>
      <IonGrid className=" flex  justify-center mt-8">
        <div className="  w-fit h-fit flex gap-4 ">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
            (item, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    "  w-3 h-3 opacity-70 rounded-full",
                    currentStep >= item ? "bg-neutral-500" : "bg-neutral-300"
                  )}
                />
              )
            }
          )}
        </div>
      </IonGrid>
    </>
  )
}

export default Indicators
