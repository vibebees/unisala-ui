import React from "react"
import SearchPage from "../features/search/index.js"
import Layout from "./layout.js"
const DiscoverPage = () => {
    return (
        <Layout
            mainContent={<SearchPage />}
        />
    )
}
export default DiscoverPage
