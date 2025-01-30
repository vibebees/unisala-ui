// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonText,
    IonIcon,
    IonLabel,
    IonItem
} from "@ionic/react"
import { barChart } from "ionicons/icons"
import "./index.css"
import {PollBody} from "./molecules/body"
import {BodyTitle, Header} from "./atoms/bodyTitle"
import {PollHeader} from "./molecules/header"

export const Template = ({allProps}) => {
    const { isSideBar} = allProps

    return (
        !isSideBar?.campusLifeEmpty && (
            <IonCard style={{ margin: "15px 0px 0px 0px" }} className="ion-margin-top" >
                <PollHeader allProps = {allProps} />
                <IonCardContent>
                    <BodyTitle allProps = {allProps} />
                    <PollBody allProps = {allProps} />
                </IonCardContent>
            </IonCard>
        )
    )
}
