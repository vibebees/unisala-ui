import React from "react"
import { IonIcon, IonCard } from "@ionic/react"
import { pencil, chevronUp, chevronDown } from "ionicons/icons"
import { Link } from "react-router-dom"
import MessageItem from "./MessageItem"
const chatList = [
  {
    id: "1",
    message:
      "Why drag something out when you could get it done in one fell swoop?",
    name: "Sara Hall",
    university: "Tribhuvan University",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  },
  {
    id: "2",
    message: "These are just the first of many shortcuts",
    name: "Ali Khan",
    university: "Harvard University",
    image:
      "https://filmfare.wwmindia.com/thumb/content/2019/aug/hrithikroshanweb1565958352.jpg?width=1200&height=900"
  },
  {
    id: "3",
    message:
      "Lorem ipsum dolor sit amet consec tetur adipisicing elit tetur adipisicing elit.",
    name: "Ram Kumar",
    university: "New York",
    image:
      "https://i.pinimg.com/originals/1d/df/a9/1ddfa98a7e262b691614bc30923a40d5.jpg"
  },
  {
    id: "4",
    message: "Supercharge your Messenger experience",
    name: "Hari Paudel",
    university: "Pokhara University",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-8e8ea0637a05240ab9c8409ff1860ac9-lq"
  }
]
export const MessagePop = () => {
  const [isMessageShow, setIsMessageShow] = React.useState(false)
  const messagePop = React.useRef(null)
  return (
    <IonCard
      ref={messagePop}
      style={{
        transitionDuration: "300ms",
        height: isMessageShow ? messagePop?.current?.scrollHeight : "40px"
      }}
      className="message-pop"
    >
      <div
        onClick={() => {
          setIsMessageShow(!isMessageShow)
        }}
        className="message-pop-head"
      >
        <h6>Messages</h6>
        <div>
          <IonIcon icon={pencil} />
          <IonIcon icon={isMessageShow ? chevronDown : chevronUp} />
        </div>
      </div>
      <div className="messenger-pop-body">
        {chatList.map((item, index) => {
          return (
            <Link
              onClick={() => {
                setIsMessageShow(!isMessageShow)
              }}
              to={`/messages/#${item.id}`}
              key={index}
            >
              <MessageItem {...item} />
            </Link>
          )
        })}
      </div>
    </IonCard>
  )
}
export default MessagePop
