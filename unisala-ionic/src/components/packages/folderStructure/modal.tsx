import React, { useState } from "react"
import {
  Buttons,
  Button,
  Modal,
  Header,
  Content,
  Toolbar,
  Title
} from "../../defaults"

function SeeMoreModal({ ModalButton, ModalData = "No Data", scholarshipName = ""}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {ModalButton}
        </div>
        <Modal isOpen={isOpen}>
          <Header>
            <Toolbar>
            <Title>{scholarshipName}</Title>
              <Buttons slot="end">
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </Buttons>
            </Toolbar>
          </Header>
          <Content className="-padding">{ModalData}</Content>
        </Modal>
      </div>
    </>
  )
}

export default SeeMoreModal
