import { ExploreIcon, HomeIcon, MessageIcon, PeopleIcon } from './components/packages/icons/index';

import { jwtDecode } from "jwt-decode"
import { useRef, useState } from "react"
// import { useSelector, useDispatch } from "react-redux"

export default function AppProps() {
  const popover = useRef(null),
    [ popoverOpen, setPopoverOpen ] = useState(false),
    navigation = [
      {
        name: "Home",
        Icon: HomeIcon,
        link: "/home"
      },
      {
        name: "Explore Universities",
        Icon: ExploreIcon,
        link: "/search?tab=uni"
      },
      {
        name: "My Network",
        Icon: PeopleIcon,
        link: "/mynetwork"
      },
      {
        name: "Messages",
        Icon: MessageIcon,
        link: "/messages",
        count: 0
      }
      // {
      //     name: "Notification",
      //     icon: notifications,
      //     link: "/notifications"
      // }
    ],
    [ active, setActive ] = useState(""),
    { refreshToken = "", accessToken = "" } = {},
    decode = accessToken && jwtDecode(accessToken),
    width = window.innerWidth,
    [ createAPostPopUp, setCreateAPostPopUp ] = useState(false),
    [ activeNavDrop, setActiveNavDrop ] = useState({
      profile: false,
      message: false,
      notification: false
    }),
    dispatch = () => { }

  return {
    popover,
    popoverOpen,
    setPopoverOpen,
    navigation,
    active,
    setActive,
    refreshToken,
    accessToken,
    decode,
    width,
    createAPostPopUp,
    setCreateAPostPopUp,
    activeNavDrop,
    setActiveNavDrop,
    dispatch
  }
}
