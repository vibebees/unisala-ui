import React from "react";
// import { IonIcon } from "@ionic/react";
// import { create, trash } from "ionicons/icons";
// import { motion } from "framer-motion";

interface ActionsProps {
  EditAction: () => void;
  DeleteAction: () => void;
}

const Actions = ({ DeleteAction, EditAction }: ActionsProps) => {
  return (
    <div
      className="absolute w-[120px] overflow-hidden right-3 top-6 bg-neutral-50 rounded-md BorderCard px shadow-xl"
    >
      <button
        onClick={() => {
          EditAction();
        }}
        className="w-full py-2  flex justify-center items-center gap-1 text-sm text-gray font-medium hover:bg-neutral-200   hover:text-neutral-900"
      >
        {/* <IonIcon icon={create} className="text-xl" /> */}
        Update
      </button>
      <button
        onClick={() => {
          DeleteAction();
        }}
        className="w-full py-2 flex justify-center items-center gap-1 text-sm text-gray font-medium hover:bg-neutral-200   hover:text-neutral-900"
      >
        {/* <IonIcon icon={trash} className="text-xl" /> */}
        Delete
      </button>
    </div>
  );
};

export default Actions;
