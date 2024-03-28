import {
    IonItem,
    IonLabel,
    IonSkeletonText,
    IonThumbnail
} from "@ionic/react"

export const SkeletonMessage = () => {
    return (<IonItem>
        <IonThumbnail slot="start">
          <IonSkeletonText animated={true}></IonSkeletonText>
        </IonThumbnail>
        <IonLabel>
          <h3>
            <IonSkeletonText animated={true} style={{ "width": "80%" }}></IonSkeletonText>
          </h3>
          <p>
            <IonSkeletonText animated={true} style={{ "width": "60%" }}></IonSkeletonText>
          </p>
          <p>
            <IonSkeletonText animated={true} style={{ "width": "30%" }}></IonSkeletonText>
          </p>
        </IonLabel>
      </IonItem>)
}
