import React, { forwardRef } from "react"
import { IonRow } from "@ionic/react"

const Row = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonRow ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonRow>
  )
})

Row.displayName = "Row"

export default Row
