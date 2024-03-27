import {IonInput} from "@ionic/react"
import {forwardRef} from "react"
import {cn} from "utils"

const Button = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonInput ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonInput>
  )
})

Button.displayName = "Input"

export default Button
