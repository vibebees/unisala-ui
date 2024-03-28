import { useHistory, useLocation } from "react-router"
import useIsEmpty from "hooks/useIsEmpty"
import { createRef, useState } from "react"

export const getAllProps = ({ id, loading, data, uniData, isSideBar }) => {
  const UniEmpty = useIsEmpty(uniData || {}, "School"),
    reportEmpty = useIsEmpty(uniData?.userEvaluation?.report || {}, "Report"),
    similarCollagesEmpty = useIsEmpty(uniData?.similarSchools || {}),
    applicantsEmpty = useIsEmpty(uniData?.applicants || {}, "Applicants"),
    campusLifeEmpty = useIsEmpty(
      uniData?.userEvaluation?.reviews || {},
      "WordBestDescribe"
    ),
    libraryEmpty = useIsEmpty(uniData?.elevatorInfo?.library || {}, "Library"),
    grantsEmpty = useIsEmpty(uniData?.grants || {}, "Grants"),
    testScoreEmpty = useIsEmpty(uniData?.testScore || {}, "TestScore"),
    visitWebsiteEmpty = useIsEmpty(uniData?.elevatorInfo?.urls || {}, "Urls"),
    professorsEmpty = useIsEmpty(uniData?.professors || {}, "Report"),
    interviewExperienceEmpty = useIsEmpty(
      uniData?.interviewExperience || {},
      "InterviewExperience"
    ),
    scholarshipsEmpty = useIsEmpty(
      uniData?.scholarshipInfo?.scholarships || {},
      "Scholarships"
    ),
    studentChargesEmpty = useIsEmpty(
      uniData?.studentCharges || {},
      "StudentCharges"
    ),
    financialAidEmpty = useIsEmpty(uniData?.financialAid || {}, "FinancialAid"),
    statisticsEmpty = useIsEmpty(uniData?.studentsStats || {}, "Statistics"),
    admissionEmpty = useIsEmpty(uniData?.admissionInfo || {}, "Admission"),
    app = createRef(),
    profile = createRef(),
    statistics = createRef(),
    fees = createRef(),
    admission = createRef(),
    libraries = createRef(),
    grant = createRef(),
    testScore = createRef(),
    similarCollages = createRef(),
    report = createRef(),
    campusLife = createRef(),
    website = createRef(),
    Professors = createRef(),
    interviewExperience = createRef(),
    review = createRef(),
    scholarship = createRef(),
    studentCharges = createRef(),
    financialAid = createRef(),
    [AdmisionAnimate, setAdmissionAnimate] = useState(false),
    [GrantAnimate, setGrantAnimate] = useState(false),
    [LibrariesAnimate, setLibrariesAnimate] = useState(false),
    [createAPostPopUp, setCreateAPostPopUp] = useState(false),
    [appState, setAppState] = useState({
      scrollTop: 0,
      clientHeight: 0
    }),
    history = useHistory(),
    location = useLocation(),
    queryParams = new URLSearchParams(location.search),
    tabFromURL = queryParams.get("tab"),
    [activeTab, setActiveTab] = useState(tabFromURL ? parseInt(tabFromURL) : 0),
    { scrollTop, clientHeight } = appState,
    UniScroll = () => {
      setAppState({
        scrollTop: app?.current?.scrollTop,
        clientHeight: app?.current?.clientHeight
      })
    },
    [width, setWidth] = useState(window.innerWidth),
    handleResize = () => {
      let { innerWidth } = window
      if (width !== innerWidth) {
        setWidth(innerWidth)
      }
    },
    handleScrolling = () => {
      if (
        scholarship?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(0)
      }
      if (
        studentCharges?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(1)
      }
      if (
        admission?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(2)
      }
      if (
        financialAid?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(3)
      }
      if (
        statistics?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(4)
      }

      if (
        libraries?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(5)
      }

      if (
        testScore?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(6)
      }
      if (
        report?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(7)
      }
      if (
        campusLife?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(8)
      }
      if (
        website?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(8)
      }
      if (
        Professors?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(9)
      }
      if (
        similarCollages?.current?.offsetTop <=
        scrollTop - profile?.current?.clientHeight
      ) {
        setActiveTab(10)
      }
    }

  return {
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
    studentChargesEmpty,
    statisticsEmpty,
    app,
    profile,
    statistics,
    fees,
    libraries,
    grant,
    testScore,
    similarCollages,
    report,
    campusLife,
    website,
    Professors,
    scholarship,
    studentCharges,
    AdmisionAnimate,
    setAdmissionAnimate,
    GrantAnimate,
    setGrantAnimate,
    LibrariesAnimate,
    setLibrariesAnimate,
    appState,
    setAppState,
    activeTab,
    setActiveTab,
    scrollTop,
    clientHeight,
    UniScroll,
    width,
    setWidth,
    handleResize,
    reportEmpty,
    similarCollagesEmpty,
    applicantsEmpty,
    uniData,
    history,
    queryParams,
    interviewExperience,
    review,
    interviewExperienceEmpty,
    scholarshipsEmpty,
    financialAidEmpty,
    financialAid,
    handleScrolling,
    reportDataSource: uniData?.report,
    campusPollDataSource: uniData?.students?.campusLife?.poll,
    isSideBar,
    testScoreDataSource: uniData?.testScore,
    admissionEmpty,
    admission,
    createAPostPopUp,
    setCreateAPostPopUp
  }
}
