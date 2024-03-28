// eslint-disable-next-line no-use-before-define
import {
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow
} from "@ionic/react"
import {
  barChartOutline,
  cashOutline,
  desktopOutline,
  homeOutline,
  libraryOutline,
  peopleOutline,
  receiptOutline,
  schoolOutline,
  thumbsUpOutline
} from "ionicons/icons"
import React from "react"

import StatCardTemplate from "component/custom-components/DataStatCard/template/StatCardTemplate"
import StatCardTemplateTwo from "component/custom-components/DataStatCard/template/StatCardTemplateTwo"
import RectangularCard from "component/RectangularCardGrid/template/RectangularCard"
import ImageCard from "component/ScrollableImageCard/template/ImageCard"
import { CardWithCircularGrid } from "component/cardWithCircularGrid"
import FolderStructure from "component/folderStructure"
import { PollCard } from "component/pollCard"
import Professors from "component/professors/template/Professor"
import { ReportCard } from "component/reportCard"
import Interview from "./Interview"
import Ranking from "./Ranking/template"
import { DepartmentRating } from "./departmentRatings"
import Statstics from "./statistics"
import StudentCharges from "./studentCharges"
import VisitWebsite from "./visitWebsite"

const SideDetails = ({
  activeTab,
  forwardedRef,

  allProps
}) => {
  const { isSideBar, uniData } = allProps

  const sideMenu = [
    !isSideBar?.scholarshipsEmpty && {
      title: "Scholarships",
      icon: schoolOutline,
      ref: "scholarship"
    },
    !isSideBar?.StudentChargesEmpty && {
      title: "Student Charges",
      icon: cashOutline,
      ref: "studentCharges"
    },

    !isSideBar?.admissionEmpty && {
      title: "Admission",
      icon: cashOutline,
      ref: "admission"
    },

    !isSideBar?.financialAidEmpty && {
      title: "Aid",
      icon: thumbsUpOutline,
      ref: "financialAid"
    },

    !isSideBar?.statisticsEmpty && {
      title: "Statistics",
      icon: barChartOutline,
      ref: "statistics"
    },
    !isSideBar?.libraryEmpty && {
      title: "Libraries",
      icon: libraryOutline,
      ref: "libraries"
    },
    !isSideBar?.testScoreEmpty && {
      title: "Test Score",
      icon: homeOutline,
      ref: "testScore"
    },
    !isSideBar?.visitWebsiteEmpty && {
      title: "Visit Website",
      icon: desktopOutline,
      ref: "website"
    },
    !isSideBar?.professorsEmpty && {
      title: "Professors",
      icon: peopleOutline,
      ref: "Professors"
    },

    !isSideBar?.similarCollagesEmpty && {
      title: "Similar Collages",
      icon: thumbsUpOutline,
      ref: "similarCollages"
    },
    !isSideBar?.reportEmpty && {
      title: "Report",
      icon: receiptOutline,
      ref: "report"
    },
    !isSideBar?.campusLifeEmpty && {
      title: "Campus Life",
      icon: thumbsUpOutline,
      ref: "campusLife"
    },

    !isSideBar?.interviewExperienceEmpty && {
      title: "Interview Experience",
      icon: receiptOutline,
      ref: "interviewExperience"
    }
  ]
  const [width, setWidth] = React.useState(window.innerWidth)
  const handleResize = () => {
    const { innerWidth } = window

    if (width !== innerWidth) {
      setWidth(innerWidth)
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <IonGrid className={width > 719 ? "ion-padding" : ""}>
      <IonCol
        className=""
        style={{
          display: "flex"
        }}
      >
        {width > 720 && (
          <IonRow className="block" style={{ flexShrink: 0, height: "auto" }}>
            <IonCard
              style={{
                position: "sticky",
                top: "70px"

                // minWidth: "20vw"
              }}
            >
              <IonList>
                {sideMenu.map((item, i) => {
                  return (
                    item.title && (
                      <IonItem
                        style={{
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          forwardedRef.app.current.scrollTo(
                            0,
                            forwardedRef[item.ref].current.offsetTop +
                              forwardedRef.profile.current.clientHeight
                          )
                        }}
                        key={i}
                      >
                        <IonIcon
                          color={activeTab === i ? "primary" : "medium"}
                          icon={item.icon}
                        />
                        <IonLabel
                          color={activeTab === i ? "primary" : "dark"}
                          className="ion-margin-start"
                        >
                          <h2>{item.title}</h2>
                        </IonLabel>
                      </IonItem>
                    )
                  )
                })}
              </IonList>
            </IonCard>
          </IonRow>
        )}
        <IonRow
          className="w-[calc(100%-270px)] block"
          style={{ flex: 1, margin: 0 }}
        >
          <section ref={forwardedRef.scholarship}>
            <FolderStructure
              allProps={{
                folderName: "Scholarships",
                data: uniData?.scholarshipInfo?.scholarships,
                showDetails: true,
                popUp: true
              }}
            />
          </section>
          <section ref={forwardedRef.studentCharges}>
            <StudentCharges />
          </section>

          <section>
            <DepartmentRating ratings={uniData?.departmentRatings} />
          </section>
          <section ref={forwardedRef.admission}>
            <StatCardTemplate
              allProps={{
                data: uniData?.admissionInfo,
                bodyTitle: "Admission"
              }}
            />
          </section>

          <section ref={forwardedRef.financialAid}>
            <RectangularCard
              allProps={{
                data: uniData?.financialAid,
                year: uniData?.financialAid?.year
              }}
            />
          </section>

          <section ref={forwardedRef.statistics}>
            <Statstics />
          </section>

          <section ref={forwardedRef.libraries}>
            <StatCardTemplateTwo
              allProps={{
                data: uniData.elevatorInfo.library,
                bodyTitle: "Libraries"
              }}
            />
          </section>

          <section ref={forwardedRef.testScore}>
            <CardWithCircularGrid
              dataSource={uniData?.testScore}
              parentProps={allProps}
            />
          </section>

          <section ref={forwardedRef.website}>
            <VisitWebsite />
          </section>
          <section ref={forwardedRef.Professors}>
            <Professors allProps={uniData?.professors} />
          </section>
          <section ref={forwardedRef.similarCollages}>
            <ImageCard
              allProps={{
                data: uniData?.similarSchools,
                header: "Similar Collages"
              }}
            />
          </section>

          <section ref={forwardedRef.report}>
            <ReportCard
              dataSource={uniData.userEvaluation.report}
              parentProps={allProps}
            />
          </section>
          <section ref={forwardedRef.campusLife}>
            <PollCard
              dataSource={uniData.userEvaluation.reviews}
              parentProps={allProps}
            />
          </section>

          <section>
            <Ranking />
          </section>
          {/* <section ref={forwardedRef.Interview}>
            <Discussion unitId={unitId} />
          </section> */}
          <section ref={forwardedRef.Interview}>
            <Interview unitId={uniData?.elevatorInfo?.unitId} />
          </section>
        </IonRow>
      </IonCol>
    </IonGrid>
  )
}
export default SideDetails

