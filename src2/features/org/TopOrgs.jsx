import { IonAvatar, IonItem } from "@ionic/react"
import { IonTypography } from '../../component/defaults'
import React from "react"
import { Link } from "react-router-dom"
 
const TopOrgs = ({ topOrgs }) => {
  return (
    <>
      {topOrgs?.map((item, index) => (
        <Link to={"/org/" + item?.name} className="" key={index}>
          <IonItem
            className="max-w-[250px]"
            fill="solid"
            style={{
              "--background": "white",
              "--background-hover": "#eee"
            }}
            key={index}
          >
            <IonAvatar slot="start">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/2000px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
                }
              />
            </IonAvatar>
            <IonTypography color="dark" className="capitalize">
              {item.name}
            </IonTypography>
          </IonItem>
        </Link>
      ))}
    </>
  )
}

export default TopOrgs
