// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { IonCard, IonCardContent, IonIcon, useIonToast } from "@ionic/react"
import { eyeOff, eye } from "ionicons/icons"
import "./index.css"

function Badges({ badge, myProfile }) {
  const [isCardPrivate, setIsCardPrivate] = useState(badge?.private)
  const [present, dismiss] = useIonToast()
  const handleCardPrivacy = () => {
    present({
      duration: 3000,
      message: isCardPrivate ? "Made Public" : "Made Private",
      buttons: [{ text: "X", handler: () => dismiss() }],
      color: "primary",
      mode: "ios"
    })
    setIsCardPrivate(!isCardPrivate)
  }

  const badges = {
    SelfStarter: {
      name: "Self Starter",
      icon: "https://res.cloudinary.com/practicaldev/image/fetch/s--wQH58dcz--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/160/community-wellness-level-1-badge.png",
      describe: "Set up the account"
    },
    TeamPlayer: {
      name: "Project Manager",
      icon: "https://res.cloudinary.com/practicaldev/image/fetch/s--mvoi2vUk--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/2/1-year-badge.png",
      describe: "Set up the account"
    },
    ProjectManager: {
      name: "Team Player",
      icon: "https://res.cloudinary.com/practicaldev/image/fetch/s--7LzjnbaB--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/9/2year-Badge-shadow__1_.png",
      describe: "Set up the account"
    },
    JustExample: {
      name: "Team Player",
      icon: "https://res.cloudinary.com/practicaldev/image/fetch/s--7LzjnbaB--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/9/2year-Badge-shadow__1_.png",
      describe: "Set up the account"
    }
  }

  return (
    <IonCard className="mb-2">
      <IonCardContent className="card-bb flex">
        <h1>Badges Earned</h1>
        {myProfile && (
          <div className="inline-flex">
            <IonIcon
              className="grey-icon-32 mr-1"
              icon={isCardPrivate ? eyeOff : eye}
              onClick={() => {
                handleCardPrivacy()
              }}
            />
          </div>
        )}
      </IonCardContent>
      <IonCardContent className="badge-card">
        {Array.isArray(badge?.earnedBadges) &&
          badge?.earnedBadges.map((badge, i) => {
            return (
              <div className="badge-item" key={i}>
                <img
                  className="badge-img"
                  src={badges[badge]?.icon}
                  alt="name"
                />
                <div>
                  <h1>{badges[badge]?.name}</h1>
                  <p>{badges[badge]?.describe}</p>
                </div>
              </div>
            )
          })}
      </IonCardContent>
    </IonCard>
  )
}

export default Badges
