import React, { forwardRef } from "react"
import { IonGrid } from "@ionic/react"
import { cn } from "utils"

const Grid = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonGrid ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonGrid>
  )
})

Grid.displayName = "Grid"

export default Grid
