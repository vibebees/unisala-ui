import React, { forwardRef } from "react"
import { IonButton } from "@ionic/react"

const Button = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonButton ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonButton>
  )
})

Button.displayName = "Button"

export default Button
