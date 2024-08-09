import React, { useState } from "react";
// import { trackEvent } from "@components/analytics";
// import { useAuth } from "@context/AuthContext";


const ModalCustom = () => {
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
     
    </>
  );
};

export default ModalCustom;