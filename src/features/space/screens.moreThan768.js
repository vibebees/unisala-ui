import {
  IonCol,
  IonCard,
  IonText,
  IonAvatar,
  IonItem,
  IonLabel
} from "@ionic/react"
import { useSelector } from "react-redux"
import { Avatar } from "../../component/Avatar"
import BadgesTab from "./BadgeTab"
import { screenGreaterThan1000 } from "./screens.greater.1000"
import { Link } from "react-router-dom"
export const screensMoreThan768 = ({
  activeTab,
  setActiveTab,
  unisalaImg,
  profileData,
  loggedIn
}) => {
  const { user } = useSelector((state) => state.userProfile)

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
      {loggedIn ? (
        <>
          {/* <Link to="/space" style={{ marginTop: "120px" }}>
            <IonText className="text-[#3880FF] mt-6 text-center font-semibold">
              <h1>Browse Spaces</h1>
            </IonText>
          </Link> */}
          <IonCard className="mt-6">
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
          <IonCard className="badges-card">
            <IonText color="dark">
              <h6
                style={{
                  padding: "10px"
                }}
              >
                Badges
              </h6>
            </IonText>
            <BadgesTab activeTab={activeTab} setActiveTab={setActiveTab} />
            {profileData?.user?.badges?.earnedBadges?.map((item, index) => {
              return (
                <IonItem
                  style={{
                    margin: "0px",
                    padding: "0px"
                  }}
                  lines="none"
                  key={index}
                >
                  <IonAvatar slot="start">
                    <img
                      src={
                        "https://www.svgrepo.com/show/178831/badges-money.svg"
                      }
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2
                      style={{
                        margin: 0
                      }}
                    >
                      {item?.title}
                    </h2>
                    <p
                      style={{
                        margin: 0
                      }}
                    >
                      {item?.description}
                    </p>
                  </IonLabel>
                </IonItem>
              )
            })}
          </IonCard>
          {screenGreaterThan1000({ title: "Top User" })}
        </>
      ) : (
        <IonCard
          style={{
            maxWidth: "250px"
          }}
        >
          <img src={unisalaImg} alt="unisala" />
          <h5
            className="black-text"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              lineHeight: "26px",
              padding: "5px"
            }}
          >
            If studying abroad is your dream, making it simple is ours! ✅
          </h5>
        </IonCard>
      )}
    </IonCol>
  )
}
