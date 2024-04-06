// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { IonAvatar, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import { addCircle, helpCircle, informationCircle } from "ionicons/icons"
import { Avatar } from "../../../components/defaults"
export const MessageItem = ({ firstName, username, lastName, picture, _id, image, message = {}, seen = false }) => {

    // const [seen, setSeen] = useState(false)
    // // if current message box is open for any user that should put the seen status to true
    // if (currentUserId === item?.sender?._id) {
    //     setSeen(true)
    // }
    if (firstName === undefined || lastName === undefined) {
        return <div></div>
    }
    return (
        <div className="message-pop-item">
            <IonItem
                style={{
                    margin: "0px",
                    padding: "0px",
                    backgroundColor: "red"
                }}
                lines="none"
            >

                <IonAvatar slot="start">
                    <Avatar profilePic={firstName + " " + lastName} username={firstName + lastName} />

                </IonAvatar>
                <IonLabel>
                    <div className="flex ">
                        {" "}
                        <h2>{firstName + " " + lastName}</h2>
                        <img
                            src="https://www.svgrepo.com/show/178831/badges-money.svg"
                            alt=""
                            width={20}
                        />
                    </div>
                    <p
                        style={{
                            margin: 0
                        }}
                    >
                        {username}
                    </p>
                </IonLabel>
            </IonItem>
            <IonRow>
                <IonCol>
                    { }
                    <IonText style={{ fontWeight: seen ? "normal" : "bold" }} >
                        {message?.text?.length > 20 ? message?.text?.slice(0, 20) + "..." : message?.text?.slice(0, 20)}
                    </IonText>
                </IonCol>
                <IonCol>
                    {!seen && <IonIcon icon={helpCircle} color="blue" />}
                </IonCol>
            </IonRow>

        </div>
    )
}
export default MessageItem
