import React, { useState, useRef, useEffect } from "react"
import { IonButton, IonInput, IonIcon } from "@ionic/react"
import { send } from "ionicons/icons"
import { useSelector } from "react-redux"

import { removeSeenEye } from "store/action/userActivity"
export const TypeBox = ({ socket = {}, dispatch = () => {} }) => {
  const [messageInput, setMessageInput] = useState(""),
    { messagingTo } = useSelector((state) => state?.userActivity),
    { user } = useSelector((state) => state?.userProfile),
    inputRef = useRef(),
    sendMessage = (e) => {
      e.preventDefault()
      const data = {
        senderId: user._id,
        receiverId: messagingTo._id,
        message: {
          text: messageInput
        },
        seen: false
      }
      socket.current.emit("createMessage", data)
      dispatch(removeSeenEye(messagingTo._id))
      //   setMessageInput("")
      inputRef.current?.setFocus()
    }
  return (
    <div className="flex">
      <IonInput
        mode="md"
        className="input-box"
        onIonChange={(e) => setMessageInput(e.target.value)}
        placeholder="Message"
        ref={inputRef}
        value={messageInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e)
          }
        }}
      ></IonInput>
      <IonButton type="submit" mode="ios" onClick={sendMessage}>
        <IonIcon icon={send} />
      </IonButton>
    </div>
  )
}
