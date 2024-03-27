import {IonCardContent} from "@ionic/react"

export const ReportHeader = ({allProps}) => {

    const {content = "Report", index} = allProps
    return (
        <IonCardContent
            style={{
                borderBottom: "1px solid #C4C4C4"
            }}
        >
            <h1>Report</h1>
        </IonCardContent>
    )
}
