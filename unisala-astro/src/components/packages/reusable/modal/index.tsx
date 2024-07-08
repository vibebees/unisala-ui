import React, {  useEffect, useState } from "react";
// import { trackEvent } from "@components/analytics";
// import { useAuth } from "@context/AuthContext";

interface ModalCustomProps {
  children: React.ReactNode;
  ModalData: React.ReactNode;
  header?: string;
}

const ModalCustom = ({
  children,
  ModalData,
  header = "Modal",
}) => {
  const [isOpen, setIsOpen] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     isOpen && trackEvent({
//       action: "open_add_a_comment_modal",
//       category: "engagment",
//       label: 'modal_opened_by_' + user?.id,
//       value: 1,
//     });
//   }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // trackEvent({
    //   action: "close_add_a_comment_modal",
    //   category: "engagment",
    //   label: 'modal_closed_by_' + user?.id,
    //   value: 1,
    // });
  };

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {children}
        </div>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{header}</h2>
                <button className="modal-close-btn" onClick={handleClose}>
                  Close
                </button>
              </div>
              <div className="modal-body">
                {ModalData}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalCustom;