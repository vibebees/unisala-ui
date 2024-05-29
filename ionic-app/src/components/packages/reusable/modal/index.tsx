import React, { FC, useState } from "react";
import {
  Buttons,
  Button,
  Modal,
  Header,
  Toolbar,
  Title,
} from "../../../defaults";

interface ModalCustomProps {
  children: React.ReactNode;
  ModalData: React.ReactNode;
  header?: string;
}

const ModalCustom: FC<ModalCustomProps> = ({
  children,
  ModalData,
  header = "Modal",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {children}
        </div>
        <Modal
          mode="ios"
          isOpen={isOpen}
          onDidDismiss={() => {
            setIsOpen(false);
          }}
        >
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
          {ModalData}
        </Modal>
      </div>
    </>
  );
};

export default ModalCustom;
