import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/react"
import ShareButton from "../../share/atoms/ShareButton"
import { calendarOutline } from "ionicons/icons"

export const EventCardHeader = ({ event, data }) => {
  const link = window.location.origin + window.location.pathname
  return (
    <IonCardHeader>
      <IonCardSubtitle>
        <IonIcon icon={calendarOutline} size="medium" />{" "}
        {new Date(event?.eventDate).toDateString()}
      </IonCardSubtitle>

      <IonCardTitle className=" flex items-center justify-start">
        {event?.title} <div className="px-3"></div>
        <ShareButton
          allProps={{
            showAddList: false,
            link
          }}
        />
      </IonCardTitle>
    </IonCardHeader>
  )
}

