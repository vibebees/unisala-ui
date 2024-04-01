import React from "react"
import { Avatar, Col, Item } from "../../../defaults"
import { useSelector } from "react-redux"
 import { GalleryIcon } from "../../icons"
import { userInfo } from "../../../../utils/cache"

export const PostCardForClick = () => {
  const { user } = userInfo

  return (
    <div
      style={{
        padding: "2px",
        cursor: "pointer"
      }}
    >
      <Item lines="none">
        <Avatar
          slot="start"
          style={{
            alignSelf: "center"
          }}
        >
          <Avatar username={user?.username} profilePic={user?.picture} />
        </Avatar>
        <input
          type="text"
          placeholder={"suggest univeristy"}
          className="searchInput bg-transparent border-none outline-none"
        />

        <Col size="auto">
          <Item lines="none">
            <GalleryIcon />
          </Item>
        </Col>
      </Item>
    </div>
  )
}
