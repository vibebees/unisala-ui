import React, {useContext, useEffect, useState} from "react"
import {IonModal, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent} from "@ionic/react"
import {closeOutline} from "ionicons/icons"
import Filter from "./Filter"
import {ExploreFilterPopupContext} from "./ExploreUniFilterPopupContext"

export const MobileFilter = ({filterPage, setIsLoading, onClose}) => {

    const {popUp, closePopup} = useContext(ExploreFilterPopupContext)

    // useEffect(() => {
    //     console.log("popup", popUp)
    // }, [popUp])
    return (
        <IonModal isOpen={popUp} onDidDismiss={closePopup}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Filter</IonTitle>
                    <IonButton slot="end" onClick={closePopup}> {/* Here we attach closePopup to onClick */}
                        <IonIcon icon={closeOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
            </IonContent>
        </IonModal>

    )

}
