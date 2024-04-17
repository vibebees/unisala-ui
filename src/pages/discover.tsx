import React, { useState } from "react";
import { Helmet } from "react-helmet";
import SearchPage from "../features/search/index.js";
import Layout from "./layout.js";
import { DesktopFilter } from "../features/search/uni/desktopFilter.js";
import { ExploreFilterPopupProvider } from "../features/search/uni/ExploreUniFilterPopupContext.js";
import { Card } from "../components/defaults/index.js";

const DiscoverPage = () => {
    const [filterPage, setFilterPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    let leftSideBar = () => (
        <Card>
            <DesktopFilter filterPage={filterPage} setIsLoading={setIsLoading} />
        </Card>
    );

    return (
        <Layout
            leftSidebar={leftSideBar()}
            mainContent={
                <ExploreFilterPopupProvider>
                    <Helmet>
                        <title>Discover Universities - Unisala</title>
                        <meta name="description" content="Explore and discover universities and programs to find your perfect educational fit with Unisala." />
                        <meta property="og:title" content="Discover Universities - Unisala" />
                        <meta property="og:description" content="Explore and discover universities and programs to find your perfect educational fit with Unisala." />
                        <meta property="og:type" content="website" />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:title" content="Discover Universities - Unisala" />
                        <meta name="twitter:description" content="Explore and discover universities and programs to find your perfect educational fit with Unisala." />
                    </Helmet>
                    <SearchPage />
                </ExploreFilterPopupProvider>
            }
        />
    );
};

export default DiscoverPage;
