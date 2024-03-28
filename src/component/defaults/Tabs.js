import React, { forwardRef } from "react";
import { IonTabs } from "@ionic/react";
import { cn } from "utils";

const Tabs = forwardRef(({ className, ...rest }, ref) => {
  return (
    <IonTabs ref={ref} className={cn( className)} {...rest} />
  );
});

Tabs.displayName = "Tabs";

export default Tabs;
