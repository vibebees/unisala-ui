import {IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react"
export const UserGuide = () => (
    <IonGrid>
        {/* Section 1 */}
        <IonRow>
            <IonCol class="ion-text-center">
                <h1>Section 1</h1>
                <p>Content for Section 1</p>
            </IonCol>
        </IonRow>
        {/* Section 2 */}
        <IonRow>
            <IonCol class="ion-text-center">
                <h1>Section 2</h1>
                <p>Content for Section 2</p>
            </IonCol>
        </IonRow>
    </IonGrid>
)
