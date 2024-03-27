/* eslint-disable no-unreachable */
import { getMessagesByIdGql } from "../graphql/user"
import {
  removeIdFromUnreadMessages,
  updateUnreadMessages
} from "../store/action/userProfile"

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const lastMsgWasSentByMe = (message, user) => {
    return message?.senderId === user?._id
  },
  getSenderAndReceiver = (message, user) => {
    let { senderId, receiverId } = message
    // on the sending end, sender is me and receiver is the person I'm messaging
    // on the receiving end, sender is the person I'm messaging and receiver is me
    if (user?._id === receiverId) {
      senderId = user?._id
      receiverId = message?.senderId
    }
    return { senderId, receiverId }
  },
  updatedRecentMessages = ({
    newMessage,
    user,
    recentMessages,
    setMyNetworkRecentMessages,
    dispatch
  }) => {
    const { senderId, receiverId } = getSenderAndReceiver(newMessage, user)

    const updatedRecentMessages = recentMessages?.map((item) => {
      if (item.user._id === receiverId) {
        return {
          ...item,
          recentMessage: newMessage
        }
      }
      return item
    })
    dispatch(setMyNetworkRecentMessages(updatedRecentMessages))
    //here message's sender becomes receiver in my account
    dispatch(updateUnreadMessages(receiverId))
  },
  updateChatMessages = ({
    newMessage,
    client,
    user,
    recentMessages,
    dispatch,
    setMyNetworkRecentMessages
  }) => {
    const { senderId, receiverId } = getSenderAndReceiver(newMessage, user)
    // Read the current messages from the cache
    const currentMessages = client.readQuery({
      query: getMessagesByIdGql,
      variables: {
        senderId: senderId,
        receiverId: receiverId
      }
    })

    // Add the new message to the messages array
    const updatedMessages = currentMessages?.getMessagesByIdGql?.[0]?.messages
      ? [...currentMessages?.getMessagesByIdGql?.[0].messages, newMessage]
      : [newMessage]

    // Write the updated messages back to the cache
    client.writeQuery({
      query: getMessagesByIdGql,
      variables: {
        senderId: senderId,
        receiverId: receiverId
      },
      data: {
        getMessagesByIdGql: [
          {
            ...currentMessages.getMessagesByIdGql[0],
            messages: updatedMessages
          }
        ]
      }
    })
  },
  messageSeen = ({
    messagingTo = {},
    username = "",
    recentMessages = [],
    socket = {},
    user = {},
    dispatch = () => {}
  }) => {
    const seeingMessageFor =
      messagingTo?.username === username ? messagingTo?._id : ""
    dispatch(removeIdFromUnreadMessages(seeingMessageFor))

    if (
      socket?.current?.emit &&
      !lastMsgWasSentByMe(recentMessages?.[0]?.recentMessage, user)
    ) {
      const seenMessage = recentMessages?.filter(
          (item) => item?.user?._id === messagingTo?._id
        )?.[0],
        notSeen = !seenMessage?.recentMessage?.seen
      if (seenMessage?.recentMessage?._id) {
        console.log("triggering message seen")
        socket?.current?.emit("messageSeen", {
          seenMessageId: seenMessage?.recentMessage?._id,
          senderId: seenMessage?.recentMessage?.senderId,
          whoSaw: user?._id,
          receiverId: messagingTo?._id
        })
      }
    }
  }

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
