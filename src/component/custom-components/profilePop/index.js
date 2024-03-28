import { IonIcon, IonItem, IonAvatar, IonLabel, IonButtons } from "@ionic/react"
import { logOut } from "ionicons/icons"
import "./index.css"
import { Link } from "react-router-dom"
import Authentication from "../authentication/AuthModal"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Avatar } from "../Avatar"
import CustomTrackingLink from "../../features/analytics/LinkTrack"

export const ProfilePop = ({ allProps }) => {
  const {
    setPopoverOpen = () => {},
    setActiveNavDrop = () => {},
    activeNavDrop = {},
    setActive = () => {}
  } = allProps
  const { user, loggedIn } = useSelector((state) => state.userProfile)
  const profilePic = user?.picture

  useEffect(() => {
    if (!loggedIn) {
      setActiveNavDrop({
        profile: !activeNavDrop?.profile
      })
    }
  }, [loggedIn])

  if (!loggedIn) {
    return <Authentication allProps={allProps} />
  }

  return (
    <>
      <CustomTrackingLink
        to={`/@/${user?.username}`}
        destination={user?.name}
        title="Navigating to profile page"
      >
        <IonItem
          button
          detail={false}
          style={{
            borderBottom: "1px solid #e0e0e0"
          }}
          onClick={() => {
            setPopoverOpen(false)
            setActive("@")
          }}
          lines="none"
        >
          <IonAvatar slot="start">
            <Avatar username={user.username} profilePic={profilePic} />
          </IonAvatar>
          <IonLabel>
            <h2
              style={{
                margin: 0
              }}
            >
              {user.username}
            </h2>
          </IonLabel>
        </IonItem>
      </CustomTrackingLink>
      <div className="profile-drop-div">
        <IonButtons
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
          className="profile-drop-btn"
          lines="none"
        >
          <IonIcon slot="start" icon={logOut} />
          <IonLabel color="dark">Log out</IonLabel>
        </IonButtons>
      </div>
    </>
  )
}
export default ProfilePop
