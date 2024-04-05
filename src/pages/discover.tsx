import React, { useState } from "react"
import SearchPage from "../features/search/index.js"
import Layout from "./layout.js"
import { DesktopFilter } from "../features/search/uni/desktopFilter.js"
import { ExploreFilterPopupProvider } from "../features/search/uni/ExploreUniFilterPopupContext.js"
const DiscoverPage = () => {

    let leftSideBar = () => {
        const [ filterPage, setFilterPage ] = useState(1)
        const [isLoading, setIsLoading] = useState(false)
        return (
            <DesktopFilter filterPage={filterPage} setIsLoading={setIsLoading} />

        )
    }


    return (
        <Layout
            mainContent={
                <ExploreFilterPopupProvider>
                    <SearchPage />
                </ExploreFilterPopupProvider>
            }
            leftSidebar={leftSideBar()}
        />
    )
}
export default DiscoverPage
