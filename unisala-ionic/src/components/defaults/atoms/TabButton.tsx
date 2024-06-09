import React, { forwardRef } from "react";
import { IonTabButton } from "@ionic/react";

const CustomTabButton = forwardRef(({ className, ...rest }, ref) => {
  return <IonTabButton ref={ref} className={className} {...rest} />;
});

CustomTabButton.displayName = "CustomTabButton";

export default CustomTabButton;
