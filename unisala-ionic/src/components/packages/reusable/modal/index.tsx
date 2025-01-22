import React, { FC, useEffect, useState } from "react";
import {
  Buttons,
  Button,
  Modal,
  Header,
  Toolbar,
  Title,
} from "../../../defaults";
import { trackEvent } from "@components/analytics";
import { useAuth } from "@context/AuthContext";

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
  const {user} = useAuth();
  useEffect(() => {
    isOpen && trackEvent({
      action: "open_add_a_comment_modal",
      category: "engagment",
      label: 'modal_opened_by_'+user?.id,
      value: 1,
    });
  }, [isOpen]);
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
            trackEvent({
              action: "close_add_a_comment_modal",
              category: "engagment",
              label: 'modal_closed_by_'+user?.id,
              value: 1,
            })
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
