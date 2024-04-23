import React from "react";
import Layout from "../../layouts/layout";
import NetworkTemplate from "./template";
import Sidebar from "./sidebar";
const NetworkPage = () => {
  return <Layout leftSidebar={<Sidebar />} mainContent={<NetworkTemplate />} />;
};

export default NetworkPage;
