import {
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  IonTitle
} from "@ionic/react"
import { Typography } from "component/defaults"

export const ReportAverage = ({ allProps }) => {
  const { useGradeColor, report, useGrade } = allProps
  return (
    <IonCardContent className="average-report">
      <IonGrid>
        <IonRow>
          <IonCol>
            <div
              style={{
                background: useGradeColor(report?.average)
              }}
              className="report"
            >
              <h1 style={{ fontSize: "35px" }}>{useGrade(report?.average)}</h1>
            </div>

            <Typography
              color="dark"
              variant="h1"
              className="py-1 text-xl text-cen"
            >
              {" "}
              Average{" "}
            </Typography>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  )
}
