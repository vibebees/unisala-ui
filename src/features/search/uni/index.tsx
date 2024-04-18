import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { useLocation } from "react-router";
import { URLgetter } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router-dom";
import { ResultsColumn } from "./resultColumn";

function UniSearchResult({ query, loading }) {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

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
    <ResultsColumn
      activeSubTab={activeSubTab}
      filterPage={filterPage}
      setFilterPage={setFilterPage}
      loading={loading}
    />
  );
}

export default UniSearchResult;
