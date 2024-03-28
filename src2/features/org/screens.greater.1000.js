import { IonCard, IonCol , IonTypography} from "../../component/defaults"
import CreateSpace from "../../component/createSpace/CreateSpace"
import TopOrgs from "./TopOrgs"
 
export const screenGreaterThan1000 = ({ title, topOrgs }) => {
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
          <IonTypography color="dark" className="text-center  my-2 font-semibold">
            Top Organizations
          </IonTypography>

          {Array.isArray(topOrgs) && <TopOrgs topOrgs={topOrgs} />}
        </IonCard>
      </IonCol>
    </>
  )
}
