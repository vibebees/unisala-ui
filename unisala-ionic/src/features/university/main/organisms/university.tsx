import React, { useEffect, useState } from "react"
import { IonContent } from "@ionic/react"
import Discussion from "../../discussion"
import Review from "../../discussion/Post"
import { HeaderNavigator } from "../molecules/headerNavigator"
import { SideNavigator } from "../molecules/sideNavigator"
import { UniversityHeader } from "../molecules/header"
import CreateAPostCard from "@components/packages/createAPost/template"
import Tabs from "../molecules/Tabs"
import { useHistory } from "react-router"
import { trackEvent } from "@components/analytics"
import { useAuth } from "@context/AuthContext"

export const UniversityBuild = ({ allProps }) => {
  const { data, app, profile, UniScroll } = allProps
  const params = new URLSearchParams(window.location.search)
  const history = useHistory()
  const q = params.get("tab")
  const {user} = useAuth();

  if (!q) {
    params.set("tab", "g")
    history.push({
      search: params.toString()
    })
  }

  useEffect(() => {
    trackEvent({
      action: "Uni_page_viewed_by_"+ user?.id,
      category: "navigation",
      label: data?.getUpdatedSchoolInfo?.elevatorInfo?.name
    })
  }, [])
  return (
    <div
    className="w-full">
      <section
        ref={app}
        onScroll={() => {
          UniScroll()
        }}
        style={{
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {/* {loading && <h1>loading</h1>} */}
        <HeaderNavigator allProps={allProps} />
          <div ref={profile} className="mb-2">
            <UniversityHeader allProps={allProps} />
          </div>

        <Tabs />

          <CreateAPostCard
            allProps={{
              ...allProps,
              unitId: data?.getUpdatedSchoolInfo?.elevatorInfo?.unitId
            }}
          />

          {q === "g" ? (
            <SideNavigator allProps={allProps} />
          ) : (
            <div >
              <Review
                uniId={data?.getUpdatedSchoolInfo?.elevatorInfo?.unitId}
              />
            </div>
          )}
      </section>
      </div>
  )
}
