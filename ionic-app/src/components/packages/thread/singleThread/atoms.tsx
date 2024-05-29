import { IonButton, IonIcon } from "@ionic/react"


export const Button = ({ onClick, className, fill, size, children, style }) => (
  <IonButton fill={fill} className={className} size={size} onClick={onClick} style={style}>
    {children}
  </IonButton>
)

export const Icon = ({ icon, className }) => (
  <IonIcon icon={icon} className={className} />
)
