import { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { create, eyeOff, add, eye, trash } from "ionicons/icons";
import EducationPop from "./EducationPop";
import { useMutation } from "@apollo/client";
import {
  ToggleView,
  DeleteEducation,
  getUserGql,
} from "../../../../datasource/graphql/user";
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types";

function Education({ education, myProfile, username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { schools } = education ?? {};

  const [toggleView] = useMutation(ToggleView, {
    context: { server: USER_SERVICE_GQL },
    variables: { card: "education" },
    update: (cache, { data: { toggleView } }) => {
      const { getUser } = cache.readQuery({
        query: getUserGql,
        variables: { username },
      });
      cache.writeQuery({
        query: getUserGql,
        variables: { username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              education: {
                ...getUser.user.education,
                private: toggleView.private,
              },
            },
          },
        },
      });
    },
    onCompleted: (data) => {
      if (data.toggleView.status.success) {
        present({
          duration: 3000,
          message: education.private ? "View made public" : "View made private",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  const [deleteEducation] = useMutation(DeleteEducation, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      const { getUser } = cache.readQuery({
        query: getUserGql,
        variables: { username },
      });
      cache.writeQuery({
        query: getUserGql,
        variables: { username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              education: data?.deleteEducation?.education,
            },
          },
        },
      });
    },
    onCompleted: (data) => {
      if (data.deleteEducation.status.success) {
        present({
          duration: 3000,
          message: "Education Deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  const [input, setInput] = useState({
    school: "",
    degree: "",
    major: "",
    startDate: "",
    graduationDate: "",
  });

  const [present, dismiss] = useIonToast();

  return (
    <IonCard className="mb-2 max-md:mx-1">
      <IonCardContent className="card-bb flex justify-between">
        <h1>Education</h1>
        {myProfile && (
          <div className="inline-flex">
            <IonIcon
              className="grey-icon-32 mr-1"
              icon={education.private ? eyeOff : eye}
              onClick={() => {
                toggleView();
              }}
            />
            <IonIcon
              className="grey-icon-32 mr-1"
              icon={add}
              onClick={() => {
                setIsOpen(true);
                setIsEdit(false);
                setInput({
                  school: "",
                  degree: "",
                  major: "",
                  startDate: "",
                  graduationDate: "",
                });
              }}
            />
          </div>
        )}
      </IonCardContent>

      {myProfile && Array.isArray(schools) && schools.length === 0 ? (
        <IonCardContent className="center-text">
          <p>Share your education</p>
          <IonButton
            color="primary"
            mode="ios"
            className="icon-text"
            onClick={() => setIsOpen(true)}
          >
            Add
          </IonButton>
        </IonCardContent>
      ) : (
        <IonCardContent>
          <IonList>
            {Array.isArray(schools) &&
              schools.map((education, i) => {
                const {
                  img,
                  school,
                  degree,
                  major,
                  startDate,
                  graduationDate,
                } = education;
                return (
                  <IonItem key={i}>
                    <IonAvatar slot="start">
                      <img
                        src={
                          img ??
                          "https://cdn-icons-png.flaticon.com/512/658/658960.png?w=740&t=st=1670169833~exp=1670170433~hmac=76735f9263206556f71a7cfd3348a540d4a4414e9d9269a72743db50877b877b"
                        }
                        alt="uni"
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{school}</h2>
                      <p>{degree}</p>
                      <p>{major}</p>
                      <p>
                        {startDate} / {graduationDate}
                      </p>
                    </IonLabel>
                    {myProfile && (
                      <>
                        <IonIcon
                          className="mr-1 cursor-pointer"
                          icon={create}
                          color="secondary"
                          onClick={() => {
                            setIsOpen(true);
                            setIsEdit(true);
                            setInput(education);
                          }}
                        />
                        <IonIcon
                          className="cursor-pointer"
                          icon={trash}
                          color="danger"
                          onClick={() => {
                            deleteEducation({
                              variables: { id: education._id },
                            });
                          }}
                        />
                      </>
                    )}
                  </IonItem>
                );
              })}
          </IonList>
        </IonCardContent>
      )}

      <EducationPop
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        input={input}
        setInput={setInput}
        schoolList={schools}
        username={username}
      />
    </IonCard>
  );
}

export default Education;
