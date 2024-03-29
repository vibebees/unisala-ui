import React, { createContext } from "react"
import Listsearch from "./atoms/List.search"
import FloatingButton from "../floatingButton"
import { addOutline } from "ionicons/icons"
import CreateListModal from "./atoms/CreateListModal"
import {
  IonText,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent
} from "@ionic/react"
import ListContainer from "./molecules/ListContainer"
import { useHistory, useParams } from "react-router"
import { URLgetter, URLdelete } from "utils/lib/URLupdate"
import Lists from "./molecules/Lists"
import { useSelector } from "react-redux"
export const ListContext = createContext()

const index = ({ userId }) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)
  const [lists, setLists] = React.useState([])
  const { username } = useParams()
  const { user: loggedInUser } = useSelector((state) => state.userProfile)
  const isMyProfile = loggedInUser?.username === username

  React.useEffect(() => {
    const data = URLgetter("id")
    if (data) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [history.location.search])

  return (
    <ListContext.Provider value={{ lists, setLists, userId, isMyProfile }}>
      <div className="min-h-[50vh] max-md:mx-1 max-md:px-0">
        {/* <Listsearch /> */}
        <br />
        <section className="px-3 max-md:px-1 max-md:mx-0">
          <IonText className="text-lg mt-6 font-bold ">
            {isMyProfile ? "Your" : ""} Lists
          </IonText>
          <section>
            <ListContainer />
            <br />
            <br />
            <br />
          </section>
          <IonModal mode="ios" isOpen={isOpen} backdropDismiss={false}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Universtiy List</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    className="ListModalCloseBtn"
                    onClick={() => {
                      const data = URLdelete("id")
                      history.push({ search: data })
                      setIsOpen(false)
                    }}
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding ion-margin">
              <Lists />
            </IonContent>
          </IonModal>
        </section>
        <br />
        <br />
        <br />
        {isMyProfile && (
          <FloatingButton
            Icon={addOutline}
            ModalData={CreateListModal}
            header="Create a List"
          />
        )}
      </div>
    </ListContext.Provider>
  )
}

export default index
