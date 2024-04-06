import React from "react"
import { useSelector } from "react-redux"
import Layout from "../../pages/layout"
import { Communicators } from "./chatList"
import Template from "./template"
const Message = () => {
    const { recentMessages } = useSelector((store) => store?.userProfile)

    return <Layout
        mainContent={<Template />}
        // leftSidebar={ <Communicators recentMessages = {recentMessages} />}
    />
}

export default Message
