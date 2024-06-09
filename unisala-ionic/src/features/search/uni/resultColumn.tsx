import React, { Dispatch, FC, SetStateAction } from "react";
import { ChipsTab } from "../orgamism/ChipsTab";
import SearchResults from "./searchResult/index";
import ScholarshipResult from "./scholarshipResult";
import UniversityScholarshipTab from "../atoms/UniversityScholarshipTab";
import { ThreadSkeleton } from "../../../components/packages/skeleton/threadSkeleton";
import { Card } from "@components/defaults";
import { AnimatePresence } from "framer-motion";

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
        <AnimatePresence mode="wait">
          {activeSubTab === "u" && (
            <SearchResults
              filterPage={filterPage}
              setFilterPage={setFilterPage}
              isLoading={loading}
              key={"u"}
            />
          )}
          {activeSubTab === "s" && <ScholarshipResult key={"s"} />}
        </AnimatePresence>
      </div>
    </div>
  );
};
