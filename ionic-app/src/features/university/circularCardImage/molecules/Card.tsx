import React from "react"
import SingleCircularCard from "../atoms/SingleCircularCard"
import { IonText, IonGrid, IonRow, IonCol, IonCardContent } from "@ionic/react"

const Card = ({ allProps }) => {
  const { data, header } = allProps
  return (
    <IonCardContent>
      <IonText color="dark">
        <h2>{header}</h2>
      </IonText>
      <IonGrid>
        <IonRow>
          {data.map((item, index) => {
            return (
              <IonCol
                key={index}
                style={{
                  alignSelf: "center",
                  margin: "5px",
                  padding: 0
                }}
                className="ion-padding"
              >
                <SingleCircularCard {...item} />
              </IonCol>
            )
          })}
        </IonRow>
      </IonGrid>
    </IonCardContent>
  )
}

export default Card
