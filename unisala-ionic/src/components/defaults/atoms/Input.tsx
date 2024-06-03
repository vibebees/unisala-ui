import { IonInput } from "@ionic/react";
import { forwardRef } from "react";

const Input = forwardRef(({ className, ...rest }, ref) => {
  return (
    <IonInput ref={ref} className={cn("w-fit ", className)} {...rest} />
  );
});

Input.displayName = "Input";

export default Input;
