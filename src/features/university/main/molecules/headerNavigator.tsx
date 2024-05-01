import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export const HeaderNavigator = ({ allProps }) => {
  const { data } = allProps;
  return (
    <IonHeader
      style={{
        position: "sticky",
        top: 0,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="Back" icon={chevronBack} defaultHref="/" />
        </IonButtons>
        <IonTitle
          style={{
            fontSize: "1rem",
          }}
          className="text-center w-full text-red-700"
        >
          {data?.getSchoolInfo?.name}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
