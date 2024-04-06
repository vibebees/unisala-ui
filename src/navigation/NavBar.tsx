import React from "react"
import { useState, useRef, useEffect } from "react"
import {
  IonGrid,
  IonRow,
  IonIcon,
  IonText,
  IonPopover,
  IonBadge
} from "@ionic/react"
import {
  chatbubbles,
  home,
  notifications,
  people,
  personCircle
} from "ionicons/icons"
import { Link } from "react-router-dom"
import ProfilePop from "../components/packages/profilePop"
import { useSelector } from "react-redux"
 import {CustomTrackingLink} from "../components/analytics/LinkTrack"
import { ButtonTrack } from "../components/analytics/ButtonTrack"
import { SearchBar } from "../components/packages/searchBox"

const Nav = ({ allProps }) => {
  const {
    setPopoverOpen = () => {},
    popover,
    decode,
    navigation,
    activeNavDrop,
    active,
    popoverOpen,
    setActive = () => {},
  } = allProps

  const openPopover = (e) => {
      popover.current.event = e
      setPopoverOpen(true)
      let data = {
        from: window.location.pathname,
        timeStamp: new Date().toISOString(),
        description: "Profile button clicked",
        to: "/profile"
      }
      ButtonTrack("Profile button clicked")
    },
    unreadMessagesCount =
      0 || useSelector((state) => state?.userProfile?.unreadMessages?.length)

  useEffect(() => {
    setActive(window.location.pathname)
  }, [])

  return (
    <IonGrid
      style={{
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
        padding: "0px",
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        height: "66px"
      }}
    >
      <IonRow
        style={{
          maxWidth: "1280px",
          marginInline: "auto",
          padding: "0.5rem 1rem 0 1rem"
        }}
        className="flex"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px"
          }}
        >
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
              alt="logo"
              style={{
                width: "45px"
              }}
            />
          </Link>
          <div style={{ width: "100%" }}>
            <SearchBar/>
          </div>
        </div>
        <IonRow
          className="flex-wrap shrink gap-10 max-lg:gap-5 max-[800px]:gap-2"
          style={{ display: "inline-flex" }}
        >
          {decode &&
            navigation.map((item, index) => {
              return (
                <div key={index} style={{ cursor: "pointer" }} className="flex">
                  <CustomTrackingLink
                    to={item?.link}
                    destination={item?.link}
                    customFunction={() => {
                      setActive(`${item?.link}`)
                    }}
                    title={`Clicked on ${item?.name} nav link`}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "3px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <IonIcon
                          style={{
                            fontSize: "25px"
                          }}
                          color={active === item.link ? "dark" : "medium"}
                          icon={item.icon}
                        /> */}
                        <item.Icon
                          fill={active === item.link ? "blue" : "#747372"}
                        />
                        {item.name === "Messages" && item.count > 0 && (
                          <IonBadge>{item.count}</IonBadge>
                        )}
                      </div>

                      <IonText color={active === index ? "dark" : "medium"}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px"
                          }}
                        >
                          {item.name}
                        </p>
                      </IonText>
                    </div>
                  </CustomTrackingLink>
                </div>
              )
            })}

          <div
            onClick={openPopover}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "fit-content",
              gap: "3px",
              cursor: "pointer"
            }}
          >
            <IonIcon
              style={{ fontSize: "25px" }}
              color={active?.includes("@") ? "dark" : "medium"}
              icon={personCircle}
            />

            <IonText color={activeNavDrop.profile ? "dark" : "medium"}>
              <p style={{ margin: 0, fontSize: "14px" }}>My profile</p>
            </IonText>
          </div>
          <IonPopover
            ref={popover}
            isOpen={popoverOpen}
            onDidDismiss={() => {
              setPopoverOpen(false)
            }}
          >
            <ProfilePop allProps={{ ...allProps, authFromPopUp: true }} />
          </IonPopover>
        </IonRow>
      </IonRow>
    </IonGrid>
  )
}

export default Nav
