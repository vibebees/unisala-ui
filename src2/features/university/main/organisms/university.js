import React, { useEffect, useState } from "react"
import { IonContent } from "@ionic/react"
import Discussion from "../../Discussion"
import Review from "../../Discussion/Post"
import { HeaderNavigator } from "../molecules/headerNavigator"
import { SideNavigator } from "../molecules/sideNavigator"
import { UniversityHeader } from "../molecules/header"
import CreateAPostCard from "component/post/template"
import Tabs from "../molecules/Tabs"
import { useHistory } from "react-router"

export const UniversityBuild = ({ allProps }) => {
  const { data, app, profile, UniScroll } = allProps
  const params = new URLSearchParams(window.location.search)
  const history = useHistory()
  const q = params.get("tab")

  if (!q) {
    params.set("tab", "g")
    history.push({
      search: params.toString()
    })
  }
  return (
    <IonContent>
      <section
        ref={app}
        onScroll={() => {
          UniScroll()
        }}
        style={{
          overflow: "auto",
          scrollBehavior: "smooth",
          backgroundColor: "#f5f5f5"
        }}
      >
        {/* {loading && <h1>loading</h1>} */}
        <HeaderNavigator allProps={allProps} />
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div ref={profile} className="mb-2">
            <UniversityHeader allProps={allProps} />
          </div>

          <CreateAPostCard
            allProps={{
              ...allProps,
              unitId: data?.getUpdatedSchoolInfo?.elevatorInfo?.unitId
            }}
          />
          <Tabs />
          {q === "g" ? (
            <SideNavigator allProps={allProps} />
          ) : (
            <div className="w-11/12 mx-auto  lg:w-1/2 ">
              <Review
                uniId={data?.getUpdatedSchoolInfo?.elevatorInfo?.unitId}
              />
            </div>
          )}
        </div>
      </section>
    </IonContent>
  )
}
