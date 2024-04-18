import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { useLocation } from "react-router";
import { URLgetter } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router-dom";
import { ResultsColumn } from "./resultColumn";
import { DesktopFilter } from "./desktopFilter";
import { createPortal } from "react-dom";

function UniSearchResult({ query, loading }) {
  const location = useLocation();
  const history = useHistory();

  const [activeSubTab, setActiveSubTab] = useState("u");

  const [filterPage, setFilterPage] = useState(1);

  useEffect(() => {
    const url = URLgetter("st");
    if (url) {
      setActiveSubTab(url);
    } else {
      setActiveSubTab("u");
    }
  }, [history.location.search]);

  return (
    <>
      {window !== undefined &&
        document.getElementById("left-sidebar") &&
        createPortal(
          <DesktopFilter filterPage={filterPage} setIsLoading={loading} />,
          document.getElementById("left-sidebar")!
        )}
      <ResultsColumn
        activeSubTab={activeSubTab}
        filterPage={filterPage}
        setFilterPage={setFilterPage}
        loading={loading}
      />
    </>
  );
}

export default UniSearchResult;
