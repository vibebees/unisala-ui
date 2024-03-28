import { IonAvatar, IonItem, IonLabel, IonText } from "../../../component/defaults"
import React from "react"
import { Link } from "react-router-dom"

const YourSpaces = ({ data }) => {
  return (
    Array.isArray(data) &&
    data.map((item) => (
      <Link key={item._id} to={`/space/${item.name}`}>
        <IonItem
          className="max-w-[250px]"
          fill="solid"
          style={{
            "--background": "white",
            "--background-hover": "#eee"
          }}
        >
          <IonAvatar slot="start">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/2000px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
              }
            />
          </IonAvatar>
          <IonLabel className="ion-text-wrap">
            <h2 className="capitalize">{item.name}</h2>
          </IonLabel>
        </IonItem>
      </Link>
    ))
  )
}

export default YourSpaces
