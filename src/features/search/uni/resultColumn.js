// ResultsColumn.js
import React from "react"
import { IonCol } from "@ionic/react"
import SearchResults from "./SearchResults"
import ScholarshipResult from "./ScholarshipResults"
import SearchTab from "../atoms/SearchTab"
import { ChipsTab } from "../orgamism/ChipsTab"
import UniversityScholarshipTab from "../atoms/UniversityScholarshipTab"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"
export const ResultsColumn = ({ isLoading, loading, activeSubTab, filterPage, setFilterPage }) => (
  <IonCol className="results-col pl-[360px] max-md:mt-14 max-md:mx-0 max-md:px-0">
    <SearchTab />
    <ChipsTab />
    <UniversityScholarshipTab />
    {loading || isLoading ? (
      Array.from({ length: 12 }).map((_, i) => <ThreadSkeleton key={i} />)
    ) : activeSubTab === "u" ? (
      <SearchResults filterPage={filterPage} setFilterPage={setFilterPage} />
    ) : (
      <ScholarshipResult />
    )}
  </IonCol>
)
