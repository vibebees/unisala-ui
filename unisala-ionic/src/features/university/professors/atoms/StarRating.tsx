import React from "react"
import { IonText, IonIcon } from "@ionic/react"
import { star, starOutline } from "ionicons/icons"

const StarRating = ({ professorName, overallRating }) => {
  return (
    <IonText className="flex" color="dark" style={{ whiteSpace: "nowrap" }}>
      <h3>{professorName}</h3>
      <div>
        {[1, 2, 3, 4, 5].map((index) => (
          <IonIcon
            key={index}
            style={{
              color: "#F8B64C",
              margin: "0 3px",
              padding: "0",
            }}
            icon={index <= overallRating ? star : starOutline}
          />
        ))}
      </div>
    </IonText>
  )
}

export default StarRating
