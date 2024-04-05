// ResultsColumn.js
import React from "react"
import { IonCol } from "@ionic/react"
import SearchResults from "./searchResults/index"
import ScholarshipResult from "./scholarshipResults"
import SearchTab from "../atoms/SearchTab"
import { ChipsTab } from "../orgamism/ChipsTab"
import UniversityScholarshipTab from "../atoms/UniversityScholarshipTab"
import { ThreadSkeleton } from "../../../components/packages/skeleton/threadSkeleton"
export const ResultsColumn = ({  loading, activeSubTab, filterPage, setFilterPage }) => {

  return  (
    <IonCol className="results-col pl-[360px] max-md:mt-14 max-md:mx-0 max-md:px-0">
      <SearchTab />
      <ChipsTab />
      <UniversityScholarshipTab />
      {loading ? (
        <ThreadSkeleton />
      ) : activeSubTab === "u" ? (
        <SearchResults filterPage={filterPage} setFilterPage={setFilterPage}   />
      ) : (
        <ScholarshipResult />
      )}
    </IonCol>
  )
}
