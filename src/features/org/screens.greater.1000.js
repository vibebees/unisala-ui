import { IonCard, IonCol, IonText } from "@ionic/react"
import CreateSpace from "../../component/createSpace/CreateSpace"
import TopOrgs from "./TopOrgs"
import { Typography } from "component/defaults"

export const screenGreaterThan1000 = ({ title, topOrgs }) => {
  console.log({ topOrgs })
  return (
    <>
      <IonCol
        className=" ion-no-margin ion-no-padding bg-red-600 "
        style={{
          height: "90vh",
          position: "sticky",
          top: "16px"
        }}
      >
        <div className="mt-3">{title === "Top Orgs" && <CreateSpace />}</div>

        <IonCard className="min-w-[250px] mt-5 ion-no-margin ion-no-padding">
          <Typography color="dark" className="text-center  my-2 font-semibold">
            Top Organizations
          </Typography>

          {Array.isArray(topOrgs) && <TopOrgs topOrgs={topOrgs} />}
        </IonCard>
      </IonCol>
    </>
  )
}
