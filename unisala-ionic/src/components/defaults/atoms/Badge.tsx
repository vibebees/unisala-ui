import React, { forwardRef } from "react";
import { IonBadge } from "@ionic/react";

const CustomBadge = forwardRef(({ className, ...rest }, ref) => {
  return (
    <IonBadge ref={ref} className={cn("custom-badge-class", className)} {...rest} />
  );
});

CustomBadge.displayName = "CustomBadge";

export default CustomBadge;
