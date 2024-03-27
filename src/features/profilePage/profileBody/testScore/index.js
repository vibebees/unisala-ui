import { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonIcon,
  useIonToast,
  IonChip,
  IonButton
} from "@ionic/react"
import { eyeOff, eye, add } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { getUserGql, ToggleView } from "graphql/user/"
import EditTestScore from "./editTestScore"
import { USER_SERVICE_GQL } from "servers/types"

const TestScore = ({ testScore, myProfile, username }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { scores } = testScore ?? {}
  const [present, dismiss] = useIonToast()

  const [toggleView] = useMutation(ToggleView, {
    context: { server: USER_SERVICE_GQL },
    variables: { card: "testScore" },
    update: (cache, { data: { toggleView } }) => {
      const { getUser } = cache.readQuery({
        query: getUserGql,
        variables: { username }
      })
      cache.writeQuery({
        query: getUserGql,
        variables: { username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              testScore: {
                ...getUser.user.testScore,
                private: toggleView.private
              }
            }
          }
        }
      })
    },
    onCompleted: (data) => {
      if (data.toggleView.status.success) {
        present({
          duration: 3000,
          message: testScore?.private
            ? "View made public"
            : "View made private",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  // eslint-disable-next-line complexity
  const ComponentToRender = () => {
    if (
      myProfile &&
      !(
        scores?.ACT_SCORE?.maths ||
        scores?.SAT_SCORE?.maths ||
        scores?.IELTS_SCORE?.score ||
        scores?.TOEFL_SCORE?.score
      )
    ) {
      return (
        <IonCardContent className="center-text">
          <p>Share your education</p>
          <IonButton
            color="primary"
            mode="ios"
            className="icon-text"
            onClick={() => setIsOpen(true)}
          >
            Add Scores
          </IonButton>
        </IonCardContent>
      )
    }

    if (
      myProfile ||
      (!myProfile && scores?.ACT_SCORE?.maths) ||
      scores?.SAT_SCORE?.maths ||
      scores?.IELTS_SCORE?.score ||
      scores?.TOEFL_SCORE?.score
    ) {
      return (
        <IonCardContent>
          <IonGrid>
            <IonRow>
              {(scores.IELTS_SCORE.score || scores.TOEFL_SCORE.score) && (
                <IonCol
                  style={{
                    borderRight:
                      (scores.ACT_SCORE.maths || scores.SAT_SCORE.maths) &&
                      "solid 2px #ddd"
                  }}
                >
                  <IonText color="dark" style={{ textAlign: "center" }}>
                    <h2>English Test</h2>
                  </IonText>
                  <IonRow>
                    {scores.IELTS_SCORE.score && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="primary">
                          <h2
                            style={{
                              background: "#EFF5FF",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.IELTS_SCORE.score}
                          </h2>
                        </IonText>
                        <IonChip color="primary" style={{ fontWeight: "bold" }}>
                          IELTS
                        </IonChip>
                      </IonCol>
                    )}
                    {scores.TOEFL_SCORE.score && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="secondary">
                          <h2
                            style={{
                              background: "#F0FAFF",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.TOEFL_SCORE.score}
                          </h2>
                        </IonText>
                        <IonChip
                          color="secondary"
                          style={{ fontWeight: "bold" }}
                        >
                          TOEFL
                        </IonChip>
                      </IonCol>
                    )}
                  </IonRow>
                </IonCol>
              )}
              {(scores.ACT_SCORE.maths || scores.SAT_SCORE.maths) && (
                <IonCol>
                  <IonText color="dark" style={{ textAlign: "center" }}>
                    <h2>Aptitude Test</h2>
                  </IonText>
                  <IonRow>
                    {scores.ACT_SCORE.maths && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="tertiary">
                          <h2
                            style={{
                              background: "#F1F3FF",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.ACT_SCORE.maths + scores.ACT_SCORE.english}
                          </h2>
                        </IonText>
                        <IonChip
                          color="tertiary"
                          style={{ fontWeight: "bold" }}
                        >
                          ACT
                        </IonChip>
                      </IonCol>
                    )}
                    {scores.SAT_SCORE.maths && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="success">
                          <h2
                            style={{
                              background: "#EFFCF4",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.SAT_SCORE.maths + scores.SAT_SCORE.english}
                          </h2>
                        </IonText>
                        <IonChip color="success" style={{ fontWeight: "bold" }}>
                          SAT
                        </IonChip>
                      </IonCol>
                    )}
                  </IonRow>
                </IonCol>
              )}
            </IonRow>
          </IonGrid>
        </IonCardContent>
      )
    }
  }

  return (
    <>
      <IonCard className="mb-2 max-md:mx-1">
        <IonCardContent className="card-bb  flex">
          <h1>Test Score</h1>
          {myProfile && (
            <div className="inline-flex">
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={testScore?.private ? eyeOff : eye}
                onClick={() => {
                  toggleView()
                }}
              />
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={add}
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </IonCardContent>
        <ComponentToRender />
      </IonCard>

      <EditTestScore
        scores={scores}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
      />
    </>
  )
}

export default TestScore
