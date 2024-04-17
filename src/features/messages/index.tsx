import React from "react"
import { useSelector } from "react-redux"
import Layout from "../../pages/layout"
import { ContactList } from "./contactList"
import Template from "./template"
const Message = () => {
    const { recentMessages } = useSelector((store) => store?.userProfile)

    return <Layout
        mainContent={<Template />}
    />
}

export default Message
