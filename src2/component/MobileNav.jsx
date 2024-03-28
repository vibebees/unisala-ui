
import {
  home,
  people,
  chatbubble,
  notifications,
  addCircleOutline,
  personCircle,
  navigateCircle
} from "ionicons/icons"
import { PageRoute } from "./PageRoute"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge
} from './defaults';

 
 
export default function MobileNav({ setCreateAPostPopUp, allProps }) {
  const { loggedIn } = useSelector((store) => store?.userProfile)
  const [activeTab, setActiveTab] = useState("")
  const params = new URLSearchParams(window.location.search)
  const history = useHistory()
  useEffect(() => {
    setActiveTab(window.location.pathname.split("/")[1])
  }, [])

  return (
    <IonTabs>
      <IonRouterOutlet>
        <PageRoute allProps={allProps} />
      </IonRouterOutlet>

      {loggedIn ? (
        <IonTabBar slot="bottom">
          <IonTabButton
            tab="Home"
            href="/"
            onClick={() => {
              setActiveTab("home")
            }}
            style={{
              color: activeTab === "home" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={home} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Home
            </IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="mynetwork"
            href="/mynetwork"
            onClick={() => {
              setActiveTab("mynetwork")
            }}
            style={{
              color: activeTab === "mynetwork" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={people} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Network
            </IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="post"
            onClick={() => {
              params.set("create", "y")
              history.push({
                search: params.toString()
              })
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <IonIcon size="large" icon={addCircleOutline} />
            </div>
          </IonTabButton>

          <IonTabButton
            tab="explore"
            href="search?tab=uni"
            onClick={() => {
              setActiveTab("messages")
            }}
            style={{
              color: activeTab === "explore" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={navigateCircle} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Explore Universities
            </IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="messages"
            href="/messages"
            onClick={() => {
              setActiveTab("messages")
            }}
            style={{
              color: activeTab === "messages" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={chatbubble} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Messages
            </IonLabel>
            <IonBadge>0</IonBadge>
          </IonTabButton>

          {/* <IonTabButton
            tab="notifications"
            href="/notifications"
            onClick={() => {
              setActiveTab("notifications")
            }}
            style={{
              color: activeTab === "notifications" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={notifications} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Notifications
            </IonLabel>
            <IonBadge>6</IonBadge>
          </IonTabButton> */}
        </IonTabBar>
      ) : (
        <IonTabBar slot="bottom">
          <IonTabButton
            tab="Home"
            href="/"
            onClick={() => {
              setActiveTab("home")
            }}
            style={{
              color: activeTab === "home" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={home} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Home
            </IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="login"
            href="/login"
            onClick={() => {
              setActiveTab("login")
            }}
            style={{
              color: activeTab === "login" ? "#3880ff" : "#999999"
            }}
          >
            <IonIcon icon={personCircle} />
            <IonLabel
              style={{
                fontSize: "10px"
              }}
            >
              Login
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  )
}
