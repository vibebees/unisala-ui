// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonAvatar, IonItem, IonLabel, IonText } from "@ionic/react"
export const NotificationItem = ({ image, date, name, message }) => {
    return (
        <div className="message-pop-item">
            <IonItem
                style={{
                    margin: "0px",
                    padding: "0px"
                }}
                lines="none"
            >
                <IonAvatar slot="start">
                    <img src={image} />
                </IonAvatar>

                <IonLabel>
                    <h2
                        style={{
                            margin: 0
                        }}
                    >
                        {name}
                    </h2>
                    <p
                        style={{
                            margin: 0
                        }}
                    >
                        Tribhuvan university
                    </p>
                </IonLabel>
                <p className="message-pop-item-msg">{date}</p>
            </IonItem>
            <IonText color="light">
                <p className="message-pop-item-msg">{message}</p>
            </IonText>
        </div>
    )
}
export default NotificationItem
