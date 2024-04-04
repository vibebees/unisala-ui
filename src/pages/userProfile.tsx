import React from "react"
import UserProfile from "../features/profilePage"
import Layout from "./layout"
const UserProfilePage = () => {
    return <Layout
        mainContent={<UserProfile />}
    />


}
export default UserProfilePage
