import React from "react"
import { IonAvatar } from "@ionic/react"
import { Avatar } from "component/Avatar"

const ProfessorAvatar = ({ professorName }) => {
  return (
    <div className="professor-profile">
      <div>
        <IonAvatar
          style={{
            width: "60px",
            height: "60px"
          }}
        >
          <IonAvatar>
            <Avatar username={professorName} />
          </IonAvatar>
        </IonAvatar>
      </div>
    </div>
  )
}

export default ProfessorAvatar
