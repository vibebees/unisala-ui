import { IonCardContent, IonCol, IonGrid, IonRow, IonText } from "@ionic/react"
import Typography from "component/ui/Typography"

export const RowSection = ({ allProps, testScore, type }) => {
  const { uniData, isSideBar, useIsData, width, subHeader, generator } =
    allProps

  function SubHeader() {
    let title = subHeader.act
    if (type === "sat") {
      title = subHeader.sat
    }

    return <Typography variant="h2">{title}</Typography>
  }
  return (
    <IonCardContent>
      {SubHeader()}
      <IonGrid>
        <IonRow>
          {[
            generator({ testScore, title: "Composite", key: "composite" }),
            generator({ testScore, title: "English", key: "english" }),
            generator({ testScore, title: "Math", key: "math" })
          ].map((item, index) => {
            return (
              <IonCol
                style={{
                  margin: "5px",
                  padding: "0px"
                }}
                key={index}
                className="ion-padding"
              >
                <div
                  style={{
                    width: width > 720 ? "175px" : "130px",
                    height: width > 720 ? "175px" : "130px"
                  }}
                  className="rounded-circle"
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      width: "90%",
                      height: "90%",
                      // border: "1px solid #c4c4c4",
                      boxShadow:
                        " rgba(67, 71, 85, 0.67) 0px 0px 0.25em, rgba(90, 125, 188, 0.15) 0px 0.25em 1em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "5px"
                    }}
                  >
                    <img
                      src={item.image}
                      style={{
                        width: "50px"
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        textAlign: "center"
                      }}
                    >
                      <Typography variant="h2">
                        {width < 720 ? (
                          <h2
                            style={{
                              margin: 0,
                              padding: 0
                            }}
                          >
                            {useIsData(item.min)}
                            {" - "}
                            {useIsData(item.max)}
                          </h2>
                        ) : (
                          <h1
                            style={{
                              margin: 0,
                              padding: 0
                            }}
                          >
                            {useIsData(item.min)}
                            {" - "}
                            {useIsData(item.max)}
                          </h1>
                        )}
                      </Typography>

                      <Typography variant="p">{item.title}</Typography>
                    </div>
                  </div>
                </div>
              </IonCol>
            )
          })}
        </IonRow>
      </IonGrid>
    </IonCardContent>
  )

  /*
    return (
        <IonCardContent>
        <IonText color="dark">
            <h2>SAT Score Required:</h2>
        </IonText>
        <IonGrid>
            <IonRow>
                {[
                    {
                        title: "Composite",
                        min: uniData?.testScore?.sat?.composite
                            ?.percentile25th,
                        max: uniData?.testScore?.sat?.composite
                            ?.percentile75th,
                        score: `${uniData?.testScore?.sat?.composite?.percentile25th} - ${uniData?.testScore?.sat?.composite?.percentile75th}`
                    },
                    {
                        title: "English",
                        min: uniData?.testScore?.sat?.english
                            ?.percentile25th,
                        max: uniData?.testScore?.sat?.english
                            ?.percentile75th,
                        score: `${uniData?.testScore?.sat?.english?.percentile25th} - ${uniData?.testScore?.sat?.english?.percentile75th}`
                    },
                    {
                        title: "Math",
                        min: uniData?.testScore?.sat?.math
                            ?.percentile25th,
                        max: uniData?.testScore?.sat?.math
                            ?.percentile75th,
                        score: `${uniData?.testScore?.sat?.math?.percentile25th} - ${uniData?.testScore?.sat?.math?.percentile75th}`
                    }
                ].map((item, index) => {
                    return (
                        <IonCol
                            style={{
                                margin: "5px",
                                padding: "0px"
                            }}
                            key={index}
                            className="ion-padding"
                        >
                            <div
                                style={{
                                    width:
                                        width > 720
                                            ? "175px"
                                            : "130px",
                                    height:
                                        width > 720
                                            ? "175px"
                                            : "130px"
                                }}
                                className="rounded-circle"
                            >
                                <div
                                    style={{
                                        borderRadius: "50%",
                                        width: "90%",
                                        height: "90%",
                                        // border: "1px solid #c4c4c4",
                                        boxShadow:
                                            " rgba(67, 71, 85, 0.67) 0px 0px 0.25em, rgba(90, 125, 188, 0.15) 0px 0.25em 1em",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        gap: "5px"
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        style={{
                                            width: "50px"
                                        }}
                                        alt=""
                                    />
                                    <div
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <IonText color="dark">
                                            {width < 720 ? (
                                                <h2
                                                    style={{
                                                        margin: 0,
                                                        padding: 0
                                                    }}
                                                >
                                                    {useIsData(
                                                        item.min
                                                    )}
                                                    {" - "}
                                                    {useIsData(
                                                        item.max
                                                    )}
                                                </h2>
                                            ) : (
                                                <h1
                                                    style={{
                                                        margin: 0,
                                                        padding: 0
                                                    }}
                                                >
                                                    {useIsData(
                                                        item.min
                                                    )}
                                                    {" - "}
                                                    {useIsData(
                                                        item.max
                                                    )}
                                                </h1>
                                            )}
                                        </IonText>

                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            </div>
                        </IonCol>
                    )
                })}
            </IonRow>
        </IonGrid>
    </IonCardContent>)

    */
}
