import React, { forwardRef } from "react";
import { IonBadge } from "@ionic/react";
import { cn } from "utils";

const CustomBadge = forwardRef(({ className, ...rest }, ref) => {
  return (
    <IonBadge ref={ref} className={cn("custom-badge-class", className)} {...rest} />
  );
});

CustomBadge.displayName = "CustomBadge";

export default CustomBadge;
