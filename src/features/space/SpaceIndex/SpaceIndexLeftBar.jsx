import { IonCard, IonCol, IonPage, IonText } from "@ionic/react"
import { Avatar } from "../../../component/Avatar"
import YourSpaces from "../../../component/YourSpaces/YourSpaces"

const SpaceIndexLeftBar = ({ user, data }) => {
  return (
    <IonCol
      size="auto"
      style={{
        height: "100%",
        position: "sticky",
        top: "15px",
        overflow: "auto"
      }}
    >
      <IonCard>
        <div className="aside-profile">
          <div className="user-profile-circle">
            <Avatar
              username={user?.username}
              profilePic={user?.profilePic}
              size="medium"
            />
          </div>
        </div>
        <div className="aside-profile-details">
          <IonText className="flex justify-content-center" color="dark">
            <h6>{user?.firstName + " " + user?.lastName}</h6>
          </IonText>
          <IonText color="medium">
            <p>@{user?.username}</p>
          </IonText>
        </div>
      </IonCard>

      <IonCard className="mt-8 pt-2 max-h-[348px] overflow-y-auto ">
        <h1 className="text-base text-black font-medium text-center">
          Your Spaces
        </h1>
        <YourSpaces data={data} />
      </IonCard>
    </IonCol>
  )
}

export default SpaceIndexLeftBar
