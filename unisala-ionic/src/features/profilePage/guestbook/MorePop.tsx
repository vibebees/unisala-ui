// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPopover,
    IonText
} from "@ionic/react"
import { pencil, trashBin } from "ionicons/icons"

export const MorePop = ({ setMorePop, morePop, index }) => {
    return (
        <IonPopover onDidDismiss={() => setMorePop(false)} isOpen={morePop}>
            <IonItem>
                <IonItem>
                    <IonIcon icon={trashBin} />
                    <IonLabel>Delete</IonLabel>
                </IonItem>
                <IonItem>
                    <IonIcon icon={pencil} />
                    <IonLabel>Edit</IonLabel>
                </IonItem>
            </IonItem>
        </IonPopover>
    )
}
export default MorePop
