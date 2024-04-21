import React, { Dispatch, FC, SetStateAction } from "react";
import { ChipsTab } from "../orgamism/ChipsTab";
import SearchResults from "./searchResult/index";
import ScholarshipResult from "./scholarshipResult";
import UniversityScholarshipTab from "../atoms/UniversityScholarshipTab";
import { ThreadSkeleton } from "../../../components/packages/skeleton/threadSkeleton";
import { Card } from "@components/defaults";

interface IIResultsColumn extends IResultsColumn {
  setFilterPage: Dispatch<SetStateAction<number>>;
}

export const ResultsColumn: FC<IIResultsColumn> = ({
  loading,
  activeSubTab,
  filterPage,
  setFilterPage,
}) => {
  return (
    <div className="ion-no-margin ion-no-padding h-full">
      <ChipsTab />
      <UniversityScholarshipTab />
      <div>
        {loading ? (
          <Card className="w-full shadow-none overflow-hidden ion-no-margin ion-no-padding">
            <ThreadSkeleton />
          </Card>
        ) : activeSubTab === "u" ? (
          <SearchResults
            filterPage={filterPage}
            setFilterPage={setFilterPage}
            isLoading={false}
          />
        ) : (
          <ScholarshipResult />
        )}
      </div>
    </div>
  );
};
