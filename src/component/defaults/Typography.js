import React, { forwardRef } from "react"
import { IonText } from "@ionic/react"


const Typography = forwardRef(
  ({ variant = "h2", children, className, ...rest }, ref) => {
    return (
      <IonText ref={ref} {...rest}>
        {variant === "h1" && (
          <h1 className={cn("text-xl", className)}>{children}</h1>
        )}
        {variant === "h2" && <h2 className={className}>{children}</h2>}
        {variant === "h3" && <h3 className={className}>{children}</h3>}
        {variant === "h4" && <h4 className={className}>{children}</h4>}
        {variant === "h5" && <h5 className={className}>{children}</h5>}
        {variant === "h6" && <h6 className={className}>{children}</h6>}
        {variant === "p" && <p className={className}>{children}</p>}
      </IonText>
    )
  }
)

Typography.displayName = "Typography"

export default Typography
