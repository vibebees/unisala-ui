import React, { forwardRef } from "react"
import { IonCol } from "@ionic/react"

const Col = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonCol ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonCol>
  )
})

Col.displayName = "Col"

export default Col
