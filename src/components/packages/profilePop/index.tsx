import React from "react"
import { Icon, Item, Avatar, Label, Buttons } from "../../defaults/index"
import { logOut } from "ionicons/icons"
import "./index.css"
import { Link } from "react-router-dom"
import Authentication from "../authentication/AuthModal"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { clearCache } from "../../../utils/cache"

export const ProfilePop = ({ allProps }) => {
  const {
    setPopoverOpen = () => {},
    setActiveNavDrop = () => {},
    activeNavDrop = {},
    setActive = () => {}
  } = allProps
  const { user = {}, loggedIn = "" } ={ }
  const profilePic = user?.picture

  useEffect(() => {
    if (!loggedIn) {
      setActiveNavDrop({
        profile: !activeNavDrop?.profile
      })
    }
  }, [loggedIn])

  if (!loggedIn) {
    return <Authentication allProps={allProps} />
  }

  return (
    <>
      <Item
          button
          detail={false}
          style={{
            borderBottom: "1px solid #e0e0e0"
          }}
          onClick={() => {
            setPopoverOpen(false)
            setActive("@")
          }}
          lines="none"
        >
          <Avatar slot="start">
            <Avatar username={user.username} profilePic={profilePic} />
          </Avatar>
          <Label>
            <h2
              style={{
                margin: 0
              }}
            >
              {user.username}
            </h2>
          </Label>
        </Item>
      <div className="profile-drop-div">
        <Buttons
          onClick={() => {
            clearCache()
            window.location.reload()
          }}
          className="profile-drop-btn"
          lines="none"
        >
          <Icon slot="start" icon={logOut} />
          <Label color="dark">Log out</Label>
        </Buttons>
      </div>
    </>
  )
}
export default ProfilePop
