/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useContext, useState } from "react"
import { authInstance } from "api/axiosInstance"
import { userServer } from "servers/endpoints"
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
  closeOutline
} from "ionicons/icons"
import { IonIcon, IonActionSheet, useIonToast } from "@ionic/react"
import { ListContext } from ".."
import Modal from "component/Reusable/Modal"
import CreateListModal from "./CreateListModal"
const ActionButton = ({ _id }) => {
  const { setLists, lists } = useContext(ListContext)
  const [isOpen, setIsOpen] = useState(false)
  const [present, dismiss] = useIonToast()

  const deleteList = async () => {
    try {
      const res = await authInstance.delete(`${userServer}/delete-list/${_id}`)
      if (res.data.success) {
        setLists((prev) => prev.filter((list) => list._id !== _id))
        present({
          message: "List deleted successfully",
          duration: 2000,
          color: "success",
          buttons: [{ text: "Done", handler: () => dismiss() }]
        })
      } else {
        present({
          message: "List could not be deleted",
          duration: 2000,
          color: "danger",
          buttons: [{ text: "Done", handler: () => dismiss() }]
        })
      }
    } catch (error) {
      present({
        message: "List could not be deleted",
        duration: 2000,
        color: "danger",
        buttons: [{ text: "Done", handler: () => dismiss() }]
      })
    } finally {
      setIsOpen(false)
    }
  }

  const handleAction = async (action) => {
    switch (action) {
      case "pin":
        break
      case "edit":
        const btn = document.querySelector(".modalbutton")
        btn.click()
        break
      case "delete":
        await deleteList()
        break
      case "cancel":
        break
      default:
        break
    }
  }
  return (
    <div>
      <Modal
        ModalButton={<div className="absolute w-0 h-0 -z-50 modalbutton"></div>}
        header="Edit List"
        ModalData={
          <CreateListModal
            editList={true}
            list={lists.filter((item) => item._id === _id)[0]}
          />
        }
      />
      <IonIcon
        onClick={() => setIsOpen(true)}
        id="open-action-sheet"
        className="text-xl border p-1 opacity-0 active:opacity-100 focus:opacity-100 active:bg-neutral-100 group-hover:opacity-100 duration-200 transition-opacity ease-linear rounded-full border-neutral-300 cursor-pointer"
        icon={ellipsisVerticalOutline}
      />

      <IonActionSheet
        isOpen={isOpen}
        header="List Actions"
        onDidDismiss={(result) => {
          handleAction(result?.detail?.data?.action).then(() => {
            setIsOpen(false)
          })
        }}
        buttons={[
          {
            text: "Edit List",
            icon: pencilOutline,
            data: {
              action: "edit"
            }
          },
          {
            text: "Delete List",
            role: "destructive",
            icon: trashOutline,
            data: {
              action: "delete"
            }
          },

          {
            text: "Cancel",
            role: "cancel",
            icon: closeOutline,
            data: {
              action: "cancel"
            }
          }
        ]}
      ></IonActionSheet>
    </div>
  )
}

export default ActionButton
