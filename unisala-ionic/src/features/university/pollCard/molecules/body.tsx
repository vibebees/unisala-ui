import { IonGrid, IonRow } from "@ionic/react"

export const PollBody = ({ allProps }) => {
  const { polls, useIsData } = allProps

  return (
    <IonGrid>
      {Array.isArray(polls) &&
        polls?.map(({ type, rating }, index) => {
          const maxRating = 5
          const ratingPercentage = (rating / maxRating) * 100
          return (
            <IonRow key={index} className="ion-padding">
              <div className="poll-bar">
                <div
                  style={{ width: ratingPercentage + "%" }}
                  className="bar-value"
                ></div>
                <h3 style={{ color: "black" }}>{type.split("_")?.join(" ")}</h3>
                <h2>{useIsData(ratingPercentage)}%</h2>
              </div>
            </IonRow>
          )
        })}
    </IonGrid>
  )
}
