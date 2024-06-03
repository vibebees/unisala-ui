import React, { forwardRef, Ref } from "react";
import { IonCol } from "@ionic/react";
import { cn } from "../../../utils";

interface ColProps {
  children: React.ReactNode;
  className?: string;
}

// Specify the component props type and the ref type
const Col = forwardRef<HTMLIonColElement, ColProps>(({ children, className, ...rest }, ref) => {
  return (
    <IonCol ref={ref} className={cn(" ", className)} {...rest}>
      {children}
    </IonCol>
  );
});

Col.displayName = "Col";

export default Col;
