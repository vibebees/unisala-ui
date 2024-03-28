import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonPopover,
  IonTitle,
  IonToolbar,
  useIonToast
} from "@ionic/react"
import { create, ellipsisHorizontalOutline, trash } from "ionicons/icons"
import { useSelector } from "react-redux"
import { DeleteSpace } from "@graphql/user"
import { USER_SERVICE_GQL } from "servers/types"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router"
import { useState } from "react"
import UpdateSpaceForm from "component/updateSpace/UpdateSpaceForm"
import SpaceHeaderImg from "assets/space-header.jpg"
import "./Space.css"

const linearGradientStyle = {
  background: "linear-gradient(90deg, rgba(0,0,0) 20%, rgba(99,96,96,1) 62%)"
}

const SpaceHeader = ({ spaceDetails }) => {
  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  //   the user who created this space
  const { user } = spaceDetails || {}
  const [present, dismiss] = useIonToast()
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  //  delete space
  const [deleteSpace] = useMutation(DeleteSpace, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: spaceDetails?._id },
    onCompleted: (data) => {
      if (data?.deleteSpaceCategoryById?.success) {
        present({
          duration: 5000,
          className: "text-white font-bold",
          message: "Space has been deleted successfully",
          buttons: [
            {
              text: "X",
              handler: () => {
                dismiss()
              }
            }
          ],
          color: "primary",
          mode: "ios"
        })

        setTimeout(() => {
          history.push("/home")
        }, 100)
      } else {
        present({
          duration: 3000,
          message: "Error occured while deleting the space.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  })

  const OptionsEditSpace = () =>
    loggedinUser?.username === user?.username && (
      <>
        <IonButton className="popover-button" fill="clear" id="popover-trigger">
          <IonIcon icon={ellipsisHorizontalOutline} />
        </IonButton>
        <IonPopover trigger="popover-trigger" triggerAction="click" size="auto">
          <IonContent className="popover-content">
            <IonButton
              expand="full"
              fill="clear"
              onClick={() => setIsOpen(!isOpen)}
            >
              <IonIcon slot="start" icon={create} />
              Update Space
            </IonButton>
            <IonButton expand="full" fill="clear" onClick={deleteSpace}>
              <IonIcon slot="start" icon={trash} />
              Delete Space
            </IonButton>
          </IonContent>
        </IonPopover>

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="modal-title">Update Your Space</IonTitle>
              <IonButton
                onClick={() => setIsOpen(false)}
                slot="end"
                fill="clear"
              >
                Close
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <UpdateSpaceForm spaceDetails={spaceDetails} setIsOpen={setIsOpen} />
        </IonModal>
      </>
    )

  return (
    <IonCard className="ion-no-margin rounded-b-xl ">
      <IonCardHeader>
        <img
          className="profile-header-img"
          src={spaceDetails?.image || SpaceHeaderImg}
          alt={`${spaceDetails?.name} Header`}
          style={{ height: "auto", maxWidth: "100%", borderRadius: "10px" }}
        />
      </IonCardHeader>

      <div className="profile-header-gradient ">
        <h2 className="space-name">{spaceDetails?.name}</h2>
        <p className="space-description" style={{ fontSize: "16px" }}>
          {spaceDetails?.description}
        </p>
        <OptionsEditSpace />
      </div>
    </IonCard>
  )
}

export default SpaceHeader
