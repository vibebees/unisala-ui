import { IonAvatar, IonItem, IonLabel } from "@ionic/react"
 import React from "react"
import { Link } from "react-router-dom"
import { GraduatesIcon,  } from "./icons"

export const SpaceReference = ({ references =[] , spaceCard=true}) => {
  // console.log({ references })
  let to = spaceCard ? 'space' : 'org'
  return (
    <>
      {references?.map((item, index) => (
        <Link to={`/${to}/` + item?.name} className="" key={index}>
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

