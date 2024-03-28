import { useState } from "react"
import { IonCard, IonCardContent } from "@ionic/react"
import ReceivedConnection from "./received"
import SentConnection from "./sent"
import "./index.css"

function index() {
  const [tab, setTab] = useState(0)
  const tabMenu = [
    { id: 0, menu: "Received" },
    { id: 1, menu: "Sent" }
  ]

  return (
    <IonCard className="mb-2">
      <IonCardContent>
        <div className="requests-header">
          {tabMenu.map((tabItem) => {
            const { id, menu } = tabItem
            return (
              <h2
                key={id}
                className={id === tab ? "requests-header--active-tab" : ""}
                onClick={() => {
                  setTab(id)
                }}
              >
                {menu}
              </h2>
            )
          })}
        </div>
        <div className="requests-content">
          <div style={{ display: tab === 0 ? "block" : "none" }}>
            <ReceivedConnection />
          </div>
          <div style={{ display: tab === 1 ? "block" : "none" }}>
            <SentConnection />
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default index
