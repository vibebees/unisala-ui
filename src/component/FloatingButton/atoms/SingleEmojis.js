import React from "react"
import clsx from "clsx"
import { IonCol } from "@ionic/react"

const SingleEmojis = ({ allProps }) => {
  const { rating, handleRatingChange, value, Emojis, imageURL } = allProps
  return (
    <IonCol
      size="auto"
      className={clsx(
        "text-3xl filter relative cursor-pointer w-10 h-10",
        rating === value ? "opacity-100 grayscale-0 " : "grayscale opacity-60"
      )}
      onClick={() => handleRatingChange(value)}
    >
      <img
        src={imageURL}
        alt="Enraged Face"
        className={clsx(
          "w-10 h-10  absolute top-0 left-0",
          rating === value ? "opacity-100" : "opacity-0"
        )}
      />
      <span className={clsx(rating === value ? "opacity-0" : "opacity-100")}>
        {Emojis}
      </span>
    </IonCol>
  )
}

export default SingleEmojis
