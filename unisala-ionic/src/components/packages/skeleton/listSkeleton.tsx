import React from "react"
import { IonItem, IonLabel, IonSkeletonText, IonThumbnail } from "@ionic/react"

export const ListSkeleton = () => {
  return (
    <IonItem className="ion-no-margin ">
      <IonThumbnail slot="start">
        <IonSkeletonText
          animated
          style={{ width: "40px", height: "40px" }}
          className="rounded-full"
        />
      </IonThumbnail>
      <IonLabel className="ion-no-padding">
        <h3>
          <IonSkeletonText
            animated
            style={{ width: "100px", height: "20px" }}
          />
        </h3>
        <p>
          <IonSkeletonText
            animated
            style={{ width: "100px", height: "20px" }}
          />
        </p>
      </IonLabel>
    </IonItem>
  )
}

