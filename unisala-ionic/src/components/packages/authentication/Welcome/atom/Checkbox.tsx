import React, { useContext } from "react";
import { IonCheckbox, IonRow } from "@ionic/react";

const Checkbox = ({
  isChecked = false,
  value = false,
  handleClick,
  label = "",
}) => {
  return (
    <IonRow class="gap-2 items-center  flex-nowrap ">
      <IonCheckbox
        className="shrink-0 mt-1"
        checked={isChecked}
        value={value}
        onClick={handleClick}
      >
        {label}
      </IonCheckbox>
      {/* <label className="text-sm  font-medium text-neutral-600">{label}</label> */}
    </IonRow>
  );
};

export default Checkbox;
