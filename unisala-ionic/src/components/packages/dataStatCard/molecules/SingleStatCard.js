import React from "react"
import { IonGrid, IonRow, IonCol } from "@ionic/react"
import Card from "../atoms/Card"
import clsx from "clsx"

const SingleStatCard = ({ allProps }) => {
  const { data, containerStyle, CardStyle } = allProps
  return (
    <IonGrid className="py-0">
      <IonRow style={{ ...containerStyle }} className=" grid grid-cols-2">
        {data.map((item, index) => {
          return (
            <IonCol
              key={index}
              style={{
                backgroundColor: "white",
                ...CardStyle
              }}
              className={clsx(
                "ion-padding  py-2 max-lg:px-1 ",
                index === 2 && "col-span-2"
              )}
            >
              <Card {...item} />
            </IonCol>
          )
        })}
      </IonRow>
    </IonGrid>
  )
}

export default SingleStatCard
