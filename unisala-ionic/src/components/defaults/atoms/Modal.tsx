import React, { FC } from "react";
import { Buttons, Content, Header, Modal, Title, Toolbar } from "../index";
import { useState } from "react";

interface ICustomModal {
  children: React.ReactNode;
  ModalData?: React.ReactNode;
  header?: string;
  ModalButton?: React.ReactNode;
}

const CustomModal: FC<ICustomModal> = ({
  ModalButton,
  ModalData = "No Data",
  header = "Modal",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {children || ModalButton}
        </div>
        <Modal
          mode="ios"
          onDidDismiss={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
        >
          <Header>
            <Toolbar>
              <Title>{header}</Title>
              <Buttons slot="end">
                <Buttons
                  className="modal-close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  close
                </Buttons>
              </Buttons>
            </Toolbar>
          </Header>
          <Content className="ion-padding">{ModalData}</Content>
        </Modal>
      </div>
    </>
  );
};

export default CustomModal;
