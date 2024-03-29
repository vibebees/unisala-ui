import React, { useEffect, useState } from "react"
import {
  Buttons,
  Button,
  Modal,
  Header,
  Content,
  Toolbar,
  Title
} from  "../../../defaults"

const index = ({ ModalButton, ModalData = "No Data", header = "Modal" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {ModalButton}
        </div>
        <Modal mode="ios" isOpen={isOpen}>
          <Header>
            <Toolbar>
              <Title>{header}</Title>
              <Buttons slot="end">
                <Button
                  className="modal-close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Close
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

export default index
