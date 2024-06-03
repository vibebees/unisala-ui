import React, { forwardRef } from "react";
import { IonText } from "@ionic/react";

const CustomText = forwardRef(({ className, ...rest }, ref) => {
  return <IonText ref={ref} className={className} {...rest} />;
});

CustomText.displayName = "CustomText";

export default CustomText;
