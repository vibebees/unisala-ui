import React, { forwardRef } from "react";
import { IonSpinner } from "@ionic/react";

const CustomSpinner = forwardRef(({ className, ...rest }, ref) => {
  return <IonSpinner ref={ref} className={className} {...rest} />;
});

CustomSpinner.displayName = "CustomSpinner";

export default CustomSpinner;
