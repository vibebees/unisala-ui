import React from "react"
import { useSelector } from "react-redux"
import Layout from "../../pages/layout"
import { ContactList } from "./contactList"
import Template from "./template"
import WhatsApp from "./whatsapp/Chat"
const Message = () => {
    const { recentMessages } = useSelector((store) => store?.userProfile)

    return <Template />
}

export default Message
