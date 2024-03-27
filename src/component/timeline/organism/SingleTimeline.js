import { IonCol, IonRow } from "@ionic/react"
import DateList from "../atoms/DateList"

const SingleTimeline = ({ data }) => {
  return (
    <IonRow className=" !px-0   ion-no-margin ion-no-padding h-full rounded-md  pt-2">
      <IonCol className="w-full ion-no-margin ion-no-padding h-full ion-no-margin  px-0">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <DateList
              key={index}
              date={new Date(item.date).toISOString().slice(0, 10)}
              content={item?.description}
            />
          ))}
      </IonCol>
    </IonRow>
  )
}

export default SingleTimeline
