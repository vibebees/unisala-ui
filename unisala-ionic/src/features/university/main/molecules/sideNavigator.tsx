import SideDetails from "../../sideDetails"

export const SideNavigator = ({ allProps }) => {
  const {
    data,
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
    studentCharges,
    scholarship,
    AdmisionAnimate,
    GrantAnimate,
    LibrariesAnimate,
    appState,
    activeTab,
    UniScroll,
    interviewExperience,
    similarCollagesEmpty,
    scholarshipsEmpty,
    StudentChargesEmpty,
    financialAidEmpty,
    financialAid,
    statisticsEmpty,
    admissionEmpty,
    admission
  } = allProps

  return (
    <SideDetails
      forwardedRef={{
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
        interviewExperience,
        similarCollagesEmpty,
        scholarshipsEmpty,
        StudentChargesEmpty,
        financialAidEmpty,
        financialAid,
        statisticsEmpty,
        admissionEmpty,
        admission
      }}
      admissionAnimate={AdmisionAnimate}
      grantAnimate={GrantAnimate}
      activeTab={activeTab}
      librariesAnimate={LibrariesAnimate}
      UniScroll={UniScroll}
      appState={appState}
      unitId={data?.getSchoolInfo?.unitId}
      allProps={allProps}
    />
  )
}
