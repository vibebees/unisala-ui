import React from "react"
import ImageWithLoader from "../../reusable/Image/ImageWithLoader"
import { IonCard, IonText, IonCol, IonRow } from "@ionic/react"
import ActionButton from "./ActionButton"
import { URLupdate } from "utils/lib/URLupdate"
import { useHistory } from "react-router"

const SingleList = ({ _id, description, title, isMyProfile = false }) => {
  const history = useHistory()
  return (
    <IonCard className="mx-0 group">
      <IonRow>
        <IonCol
          onClick={() => {
            const data = URLupdate("id", _id)
            history.push({ search: data })
          }}
          size="11"
          className="h-16  ion-no-padding ion-no-margin "
        >
          <IonRow className="w-full">
            <IonCol size="auto" className="ion-no-padding ion-no-margin ">
              <ImageWithLoader
                src="https://images.unsplash.com/photo-1612836158869-9d2c3c4d2e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uZXklMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                alt="profile"
                style={{ width: "64px", height: "100%" }}
              />
            </IonCol>
            <IonCol
              style={{ width: "100%" }}
              className="ion-no-padding ml-3 ion-no-margin flex justify-center gap-1 w-full items-start flex-col"
            >
              <IonText>
                <h3 className="text-base font-semibold text-neutral-900">
                  {title}
                </h3>
              </IonText>

              <IonText>
                <p className="text-xs text-gray-500">
                  {description.slice(0, 20)}...
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonCol>
        {isMyProfile && (
          <IonCol
            size="1"
            className=" items-center flex justify-center border-black"
          >
            <ActionButton _id={_id} />
          </IonCol>
        )}
      </IonRow>
    </IonCard>
  )
}

export default SingleList
