import React, { forwardRef } from "react";
import { IonLabel } from "@ionic/react";

const CustomLabel = forwardRef(({ className, ...rest }, ref) => {
  return <IonLabel ref={ref} className={className} {...rest} />;
});

CustomLabel.displayName = "CustomLabel";

export default CustomLabel;
