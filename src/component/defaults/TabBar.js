import React, { forwardRef } from "react";
import { IonTabBar } from "@ionic/react";
import { cn } from "utils";

const CustomTabBar = forwardRef(({ className, ...rest }, ref) => {
  return (
    <IonTabBar ref={ref} className={cn("custom-tab-bar-class", className)} {...rest} />
  );
});

CustomTabBar.displayName = "CustomTabBar";
export default CustomTabBar;
