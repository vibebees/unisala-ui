// DesktopFilter.js
import React from "react"
import { IonCol } from "@ionic/react"
import Filter from "./Filter"
export const DesktopFilter = ({ filterPage, setIsLoading }) => (
  <IonCol className="filter-col py-6 fixed overflow-y-scroll z-50 bottom-0 top-0">
    <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
  </IonCol>
)
