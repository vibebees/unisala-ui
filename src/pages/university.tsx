import React from "react";
import University from "../features/university";
import Layout from "../layouts/FreeLayout";
import {
  schoolOutline,
  cashOutline,
  thumbsUpOutline,
  barChartOutline,
  libraryOutline,
  homeOutline,
  desktopOutline,
  peopleOutline,
  receiptOutline,
} from "ionicons/icons";
import {
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const leftBar = () => {
  return <div>Left Panel</div>;
};

const sideMenu = [
  {
    title: "Scholarships",
    icon: schoolOutline,
    ref: "scholarship",
  },
  {
    title: "Student Charges",
    icon: cashOutline,
    ref: "studentCharges",
  },
  {
    title: "Department Ratings",
    icon: schoolOutline,
    ref: "departmentRatings",
  },
  {
    title: "Admission",
    icon: cashOutline,
    ref: "admission",
  },

  {
    title: "Aid",
    icon: thumbsUpOutline,
    ref: "financialAid",
  },

  {
    title: "Statistics",
    icon: barChartOutline,
    ref: "statistics",
  },
  {
    title: "Libraries",
    icon: libraryOutline,
    ref: "libraries",
  },
  {
    title: "Test Score",
    icon: homeOutline,
    ref: "testScore",
  },
  {
    title: "Visit Website",
    icon: desktopOutline,
    ref: "website",
  },
  {
    title: "Professors",
    icon: peopleOutline,
    ref: "Professors",
  },

  {
    title: "Similar Collages",
    icon: thumbsUpOutline,
    ref: "similarCollages",
  },
  {
    title: "Report",
    icon: receiptOutline,
    ref: "report",
  },
  {
    title: "Campus Life",
    icon: thumbsUpOutline,
    ref: "campusLife",
  },

  {
    title: "Interview Experience",
    icon: receiptOutline,
    ref: "interviewExperience",
  },
];

const leftSidebar = () => {
  let history = useHistory();

  const handleItemClick = (ref) => {
    history.push(`?section=${ref}`);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "70px",
        maxHeight: "calc(100vh - 70px)",
        overflowY: "auto",
      }}
    >
      <IonCard>
        <IonList>
          {sideMenu.map((item, i) => (
            <IonItem
              style={{ cursor: "pointer" }}
              onClick={() => handleItemClick(item.ref)}
              key={i}
            >
              <IonIcon color={"primary"} icon={item.icon} />
              <IonLabel color={"primary"} className="ion-margin-start">
                <h2>{item.title}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCard>
    </div>
  );
};
const UniversityPage = () => (
  <Layout leftSidebar={leftSidebar()} mainContent={<University />} />
);
export default UniversityPage;
