import { useMutation } from "@apollo/client"
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
  useIonToast
} from "@ionic/react"
import {EditSpace} from "graphql/user"
import React, { useEffect, useRef, useState } from "react"
  import { useHistory } from "react-router"
import {USER_SERVICE_GQL} from "servers/types"

const UpdateSpace = ({ spaceDetails, setIsOpen }) => {
  const [editSpaceDetails, setEditSpaceDetails] = useState(spaceDetails)
  const [present, dismiss] = useIonToast()

  const nameRef = useRef(spaceDetails?.name)
  const descRef = useRef(spaceDetails?.description)
  const history = useHistory()
  const [editSpaceCategoryById] = useMutation(EditSpace, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data?.editSpaceCategoryById?.status.success) {
        setIsOpen(false)

        setTimeout(() => {
          history.push(
            `/space/${data?.editSpaceCategoryById?.spaceCategory?.name}`
          )
        }, 100)
      } else {
        present({
          duration: 3000,
          message: data?.editSpaceCategoryById?.status?.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editSpaceCategoryById({
      variables: {
        id: editSpaceDetails?._id,
        name: nameRef?.current?.value,
        description: descRef?.current?.value
      }
    })
  }

  return (
    <IonContent>
      <form action="" className="p-4">
        <IonRow>
          <IonCol>
            <IonLabel>
              Name <span className="text-[red]">*</span>
            </IonLabel>
            <IonInput
              type="text"
              placeholder="Name of your space"
              fill="outline"
              required
              value={spaceDetails?.name}
              color="dark"
              ref={nameRef}
              className="mt-2  border border-black w-full "
              name="name"
            ></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>
              Description
              <span className="ml-1 text-xs font-500 text-gray-700">
                ( Describe about your space in short)
              </span>
            </IonLabel>
            <IonInput
              color="dark"
              type="text"
              fill="outline"
              placeholder="This space is about ....."
              className="mt-2 text-sm border border-black  w-full"
              ref={descRef}
              name="description"
              value={spaceDetails.description}
            ></IonInput>
          </IonCol>
        </IonRow>

        <IonButton type="button" onClick={handleSubmit} className="mt-4">
          Update
        </IonButton>
      </form>
    </IonContent>
  )
}

export default UpdateSpace
