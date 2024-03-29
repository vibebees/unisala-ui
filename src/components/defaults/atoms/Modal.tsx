import React from "react"
import {
  Buttons,
  Content,
  Header,
  Modal,
  Title,
  Toolbar
} from "../index"
import { useState } from "react"
import Button from "./Button"

const CustomModal = ({ ModalButton, ModalData = "No Data", header = "Modal" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {ModalButton}
        </div>
        <Modal
          mode="ios"
          onDidDismiss={() => {
            setIsOpen(false)
          }}
          isOpen={isOpen}
        >
          <Header>
            <Toolbar>
              <Title>{header}</Title>
              <Buttons slot="end">
                <Button
                  className="modal-close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  close
                </Button>
              </Buttons>
            </Toolbar>
          </Header>
          <Content className="ion-padding">{ModalData}</Content>
        </Modal>
      </div>
    </>
  )
}

export default CustomModal
