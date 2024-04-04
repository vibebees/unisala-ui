import {
  IonCard,
  IonText,
  IonCardSubtitle,
  IonIcon,
  IonCardContent
} from "@ionic/react"
import { location } from "ionicons/icons"
import { Link } from "react-router-dom"
 import "./index.css"
import { useEffect, useState } from "react"
import {getImage} from "../../../datasource/servers/s3.configs"
import { Avatar } from "../../defaults"

function index({
  profileBanner,
  profileImg,
  name,
  username,
  loaction: userLocation,
  oneLineBio,
  children
}) {
  const profilePic = profileImg
  const [coverPicture, setCoverPicture] = useState("")

  useEffect(() => {
    getImage("user", profileBanner, setCoverPicture)
  }, [])

  return (
    <IonCard className="user-card">
      <div className="user-card--user-banner">
        <div className="user-card--cover">
          <img
            src={
              coverPicture ||
              "https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
            alt={`${username}'s cover picture`}
          />
        </div>

        <div className="user-card--profile">
          <Avatar username={username} profilePic={profilePic} />
        </div>
      </div>
      <IonCardContent className="user-card--info">
        <Link to={`/@/${username}`} className="user-card--info-link">
          <div className="user-card--info-text">
            <IonText color="dark">
              <h1 style={{ fontSize: "1.2rem" }}>{name}</h1>
              <IonCardSubtitle className="inline-2 flex-wrap">
                @{username}
                {userLocation && (
                  <IonCardSubtitle className="icon-text">
                    <IonIcon className="icon-16" icon={location} />
                    {userLocation.length > 10
                      ? userLocation.slice(0, 10) + "..."
                      : userLocation}
                  </IonCardSubtitle>
                )}
              </IonCardSubtitle>
            </IonText>

            {oneLineBio && (
              <IonCardSubtitle>
                <p>{oneLineBio}</p>
              </IonCardSubtitle>
            )}
          </div>
        </Link>
        {children}
      </IonCardContent>
    </IonCard>
  )
}

export default index
