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
import React, { useEffect } from "react"

import StatCardTemplate from "../dataStatCard/template/StatCardTemplate"
import StatCardTemplateTwo from "../dataStatCard/template/StatCardTemplateTwo"
import RectangularCard from "../rectangularCardGrid/template/RectangularCard"
import ImageCard from "../../../components/packages/scrollableImageCard/template/ImageCard"
import { CardWithCircularGrid } from "../cardWithCircularGrid"
import FolderStructure from "../../../components/packages/folderStructure/index"
import { PollCard } from "../pollCard"
import Professors from "../professors/template/Professor"
import { ReportCard } from "../reportCard"
import Interview from "./Interview"
import Ranking from "./Ranking/template"
import { DepartmentRating } from "./departmentRatings"
import Statstics from "./statistics"
import StudentCharges from "./studentCharges"
import VisitWebsite from "./visitWebsite"
import { useLocation } from "react-router"

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
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const section = queryParams.get('section');
    if (section) {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <IonGrid >

        <IonRow
          className="w-[calc(100%-270px)] block"
          style={{ flex: 1, margin: 0 }}
        >
          <section ref={forwardedRef.scholarship} id="scholarship">
            <FolderStructure
              allProps={{
                folderName: "Scholarships",
                data: uniData?.scholarshipInfo?.scholarships,
                showDetails: true,
                popUp: true
              }}
            />
          </section>
          <section ref={forwardedRef.studentCharges} id="studentCharges">
            <StudentCharges />
          </section>

          <section id="departmentRatings">
            <DepartmentRating ratings={uniData?.departmentRatings} />
          </section>

          <section ref={forwardedRef.admission} id="admission">
            <StatCardTemplate
              allProps={{
                data: uniData?.admissionInfo,
                bodyTitle: "Admission"
              }}
            />
          </section>

          <section ref={forwardedRef.financialAid} id = "financialAid">
            <RectangularCard
              allProps={{
                data: uniData?.financialAid,
                year: uniData?.financialAid?.year
              }}
            />
          </section>

          <section ref={forwardedRef.statistics} id ="statistics">
            <Statstics />
          </section>

          <section ref={forwardedRef.libraries} id="libraries">
            <StatCardTemplateTwo
              allProps={{
                data: uniData.elevatorInfo.library,
                bodyTitle: "Libraries"
              }}
            />
          </section>

          <section ref={forwardedRef.testScore} id = "testScore">
            <CardWithCircularGrid
              dataSource={uniData?.testScore}
              parentProps={allProps}
            />
          </section>

          <section ref={forwardedRef.website} id ="website">
            <VisitWebsite />
          </section>
          <section ref={forwardedRef.Professors} id ="Professors">
            <Professors allProps={uniData?.professors} />
          </section>
          <section ref={forwardedRef.similarCollages} id="similarCollages">
            <ImageCard
              allProps={{
                data: uniData?.similarSchools,
                header: "Similar Collages"
              }}
            />
          </section>1

          <section ref={forwardedRef.report} id ="report">
            <ReportCard
              dataSource={uniData.userEvaluation.report}
              parentProps={allProps}
            />
          </section>
          <section ref={forwardedRef.campusLife} id="campusLife">
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
          <section ref={forwardedRef.Interview} id= "interviewExperience">
            <Interview unitId={uniData?.elevatorInfo?.unitId} />
          </section>
        </IonRow>
    </IonGrid>
  )
}
export default SideDetails

