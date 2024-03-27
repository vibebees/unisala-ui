import {IonToast} from "@ionic/react"
import {forwardRef} from "react"
import {cn} from "utils"

const Card = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonToast ref={ref} className={cn("block ", className)} {...rest}>
      {children}
    </IonToast>
  )
})

Card.displayName = "Toast"

export default Card
