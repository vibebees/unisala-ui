import React from "react"
import { useSelector } from "react-redux"
import { Avatar } from "../../../defaults"
import { userInfo } from "../../../../utils/cache"

const FormAvatar = () => {
  const { user } = userInfo
  return (
    <div className="thread-header gap-2">
      <div className="thread_profile-pic ">
        <Avatar
          profilePic={user.profilePic}
          username={user.firstName + user.lastName}
        />
      </div>
      <div className="thread_userdetails ">
        <h3
          style={{
            color: "#222428",
            fontSize: "14px",
            textTransform: "capitalize"
          }}
        >
          {user.firstName + " " + user.lastName}
        </h3>
        <div className="threads_username h-fit">
          <p style={{ fontSize: "12px" }}>@{user.username}</p>
        </div>
      </div>
    </div>
  )
}

export default FormAvatar
