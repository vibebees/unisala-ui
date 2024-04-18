// ResultsColumn.js
import React from "react";
import { IonCol } from "@ionic/react";
import SearchResults from "./SearchResults";
import ScholarshipResult from "./ScholarshipResults";
import SearchTab from "../atoms/SearchTab";
import { ChipsTab } from "../orgamism/ChipsTab";
import UniversityScholarshipTab from "../atoms/UniversityScholarshipTab";
import { ThreadSkeleton } from "../../../components/packages/skeleton/threadSkeleton";

export const ResultsColumn = ({
  loading,
  activeSubTab,
  filterPage,
  setFilterPage,
}) => {
  return (
    <IonCol className="ion-no-margin ion-no-padding">
      {/* <ChipsTab /> */}
      <UniversityScholarshipTab />
      {loading ? (
        <ThreadSkeleton />
      ) : activeSubTab === "u" ? (
        <SearchResults
          filterPage={filterPage}
          setFilterPage={setFilterPage}
          isLoading={false}
        />
      ) : (
        <ScholarshipResult />
      )}
    </IonCol>
  );
};
