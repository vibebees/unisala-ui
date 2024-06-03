import React, { forwardRef } from "react";
import { IonRouterOutlet } from "@ionic/react";

const CustomRouterOutlet = forwardRef((props, ref) => {
  return <IonRouterOutlet ref={ref} {...props} />;
});

CustomRouterOutlet.displayName = "CustomRouterOutlet";

export default CustomRouterOutlet;
