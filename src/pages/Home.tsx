import React from "react"
import { Content, Page } from "../components/defaults"
import Home from "../features/home"
import Layout from "./layout"
const PageHome = () => {

  return (
    <Layout mainContent={<Home/>} />
  )
}
export default PageHome
