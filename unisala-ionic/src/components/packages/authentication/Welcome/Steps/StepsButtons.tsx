import React from "react";
import { useMutation } from "@apollo/client";
import { IonButton, IonCard, useIonToast } from "@ionic/react";
import clsx from "clsx";
import { useContext } from "react";
import { WelcomeData } from "..";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { EditProfile } from "@datasource/graphql/user";
import { useAuth } from "@context/AuthContext";

const StepsButtons = ({ allProps }) => {
  const { welcomeFormdata } = useContext(WelcomeData);
  const { user, UpdateNewUser } = useAuth();
  const [present, dismiss] = useIonToast();
  const { currentStep, setCurrentStep, meta, totalSteps } = allProps;
  const metaData = Object.values(meta);

  const [editProfile, { loading }] = useMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      ...user,
      ...welcomeFormdata,
    },
    onCompleted: (data) => {
      if (data?.editProfile?.status?.success) {
        present({
          duration: 3000,
          message: "Customizing your feed based on your profile!",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      } else {
        present({
          duration: 3000,
          message: data?.editProfile?.status?.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
      UpdateNewUser();
    },
    onError: (error) => {
      present({
        duration: 30000,
        message: error?.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  const validationFunctions = () => {
    let typeofData = typeof welcomeFormdata[metaData[currentStep - 1].id];

    if (currentStep === 1) {
      return true;
    }
    if (typeofData === "string") {
      return welcomeFormdata[metaData[currentStep - 1].id] !== "";
    }
    if (typeofData === "object") {
      return welcomeFormdata[metaData[currentStep - 1].id].length > 0;
    }
  };

  const handleSubmit = () => {
    const isValid = validationFunctions();
    if (!isValid) {
      return present({
        duration: 3000,
        message: "Please select atleast one university",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    }
    editProfile();
  };
  const handleNext = () => {
    const isValid = validationFunctions();
    if (!isValid) {
      return present({
        duration: 3000,
        message: "Please fill out the required fields",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <IonCard className="w-full ion-no-margin ion-no-padding shadow-none  flex justify-between h-12">
      <IonButton
        fill="clear"
        className={clsx(
          "bg-opacity-80 flex-shrink-0",
          currentStep === 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </IonButton>
      <IonButton
        disabled={loading}
        className="flex-shrink-0"
        onClick={currentStep === totalSteps ? handleSubmit : handleNext}
      >
        {currentStep === totalSteps ? "Submit" : "Next"}
      </IonButton>
    </IonCard>
  );
};

export default StepsButtons;
