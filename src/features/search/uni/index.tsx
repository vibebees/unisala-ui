import React, { FC } from "react";
import { useEffect, useState } from "react";
import { URLgetter } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router-dom";
import { ResultsColumn } from "./resultColumn";
import { DesktopFilter } from "./desktopFilter";
import { createPortal } from "react-dom";

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
};

export default UniSearchResult;
