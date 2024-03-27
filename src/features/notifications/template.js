import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from "@ionic/react"
 import "./index.css"

const ProfilePage = () => {

  return (
    <IonContent>
      <IonGrid className="max-width-container">
        <IonRow>
          <IonCol>
            <IonCard className="mb-1">
              <IonCardContent>
                <h2>Notifications</h2>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardContent>
                <div className="notificatons-tabs-content">
                  Hi 👋,  <br /> <br />
                  Welcome to Unisala -- The perfect place truly helps in finding
                  the perfect university for you.
                  <br />
                  <br /> Here is some information to help you get started with
                  Unisala.
                  <br />
                  <br /> How does it work?
                  <br /> ✍️ Ask & Answer questions from other students
                  <br /> 👨‍🏫 👩‍🏫 Search Professor
                  <br /> 📊 See detail info & statistics about university
                  <br /> 📚 Follow topics and courses
                  <br /> 📃 Read stories from your personalized feed
                  <br /> 😎 Keep your profile up-to-date


                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default ProfilePage
