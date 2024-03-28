import React, { forwardRef } from "react"
import { IonButton } from "@ionic/react"
import { cn } from "utils"

const IonButton = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonButton ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonButton>
  )
})

IonButton.displayName = "Button"

export default IonButton
