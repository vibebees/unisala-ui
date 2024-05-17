import React, { useEffect } from "react"

import { useDispatch } from "react-redux"
import { getUniData } from "../../../../datasource/store/action"
 import { isSideBar } from "../../../../datasource/store/action/University"

import useDocTitle from "../../../../hooks/useDocTitile"
import { UniversityBuild } from "../organisms/university"
import { PreLoader } from "../../../../components/packages/preloader"
import { NoContentCard } from "@components/packages/NoContentCard"

export const UniversityTemplate = ({ allProps }) => {
  const {
      id,
      loading,
      data,
      UniEmpty,
      campusLifeEmpty,
      libraryEmpty,
      grantsEmpty,
      testScoreEmpty,
      visitWebsiteEmpty,
      professorsEmpty,
      activeTab,
      setActiveTab,
      scrollTop,
      clientHeight,
      handleResize,
      reportEmpty,
      similarCollagesEmpty,
      applicantsEmpty,
      uniData,
      error,
      queryParams,
      interviewExperienceEmpty,
      scholarshipsEmpty,
      studentChargesEmpty,
      statisticsEmpty,
      handleScrolling,
      admissionEmpty
    } = allProps,
    dispatch = useDispatch()

  useDocTitle(id)

  useEffect(() => {
    const currentTab = queryParams.get("tab")
    if (currentTab) {
      setActiveTab(parseInt(currentTab))
    }
  }, [location.search])

  useEffect(() => {
    dispatch(getUniData(data?.getUpdatedSchoolInfo))
  }, [data])

  useEffect(() => {
    dispatch(
      isSideBar({
        reportEmpty,
        similarCollagesEmpty,
        applicantsEmpty,
        libraryEmpty,
        grantsEmpty,
        campusLifeEmpty,
        testScoreEmpty,
        visitWebsiteEmpty,
        professorsEmpty,
        interviewExperienceEmpty,
        scholarshipsEmpty,
        studentChargesEmpty,
        statisticsEmpty,
        admissionEmpty
      })
    )
  }, [
    reportEmpty,
    similarCollagesEmpty,
    applicantsEmpty,
    libraryEmpty,
    grantsEmpty,
    testScoreEmpty,
    visitWebsiteEmpty,
    professorsEmpty,
    interviewExperienceEmpty,
    scholarshipsEmpty,
    statisticsEmpty,
    admissionEmpty
  ])

  useEffect(() => {
    handleScrolling()
  }, [scrollTop, activeTab, clientHeight])

  console.log({data, loading, uniData, error})

  if (loading) {
    return <PreLoader />
  }

  if (!data && !loading) {
    return <NoContentCard  defaultValue="Something is Wrong!"/>
  }
  if (!UniEmpty && uniData) {
    return <UniversityBuild allProps={allProps} />
  }

}
