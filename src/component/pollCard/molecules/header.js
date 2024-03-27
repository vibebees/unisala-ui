import { IonCardContent, IonIcon, IonItem, IonLabel } from "@ionic/react"
import { Typography } from "component/ui"
import { barChart } from "ionicons/icons"

export const PollHeader = ({ allProps }) => {
  const { pollHeader = "Campus Life" } = allProps
  return (
    <IonCardContent
      style={{ borderBottom: "1px solid #C4C4C4" }}
      className="flex"
    >
      <Typography variant="h1">{pollHeader}</Typography>

      <IonItem lines="none">
        <IonIcon icon={barChart} />
        <IonLabel className="ion-padding-start">
          <Typography variant="p">Poll</Typography>
        </IonLabel>
      </IonItem>
    </IonCardContent>
  )
}
