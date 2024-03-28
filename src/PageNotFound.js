import {
  IonButton,
  IonContent,
  IonRow,
  IonText
} from "@ionic/react"
// import CreateSpace from "./createSpace/CreateSpace"

export const PageNotFound = ({ msg }) => {
  return (
    <IonContent color="light">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <IonText color="dark">
          <h1
            style={{
              fontSize: "2.5rem"
            }}
          >
            Oops!
          </h1>
        </IonText>
        <br />
        <IonText color="dark">
          <h6>{msg}</h6>
        </IonText>
        <br />
        <IonButton routerLink="/home">Go Home</IonButton>
      </div>
    </IonContent>
  )
}

export const SpaceNotFound = () => {
  return (
    <IonContent color="light">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <IonText>
          <h1 className="text-2xl font-semibold">
            Oops! The space is not available
          </h1>
        </IonText>

        <IonText>
          <h5 className="text-lg font-medium">But, you can make your own 😃</h5>
        </IonText>

        <IonRow className="mt-4">
          {/* <CreateSpace /> */}
        </IonRow>
      </div>
    </IonContent>
  )
}

export default PageNotFound
