import propTypes from "prop-types"
import { Link } from "react-router-dom"
import { IonCard, IonCardSubtitle, IonText, IonIcon } from "@ionic/react"
import {
  location,
  calendar,
  logoGithub,
  logoTwitch,
  logoFacebook,
  logoYoutube,
  logoTwitter,
  logoInstagram,
  logoLinkedin
} from "ionicons/icons"
import UserCtaBtns from "./userCtaBtns/UserCtaBtns"
import { Avatar } from "../../../component/Avatar"
import useWindowWidth from "hooks/useWindowWidth"
import "./index.css"
import { useEffect, useState } from "react"
import { getImage } from "servers/s3.configs"

const ProfileHeader = ({ tab, setTab, data }) => {
  const [coverImage, setCoverImage] = useState("")
  const [percentage, setPercentage] = useState(0)
  const {
    firstName,
    lastName,
    username,
    profilePic,
    coverPicture,
    oneLinerBio,
    location: userLocation,
    doj,
    socialLinks
  } = data
  const width = useWindowWidth()

  const icons = {
    twitter: logoTwitter,
    github: logoGithub,
    facebook: logoFacebook,
    youtube: logoYoutube,
    twitch: logoTwitch,
    instagram: logoInstagram,
    linkedin: logoLinkedin
  }

  const tabMenu = [
    { id: 0, menu: username },
    { id: 1, menu: "Threads" },
    { id: 2, menu: "List" },
    { id: 3, menu: "Saved" },
    { id: 4, menu: "Roadmap" },
    { id: 5, menu: "Guestbook" }
  ]

  const changeTab = (tabs) => {
    setTab(tabs)
  }

  useEffect(() => {
    getImage("user", coverPicture, setCoverImage)
  }, [coverPicture])

  const radius = width >= 768 ? 66.6 : 47
  const dashArray = radius * Math.PI * 2
  const dataOffset = dashArray - (dashArray * percentage) / 100
  return (
    <IonCard className="profile-header mb-2 max-md:mx-1">
      <div className="user-banner">
        <div></div>
        <div className="user-banner__cover">
          <img
            src={
              coverImage ||
              "https://img.freepik.com/premium-photo/back-school-education-banner-background_8087-1192.jpg?w=1380"
            }
            className="user-banner__cover--img"
            alt="userName banner"
          />
        </div>

        <div className="user-profile">
          <Avatar profilePic={profilePic} username={username} />
          <div className="border-[7px] border-neutral-300  absolute left-0 top-0 bottom-0  right-0 rounded-full z-10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="160px"
            className="progress_container"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#673ab7" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeLinecap="round"
              style={{
                fill: "none",
                stroke: "url(#GradientColor)",
                strokeWidth: "7px",
                strokeDasharray: dashArray,
                strokeDashoffset: dataOffset
              }}
            />
          </svg>
        </div>

        <UserCtaBtns profileHeader={data} myProfile={data.myProfile} />
      </div>

      <div className="short-info-wrapper">
        <IonText color="dark">
          <h1 className="text-xl capitalize font-bold">
            {firstName + " " + lastName}
          </h1>
          <IonCardSubtitle className="font-bold">@{username}</IonCardSubtitle>
        </IonText>

        <div className="inline-2 flex-wrap">
          {userLocation && (
            <IonCardSubtitle className="icon-text">
              <IonIcon className="icon-16" icon={location} />
              {userLocation}
            </IonCardSubtitle>
          )}
          <IonCardSubtitle className="icon-text font-semibold">
            <IonIcon className="icon-16" icon={calendar} />
            joined {doj?.split("T")[0]?.split("-")?.join("/")}
          </IonCardSubtitle>
        </div>
        <IonText>
          <p>{oneLinerBio}</p>
        </IonText>
        <div className="inline-1">
          {Array.isArray(socialLinks) &&
            socialLinks.map((social, i) => {
              const { name, url } = social
              return (
                <Link to={url} key={i}>
                  <IonIcon className="black-icon-28" icon={icons[name]} />
                </Link>
              )
            })}
        </div>

        <ul className="inline-2 profile-header__tab-menu">
          {tabMenu.map((tabItem) => {
            const { id, menu } = tabItem
            return (
              <li
                key={id}
                onClick={() => {
                  changeTab(id)
                }}
                className={id === tab ? "profile-header__tab-menu--active" : ""}
              >
                <h4 className="profile-header__tab-menu--h4">{menu}</h4>
              </li>
            )
          })}
        </ul>
      </div>
    </IonCard>
  )
}

ProfileHeader.propTypes = {
  setTab: propTypes.func.isRequired,
  tab: propTypes.number.isRequired,
  data: propTypes.object.isRequired
}

export default ProfileHeader
