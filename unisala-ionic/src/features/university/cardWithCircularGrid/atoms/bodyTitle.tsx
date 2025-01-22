import {IonText} from "@ionic/react"

export const BodyTitle = ({allProps}) => {

    const {bodyDetail = "What one word or phrase best describes your school?" } = allProps
    return (<IonText color="dark">
        <h2>{bodyDetail}</h2>
    </IonText>)
}
