import React from "react"
import { receiptOutline, addOutline } from "ionicons/icons"
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonActionSheet,
  useIonToast
} from "@ionic/react"
import { authInstance } from "api/axiosInstance"
import { userServer } from "servers/endpoints"
import CreateListModal from "component/List/atoms/CreateListModal"
import Modal from "component/Reusable/Modal"
import { useSelector } from "react-redux"
const AddToList = ({ allProps }) => {
  const { link, showAddList = true, unitId = null } = allProps
  const { user } = useSelector((state) => state.userProfile)
  const [isOpen, setIsOpen] = React.useState(false)
  const [lists, setLists] = React.useState([])
  const [present] = useIonToast()
  const getAllLists = async () => {
    const res = await authInstance.get(`${userServer}/get-all-list/${user._id}`)
    if (res.data.success) {
      let newData = res.data.data.map((list) => {
        return {
          text: list.title,
          icon: receiptOutline,
          data: {
            action: "add",
            listId: list._id
          }
        }
      })
      if (newData.length === 0) {
        newData.unshift({
          text: "No List Found",
          data: {
            action: "nothing"
          }
        })
      }

      setLists(newData)
    }
  }

  const AddToList = async (listId) => {
    try {
      const res = await authInstance.patch(
        `${userServer}/update-list/${listId}`,
        {
          type: "add",
          unitId: unitId
        }
      )
      if (res.data.success) {
        present({
          message: "Successfully Added to List",
          duration: 2000,
          color: "success"
        })
      }
    } catch (error) {
      present({
        message: error?.response?.data?.message || "Something went wrong",
        duration: 2000,
        color: "danger"
      })
    }
  }

  React.useEffect(() => {
    getAllLists()
  }, [])

  const handleAction = (e) => {
    const { action, listId } = e.detail.data
    if (action === "add") {
      AddToList(listId)
      return setIsOpen(false)
    } else if (action === "create") {
      const btn = document.querySelector(".createlistbutton")
      btn.click()
    }
  }

  return (
    <IonItem
      lines="none"
      onClick={() => setIsOpen(true)}
      button
      id="nested-trigger"
      className="ion-no-margin hover:bg-opacity-70  ion-no-padding"
    >
      <Modal
        ModalButton={
          <div className="h-0 w-0 absolute -z-40 createlistbutton"></div>
        }
        header="Create a List"
        ModalData={<CreateListModal />}
      />
      <IonIcon
        style={{ fontSize: "25px" }}
        slot="start"
        icon={receiptOutline}
      />
      <IonLabel>Add to List</IonLabel>
      <IonActionSheet
        isOpen={isOpen}
        header="Your Lists"
        buttons={lists}
        onDidDismiss={handleAction}
      ></IonActionSheet>
    </IonItem>
  )
}

export default AddToList
