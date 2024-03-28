import React, { forwardRef } from "react";
import { IonIcon } from "@ionic/react";

const CustomIcon = forwardRef(({ className, ...rest }, ref) => {
  return <IonIcon ref={ref} className={className} {...rest} />;
});

CustomIcon.displayName = "CustomIcon";

export default CustomIcon;
