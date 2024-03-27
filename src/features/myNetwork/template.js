import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react"
 import Sidebar from "./sidebar"
import Requests from "./requests"
 import useWindowWidth from "hooks/useWindowWidth"
import useDocTitle from "hooks/useDocTitile"

function index() {
  useDocTitle("My Network")
  const windowWidth = useWindowWidth()

  return (
    <IonContent>
      <IonGrid className="max-width-container">
        <IonRow>
          {windowWidth > 768 && (
            <IonCol className="filter-col" style={{ maxWidth: "350px" }}>
              <div className="filter-col-container">
                <Sidebar />
              </div>
            </IonCol>
          )}

          <IonCol className="results-col">
            <Requests />
            {/* <Recommendations /> */}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default index
