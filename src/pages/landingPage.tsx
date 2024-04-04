import React from "react";
import { LandingPageTemplate } from "../features/landingpage";
import Layout from './layout';





export default function LandingPage() {
  // Dummy data for the list
  const items = [
    { title: 'Item 1', description: 'Description for item 1' },
    { title: 'Item 2', description: 'Description for item 2' },
    // Add more items here
  ];




  return (
    <Layout
      mainContent={<LandingPageTemplate />}
    />
  )
}