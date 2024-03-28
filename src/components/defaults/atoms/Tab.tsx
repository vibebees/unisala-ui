import React, { forwardRef } from "react";
import { IonTab } from "@ionic/react";

const Tab = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonTab ref={ref} className={cn(className)} {...rest}>
      {children}
    </IonTab>
  );
});

Tab.displayName = "Tab";

export default Tab;
