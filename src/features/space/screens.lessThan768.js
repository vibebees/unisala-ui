import { IonHeader, IonIcon } from "@ionic/react"
import { Link } from "react-router-dom"
import { SearchBar } from "../../component/searchBox"
import Authentication from "../../component/custom-components/authentication/AuthModal"

export const screenLessThan768 = ({
  setActiveProfile,
  personCircle,
  activeProfile,
  username,
  loggedIn
}) => {
  return (
    <IonHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: "white",
        padding: "8px",
        borderBottom: "1px solid #e0e0e0"
      }}
      className="ion-no-border"
    >
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          height: "100%",
          width: "95%",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <SearchBar />
        {loggedIn && (
          <Link to={`/@/${username}`}>
            <div className="profile-pop">
              <IonIcon size="large" icon={personCircle} color="medium" />
              {/* {activeProfile && <ProfilePop />} */}
              {/* {activeProfile && (
              <Authentication
                setActiveProfile={setActiveProfile}
                activeProfile={activeProfile}
              />
            )} */}
            </div>
          </Link>
        )}
      </div>
    </IonHeader>
  )
}
