import { IonIcon } from "@ionic/react"
import { eye } from "ionicons/icons"
export const MessageItem = ({ item, currentUserId, messageSize, index = 0 }) => {
    const isLastSentMessage = index === messageSize && item?.senderId === currentUserId
    return (
      <>
        <div key={index} className="chat-box__msg">
          <div className={`${item?.senderId === currentUserId ? "msg-text-sent" : "msg-text-received"}`}>
            <p>{item?.text}</p>
          </div>
        </div>
        {isLastSentMessage && (
          <div className="chat-box__msg">
            <div className="msg-seen-eye">
              <IonIcon icon={eye} />
            </div>
          </div>
        )}
      </>
    )
  }
