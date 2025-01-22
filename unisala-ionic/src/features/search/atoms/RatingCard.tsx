import React from "react"
import { IonRow, IonText, IonIcon, IonCol, IonCardSubtitle } from "@ionic/react"
import { star, starHalf } from "ionicons/icons"
import { URLgetter } from "@utils/lib/URLupdate"

const RatingCard = ({ allProps }) => {
  const { overallRating, totalPeopleVoted = 0 } = allProps

  if (!overallRating) return null

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(overallRating)
    const hasHalfStar = overallRating % 1 !== 0
    const emptyStars = 5 - fullStars - hasHalfStar

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IonIcon
          key={i}
          style={{ fontSize: "18px" }}
          icon={star}
          className="text-yellow-500"
        />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <IonIcon
          key="half"
          style={{ fontSize: "18px" }}
          icon={starHalf}
          className="text-yellow-500"
        />
      )
    }
    if (emptyStars) {
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <IonIcon
            key={i}
            style={{ fontSize: "18px" }}
            icon={star}
            className="text-gray-200"
          />
        )
      }
    }

    return stars
  }
     const major = URLgetter("major")

  return (
    <IonRow className=" justify-end items-start  m-0 h-fit">
      <IonCol size="auto m-0">
      <IonRow>
          <IonText>
            <IonCardSubtitle className="text-sm font-semibold text-gray-600">
              {major} department
            </IonCardSubtitle>
          </IonText>
        </IonRow>
        <IonRow className="items-center m-0">
          <IonText className="text-2xl m-0 font-semibold text-neutral-900">
            {overallRating ? overallRating.toFixed(1) : 0}
          </IonText>
          <IonCol className="items-end flex mt-1  gap-1 py-px px-2  h-fit ion-no-padding">
            {renderStars()}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonText>
            <IonCardSubtitle className="text-sm font-semibold text-gray-600">
              {totalPeopleVoted}  votes
            </IonCardSubtitle>
          </IonText>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}

export default RatingCard
