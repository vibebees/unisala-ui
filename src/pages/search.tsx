import React from "react";
import SearchPage from "../features/search/index.js";
import Layout from "../layouts/FreeLayout.js";
import { ExploreFilterPopupProvider } from "../features/search/uni/ExploreUniFilterPopupContext.js";

const DiscoverPage = () => {
  return (
    <Layout
      leftSidebar={
        <div
          id="filter-container"
          className=" min-w-[279px] top-0 sticky"
        ></div>
      }
    >
      <ExploreFilterPopupProvider>
        <SearchPage />
      </ExploreFilterPopupProvider>
    </Layout>
  );
};
export default DiscoverPage;
