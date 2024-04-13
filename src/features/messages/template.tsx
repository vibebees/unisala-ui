// eslint-disable-next-line no-use-before-define
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import { Communicators } from "./chatList"
import { MessagingStation } from "./chats"
import useDocTitle from "../../hooks/useDocTitile"
import "./index.css"
import { MESSAGE_SERVICE_GQL, USER_SERVICE_GQL } from "../../datasource/servers/types"
import { ConnectedList, getFriends, getMessagesByIdGql } from "../../datasource/graphql/user"
import { useQuery, useApolloClient } from "@apollo/client"
import { useRef, useEffect, useState } from "react"
import { messageSocket } from "../../datasource/servers/endpoints"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import {
  getSenderAndReceiver,
  updateChatMessages,
  updatedRecentMessages
} from "../../utils"
import {
  setMyNetworkRecentMessages,
  updateUnreadMessages
} from "../../datasource/store/action/userProfile"
import { addSeenEye, removeSeenEye } from "../../datasource/store/action/userActivity"
import { userInfo } from "../../utils/cache"
// import notificationSound from "assets/sounds/notification.mp3"
// import sendingSound from "assets/sounds/sending.mp3"
const index = () => {
  useDocTitle("Messages")
  const windowWidth = window.innerWidth,
    socket = useRef(),
    chatbox = useRef(null),
    { messagingTo } = useSelector((state) => state?.userActivity),
    user = userInfo,
    username = user?.username,
    { loading, error, data } =
      (messagingTo?.id &&
        useQuery(getMessagesByIdGql, {
          variables: {
            // currentUser
            senderId: user?.id,
            receiverId: messagingTo?.id
          },
          context: { server: MESSAGE_SERVICE_GQL },
          nextFetchPolicy: "cache-first"
        })) ||
      {},
    scrollBottom = () => {
      if (chatbox.current) {
        chatbox.current.scrollTop = chatbox.current.scrollHeight
      }
    },
    myNetwork =
      useQuery(ConnectedList, {
        context: { server: USER_SERVICE_GQL },
        variables: { userId: user?.id },
        skip: !user?.id

      }) || {},
    { connectedList } = myNetwork?.data || {},
    { connectionList } = connectedList || [],
    [connectionListWithMessage, setConnectionListWithMessage] = useState([]),
    [messages, setMessages] = useState(
      data?.getMessagesById?.[0]?.messages || []
    ),
    { messageUpdated } = useSelector((state) => state?.userActivity),
    client = useApolloClient(),
    { recentMessages } = useSelector((store) => store?.userProfile),
    props = {
      socket,
      chatbox,
      user,
      messagingTo,
      scrollBottom,
      connectionList,
      messages,
      recentMessages,
      dispatch: useDispatch()
    },
    chatListView = () => <Communicators {...props} />,
    chatView = () => <MessagingStation {...props} />,
    handleView = () => {
        return (
          <IonRow>
            <IonCol>{chatListView()}</IonCol>

            <IonCol className="messages-wrapper">{chatView()}</IonCol>
          </IonRow>
        )

    },
    dispatch = useDispatch()
  useEffect(() => {}, [connectionListWithMessage])
  useEffect(() => {
    if (connectionList?.length > 0) {
      socket.current = messageSocket()
      socket.current.emit("queryRecentMessageForNetwork", {
        userId: user?.id,
        connectedList: connectionList.map((o) => {
          return {
            senderId: user?.id,
            receiverId: o?.user?.id
          }
        })
      })

      socket.current.on(
        "fetchRecentMessageForNetwork",
        (recentMessagesWithNetwork) => {
          const mergedData =
            connectionList.map((conn) => {
              const userId = conn?.user?.id
              if (!userId) return ""
              const userMessages = recentMessagesWithNetwork.filter(
                (msg) => msg?.senderId === userId || msg?.receiverId === userId
              )
              return { ...conn, recentMessage: userMessages?.[0] }
            }) || []
          dispatch(setMyNetworkRecentMessages(mergedData))
        }
      )
    }
  }, [connectionList])
  useEffect(() => {
    setMessages(data?.getMessagesByIdGql[0]?.messages)
    scrollBottom()
  }, [username, data])

  useEffect(() => {
    // messageUpdated && refetch()
  }, [messageUpdated])

  useEffect(() => {}, [chatbox.current, chatbox])

  useEffect(() => {
    socket.current = messageSocket()

    socket.current.on("getMessage", (data) => {
      console.log("message received", data)
      // setTypingMessage(data)
      updateChatMessages({ newMessage: data, client, user })
      //also need to update the last message on chat list
      updatedRecentMessages({
        newMessage: data,
        user,
        recentMessages,
        dispatch,
        setMyNetworkRecentMessages
      })
    })
    socket.current.on("messageRead", (seenMsg) => {
      dispatch(addSeenEye(seenMsg.receiverId))
    })

    socket.current.on("connect", (msg) => {
      console.log("connected")
    })
    socket.current.emit("joinRoom", {
      senderId: user?.id,
      receiverId: messagingTo?.id
    })
    socket.current.on("joinedRoom", (roomName) => {
      console.log("joined room", roomName)
    })
    return () => {
      socket.current.disconnect()
      console.log("Socket disconnected")
    }
  }, [])

  useEffect(() => {
    socket?.current?.emit("addUser", { userId: user?.id, user })
    socket?.current?.on("getUser", (allUsers) => {})
  }, [])
  return (
    <IonGrid className="max-width-container">{handleView()}</IonGrid>

  )
}

export default index
