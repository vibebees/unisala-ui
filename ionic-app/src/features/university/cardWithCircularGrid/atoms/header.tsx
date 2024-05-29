import {IonCardContent} from "@ionic/react"

export const header = ({allProps}) => {
    const {header = "Test Scores"} = allProps
    return (<IonCardContent
        style={{
            borderBottom: "1px solid #C4C4C4"
        }}
    >
        <h1>{header}</h1>
    </IonCardContent>
    )
}
