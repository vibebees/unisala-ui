import { useQuery } from "@apollo/client"
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel
} from "@ionic/react"
import { OrgContext } from "features/org"
 import { useContext, useEffect, useRef } from "react"
import { USER_SERVICE_GQL } from "../../../datasource/servers/types"
import "./index.css"
import {TimeLine} from "../timeline"
import {GetAllHistoryYear} from "../../../datasource/graphql/user"
export const SqueezeBox = () => {
  const { orgData } = useContext(OrgContext)
  const { data, loading, fetchMore } = useQuery(GetAllHistoryYear, {
    context: { server: USER_SERVICE_GQL },
    variables: { orgId: orgData?._id }
  })

  const accordionGroup = useRef(null)
  useEffect(() => {
    if (!accordionGroup.current) {
      return
    }

    accordionGroup.current.value = ["2024"]
  }, [])

  return (
    <IonAccordionGroup
      className="ion-no-margin ion-no-padding w-full "
      ref={accordionGroup}
      expand="inset"
    >
      {data &&
        data?.getAllHistoryYear?.data &&
        data.getAllHistoryYear?.data.map((item, index) => (
          <IonAccordion
            className="ion-no-margin ion-no-padding "
            value={item}
            key={index}
          >
            <IonItem slot="header">
              <IonLabel>{item}</IonLabel>
            </IonItem>
            <div className="ion-no-padding " slot="content">
              {/* {item.content} */}

              <TimeLine year={item} />
              {/* <IonTextarea value={item.content} style={{ height: "300px" }} /> */}
            </div>
          </IonAccordion>
        ))}
    </IonAccordionGroup>
  )
}
