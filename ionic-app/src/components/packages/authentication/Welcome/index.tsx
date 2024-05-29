import React, { useState, createContext, useEffect, useRef } from "react";
import { IonRow, IonCol, IonModal } from "@ionic/react";
import Indicators from "./Steps/Indicators";
import StepsButtons from "./Steps/StepsButtons";
import clsx from "clsx";
import "./index.css";
import { authInstance } from "@datasource/api/axiosInstance";
import { userServer } from "@datasource/servers/endpoints";
import Step from "./Steps/Step";
import { PreLoader } from "../../preloader";

export const WelcomeData = createContext();

const Index = ({ allProps }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);
  const [meta, setMeta] = useState({});
  const modalRef = useRef(null);

  const [status, setStatus] = useState("ideal");
  const [welcomeFormdata, setWelcomeFormdata] = useState({
      interestedSubjects: [],
      userStatus: "",
      interestedUni: [],
      studyLevel: "",
    }),
    { setNewUser, newUser } = allProps;

  const getAllQuestion = async () => {
    setStatus("loading");
    try {
      const res = await authInstance.get(
        `${userServer}/get-onboarding-metadata`
      );
      if (res.data.success) {
        setMeta(res.data.data);
        setTotalSteps(Object.values(res.data.data).length);
        setStatus("ideal");
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    getAllQuestion();
  }, []);

  const LoadedComponent = (
    <IonRow className="flex-col h-full">
      <IonCol size="auto">
        <Indicators currentStep={currentStep} totalSteps={totalSteps} />
      </IonCol>
      <IonRow className=" flex-1">
        <IonCol className=" welcomeScroll overflow-y-auto  h-full ">
          {Object.values(meta).map((MetaData, index) => {
            return (
              <div
                key={index}
                className={clsx("step-container  absolute left-0 w-full", {
                  "z-10": currentStep === index + 1,
                  "z-0 opacity-0": currentStep !== index + 1,
                  "fade-enter": currentStep === index + 1,
                  "fade-exit": currentStep !== index + 1,
                })}
              >
                <Step metaData={MetaData} />
              </div>
            );
          })}
        </IonCol>
      </IonRow>

      <IonCol size="auto" className="">
        <StepsButtons
          allProps={{
            ...allProps,
            currentStep,
            setCurrentStep,
            modalRef,
            meta,
            totalSteps,
          }}
        />
      </IonCol>
    </IonRow>
  );

  return (
    <IonModal ref={modalRef} isOpen={newUser}>
      <WelcomeData.Provider
        value={{ meta, welcomeFormdata, setWelcomeFormdata }}
      >
        {status === "ideal" && LoadedComponent}
        {status === "loading" && <PreLoader />}
        {status === "error" && (
          <div className="text-center text-red-500 py-4">
            Something went wrong
          </div>
        )}
      </WelcomeData.Provider>
    </IonModal>
  );
};
export default Index;
