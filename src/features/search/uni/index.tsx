import React, { FC } from "react";
import { useEffect, useState } from "react";
import { URLgetter } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router-dom";
import { ResultsColumn } from "./resultColumn";
import { DesktopFilter } from "./desktopFilter";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import CreatePortal from "@utils/CreatePortal";
import { useLazyQuery } from "@apollo/client";
import { UniFilterResults } from "@datasource/graphql/uni";
import { UNIVERSITY_SERVICE_GQL } from "@datasource/servers/types";

const UniSearchResult: FC<IUniSearchResult> = () => {
  const history = useHistory();
  const [activeSubTab, setActiveSubTab] = useState<string>("u");
  const [filterPage, setFilterPage] = useState<number>(0);
  const [getUniversityResults, { data, fetchMore , loading}] = useLazyQuery(
    UniFilterResults,
    {
      context: { server: UNIVERSITY_SERVICE_GQL },
      fetchPolicy: "network-only",
    }
  );


  useEffect(() => {
    const url = URLgetter("st");
    if (url) {
      setActiveSubTab(url);
    } else {
      setActiveSubTab("u");
    }
  }, [history.location.search]);

  return (
    <motion.div
      initial={{ opacity: 1, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
    >
      {/* {window !== undefined &&
        document.getElementById("filter-container") &&
        createPortal(
          <DesktopFilter filterPage={filterPage} setIsLoading={loading} />,
          document.getElementById("filter-container")!
        )} */}

      {CreatePortal(
        <DesktopFilter filterPage={filterPage} setIsLoading={loading} data = {data} fetchMore = {fetchMore} getUniversityResults ={getUniversityResults} />,
        "filter-container"
      )}

      {CreatePortal(
        <DesktopFilter filterPage={filterPage} setIsLoading={loading}  data = {data} fetchMore = {fetchMore} getUniversityResults ={getUniversityResults} />,
        "menu-content"
      )}

      <ResultsColumn
        activeSubTab={activeSubTab}
        filterPage={filterPage}
        setFilterPage={setFilterPage}
        loading={loading}
      />
    </motion.div>
  );
};

export default UniSearchResult;
