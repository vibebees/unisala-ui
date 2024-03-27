import { useQuery } from "@apollo/client"
import {
  IonCard,
  IonText,
  IonCol,
  IonItem,
  IonAvatar,
  IonLabel
} from "@ionic/react"
import { Link } from "react-router-dom"
import CreateSpace from "../../component/createSpace/CreateSpace"
import TopSpaces from "../../component/TopSpaces/TopSpaces"
import clsx from "clsx"

export const screenGreaterThan1000 = ({ title, topSpaces }) => {
  return (
    <>
      <IonCol
        size="auto"
        style={{
          maxWidth: "250px",
          height: "90vh",
          position: "sticky",
          top: "5px",
          overflow: "auto"
        }}
      >
        {title === "Top Spaces" && <CreateSpace />}
        <IonCard className="min-w-[250px]">
          <IonText color="dark">
            <h6 className="text-center my-2 font-semibold"> {title}</h6>
          </IonText>

          {Array.isArray(topSpaces) && <TopSpaces topSpaces={topSpaces} />}
        </IonCard>
      </IonCol>
    </>
  )
}
