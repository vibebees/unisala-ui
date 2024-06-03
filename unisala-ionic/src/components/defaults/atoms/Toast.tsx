import {IonToast} from "@ionic/react"
import {forwardRef} from "react"

const Toast = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonToast ref={ref} className={cn("block ", className)} {...rest}>
      {children}
    </IonToast>
  )
})

Toast.displayName = "Toast"

export default Toast
