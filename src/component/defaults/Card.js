import React, { forwardRef } from "react"
import { IonCard } from "@ionic/react"
import { cn } from "utils"

const Card = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonCard ref={ref} className={cn("block ", className)} {...rest}>
      {children}
    </IonCard>
  )
})

Card.displayName = "Card"

export default Card
