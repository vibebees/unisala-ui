import { IonCol, IonRow, IonText } from "@ionic/react"
import { Typography } from "component/ui"

export const ReportBody = ({ allProps }) => {
  const { records, useGradeColor, useGrade, width } = allProps
  return (
    <IonRow>
      {records.map((item, index) => {
        return (
          <IonCol
            style={{
              display: "flex",
              gap: "10px",
              minWidth: width > 520 ? "220px" : "150px",
              margin: 0
            }}
            className="ion-padding"
            key={index}
          >
            <IonRow
              style={{
                gap: "5px",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                className="small-report"
                style={{
                  background: useGradeColor(item.report),
                  width: width < 520 ? "40px" : "50px",
                  height: width < 520 ? "40px" : "50px"
                }}
              >
                <Typography variant="h1">{useGrade(item.report)}</Typography>
              </div>
              <div className="">
                <IonText color="dark">
                  <h6
                    style={{
                      minWidth: "150px",
                      textAlign: "center"
                    }}
                  >
                    {" "}
                    {item.title}{" "}
                  </h6>
                </IonText>
              </div>
            </IonRow>
          </IonCol>
        )
      })}
    </IonRow>
  )
}
