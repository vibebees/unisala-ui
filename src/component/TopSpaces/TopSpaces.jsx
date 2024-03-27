import { IonAvatar, IonItem, IonLabel } from "@ionic/react"
import GalleryIcon from "Icons/GalleryIcon"
import GraduatesIcon from "Icons/GraduatesIcon"
import React from "react"
import { Link } from "react-router-dom"

const TopSpaces = ({ topSpaces }) => {
  // console.log({ topSpaces })
  return (
    <>
      {topSpaces?.map((item, index) => (
        <Link to={"/space/" + item?.name} className="" key={index}>
          <IonItem
            className="max-w-[250px] "
            fill="solid"
            style={{
              "--background": "white",
              "--background-hover": "#eee"
            }}
            key={index}
          >
            <GraduatesIcon className="mr-3 mb-px" />
            <IonLabel className="ion-text-wrap">
              <h2 className="capitalize">{item.name}</h2>
            </IonLabel>
          </IonItem>
        </Link>
      ))}
    </>
  )
}

export default TopSpaces
