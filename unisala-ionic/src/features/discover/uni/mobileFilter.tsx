import React, {useContext, useEffect, useState} from "react"
import {IonModal, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent} from "@ionic/react"
import {closeOutline} from "ionicons/icons"
import Filter from "./filters"
import {ExploreFilterPopupContext} from "./ExploreUniFilterPopupContext"

export const MobileFilter = ({loading,
    filterPage,
    getUniversityResults,
    data,
    fetchMore,}) => {

    // const {popUp, closePopup} = useContext(ExploreFilterPopupContext)
    const popUp = false, closePopup = () => {}

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
                <Filter filterPage={filterPage} loading={loading} />
            </IonContent>
        </IonModal>

    )

}
