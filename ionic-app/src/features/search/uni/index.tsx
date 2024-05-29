import React, { FC } from "react";
import { useEffect, useState } from "react";
import { URLgetter } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router-dom";
import { ResultsColumn } from "./resultColumn";
import { DesktopFilter } from "./desktopFilter";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import CreatePortal from "@utils/CreatePortal";

const UniSearchResult: FC<IUniSearchResult> = ({ loading }) => {
  const history = useHistory();
  const [activeSubTab, setActiveSubTab] = useState<string>("u");
  const [filterPage, setFilterPage] = useState<number>(1);

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
        <DesktopFilter filterPage={filterPage} setIsLoading={loading} />,
        "filter-container"
      )}

      {CreatePortal(
        <DesktopFilter filterPage={filterPage} setIsLoading={loading} />,
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
