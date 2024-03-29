import {
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonIcon,
  IonCol,
  IonText
} from "@ionic/react"
import { calendarOutline } from "ionicons/icons"
import moment from "moment"

export const EventList = ({ props, data }) => {
  // function daysRemaining(targetDate) {
  //   // Get the current date
  //   const currentDate = new Date()

  //   // Convert both dates to UTC
  //   const utcCurrentDate = Date.UTC(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth(),
  //     currentDate.getDate()
  //   )
  //   const utcTargetDate = Date.UTC(
  //     targetDate.getFullYear(),
  //     targetDate.getMonth(),
  //     targetDate.getDate()
  //   )

  //   // Calculate the difference in milliseconds
  //   const timeDifference = utcTargetDate - utcCurrentDate

  //   // Convert the difference to days
  //   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  //   return daysDifference
  // }

  const daysRemaining = moment(data?.eventDate).diff(moment(), "days")

  const { event, interesetUsers } = props
  return (
    <IonCol className="my-5 h-full flex-col">
      <IonRow className="w-fit ion-no-margin gap-3 ion-no-padding ">
        {interesetUsers && interesetUsers?.length > 0 && (
          <IonText className="bg-blue-100 rounded-full py-px  px-2">
            <h3 className="text-blue-800 !font-semibold rounded-md">
              {interesetUsers?.length} people registered for this event
            </h3>
          </IonText>
        )}
        {/* <IonText className="bg-blue-100 rounded-full py-px  px-2">
          <h3 className="text-blue-800 !font-semibold rounded-md">
            {event?.major}
          </h3>
        </IonText> */}
      </IonRow>
      <IonRow className="ion-no-margin ion-no-padding gap-1 items-center mt-4">
        <IonCol className="w-full flex justify-start gap-3 ion-no-margin ion-no-padding pl-1">
          <IonIcon className="text-2xl" icon={calendarOutline} size="medium" />
          <IonText className="text-base ion-no-margin ion-no-padding font-medium text-neutral-900">
            {daysRemaining} days remaining
          </IonText>
        </IonCol>
      </IonRow>

      {/* <IonItem>
        <IonLabel>Registered</IonLabel>
        <IonBadge color="success">{event?.registered}</IonBadge>
      </IonItem>
      <IonItem>
        <IonLabel>Major</IonLabel>
        <IonBadge color="secondary">{event?.major}</IonBadge>
      </IonItem>
      <IonItem>
        <IonLabel>Days Remaining</IonLabel>
        <IonBadge color="tertiary">{event?.dayRemaining}</IonBadge>
      </IonItem> */}
    </IonCol>
  )
}
