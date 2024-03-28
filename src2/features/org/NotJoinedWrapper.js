import React from "react"
import { useIonToast } from "@ionic/react"

const NotJoinedWrapper = ({
  isJoined,
  children,
  message = "Please join the organization to perform this action"
}) => {
  const [present, dismiss] = useIonToast()
  const onClick = () => {
    if (!isJoined) {
      return present({
        duration: 3000,
        message: message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  }

  return isJoined ? (
    <div onClick={onClick}>{children}</div>
  ) : (
    <div onClick={onClick}>
      <div style={{ pointerEvents: "none", opacity: 0.5 }}>{children}</div>
    </div>
  )
}

export default NotJoinedWrapper
