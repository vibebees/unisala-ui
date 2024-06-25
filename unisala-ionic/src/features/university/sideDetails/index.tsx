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
import { trackEvent } from "@components/analytics"
import { useAuth } from "@context/AuthContext"

const SideDetails = ({
  activeTab,
  forwardedRef,

  allProps
}) => {
  const { isSideBar, uniData } = allProps
  const {user} = useAuth();
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

  const sectionComponents = {
    scholarship: FolderStructure,
    studentCharges: StudentCharges,
    departmentRatings: DepartmentRating,
    admission: StatCardTemplate,
    financialAid: RectangularCard,
    statistics: Statstics,
    libraries: StatCardTemplateTwo,
    testScore: CardWithCircularGrid,
    website: VisitWebsite,
    Professors: Professors,
    similarCollages: ImageCard,
    report: ReportCard,
    campusLife: PollCard,
    interviewExperience: Interview,
    // Add more mappings as necessary
  };


  interface SectionConfig {
    ref?: React.RefObject<HTMLDivElement>;
    id: string;
    component: React.ReactNode;
  }

  const sections: SectionConfig[] = [
    {
      ref: forwardedRef.scholarship,
      id: 'scholarship',
      component: (
        <FolderStructure
          allProps={{
            folderName: 'Scholarships',
            data: uniData?.scholarshipInfo?.scholarships,
            showDetails: true,
            popUp: true,
          }}
        />
      ),
    },
    {
      ref: forwardedRef.studentCharges,
      id: 'studentCharges',
      component: <StudentCharges />,
    },
    {
      id: 'departmentRatings',
      component: <DepartmentRating ratings={uniData?.departmentRatings} />,
    },
    {
      ref: forwardedRef.admission,
      id: 'admission',
      component: (
        <StatCardTemplate
          allProps={{
            data: uniData?.admissionInfo,
            bodyTitle: 'Admission',
          }}
        />
      ),
    },
    {
      ref: forwardedRef.financialAid,
      id: 'financialAid',
      component: (
        <RectangularCard
          allProps={{
            data: uniData?.financialAid,
            year: uniData?.financialAid?.year,
          }}
        />
      ),
    },
    {
      ref: forwardedRef.statistics,
      id: 'statistics',
      component: <Statstics />,
    },
    {
      ref: forwardedRef.libraries,
      id: 'libraries',
      component: (
        <StatCardTemplateTwo
          allProps={{
            data: uniData?.elevatorInfo?.library,
            bodyTitle: 'Libraries',
          }}
        />
      ),
    },
    {
      ref: forwardedRef.testScore,
      id: 'testScore',
      component: (
        <CardWithCircularGrid
          dataSource={uniData?.testScore}
          parentProps={allProps}
        />
      ),
    },
    {
      ref: forwardedRef.website,
      id: 'website',
      component: <VisitWebsite />,
    },
    {
      ref: forwardedRef.Professors,
      id: 'Professors',
      component: <Professors allProps={uniData?.professors} />,
    },
    {
      ref: forwardedRef.similarCollages,
      id: 'similarCollages',
      component: (
        <ImageCard
          allProps={{
            data: uniData?.similarSchools,
            header: 'Similar Collages',
          }}
        />
      ),
    },
    {
      ref: forwardedRef.report,
      id: 'report',
      component: (
        <ReportCard
          dataSource={uniData?.userEvaluation?.report}
          parentProps={allProps}
        />
      ),
    },
    {
      ref: forwardedRef.campusLife,
      id: 'campusLife',
      component: (
        <PollCard
          dataSource={uniData?.userEvaluation?.reviews}
          parentProps={allProps}
        />
      ),
    },
    {
      id: 'ranking',
      component: <Ranking />,
    },
    {
      ref: forwardedRef.Interview,
      id: 'interviewExperience',
      component: <Interview unitId={uniData?.elevatorInfo?.unitId} />,
    },
  ];


  return (
    <IonGrid>
      <IonRow className=" block" style={{ flex: 1, margin: 0 }}>
        {sections.map(({ ref, id, component }) => (
          <section ref={ref} id={id} key={id} onClick={() => trackEvent({
            action: "Uni_page_Details_"+ id+"_clicked_by_" + user?.id,
            category: "navigation",
            label: id
          })}>
            {component}
          </section>
        ))}
      </IonRow>
    </IonGrid>
  );
}
export default SideDetails

