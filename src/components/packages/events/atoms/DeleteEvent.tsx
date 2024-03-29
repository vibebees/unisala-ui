import React from "react"
import { IonIcon, useIonToast } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { USER_SERVICE_GQL } from "servers/types"
import { DeleteEventById } from "graphql/user"

const DeleteEvent = ({ id }) => {
  const [present, dismiss] = useIonToast()
  const [DeleteEvent] = useMutation(DeleteEventById, {
    context: { server: USER_SERVICE_GQL },
    variables: { eventId: id },
    onCompleted: (data) => {
      if (DeleteEvent?.success) {
        present({
          duration: 3000,
          message: "Successfully deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: DeleteEvent?.message ?? "Can not delete event  ",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  })

  return (
    <div className="bg-neutral-300 hover:bg-neutral-500 duration-300 active:scale-75 w-7 h-7 cursor-pointer  mt-3  mr-3 top-0 right-0 grid place-content-center rounded-full absolute">
      <IonIcon
        onClick={() => DeleteEvent()}
        className="top-0 right-0 text-xl text-white"
        icon={closeOutline}
      />
    </div>
  )
}

export default DeleteEvent
