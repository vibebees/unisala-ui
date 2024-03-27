import React from "react"
import { IonCol, IonCard } from "@ionic/react"

import StarRating from "../atoms/StarRating"
import ProfessorAvatar from "../atoms/ProfessorAvatar"
import { Typography } from "component/ui"

const ProfessorCard = ({ data }) => {
  const emoji = {
    0: "https://cdn-icons-png.flaticon.com/128/166/166527.png",
    1: "https://cdn-icons-png.flaticon.com/128/166/166527.png",
    2: "https://cdn-icons-png.flaticon.com/128/11269/11269926.png",
    3: "https://cdn-icons-png.flaticon.com/128/166/166549.png",
    4: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
    5: "https://cdn-icons-png.flaticon.com/128/5624/5624232.png"
  }
  return (
    <>
      <IonCol size={"6"}>
        <IonCard>
          <ProfessorAvatar professorName={data.professorName} />
          <div className="professor-profile-details">
            <StarRating
              overallRating={data.overallRating}
              professorName={data.professorName}
            />
            <div className="flex">
              <Typography variant="p">{data.subject}</Typography>

              <div className="flex justify-content-center">
                <p>{data.overallRating}</p>
                <img
                  width={25}
                  alt="happy"
                  src={emoji[Math.trunc(data.overallRating)]}
                />
              </div>
            </div>
          </div>
        </IonCard>
      </IonCol>
    </>
  )
}

export default ProfessorCard
