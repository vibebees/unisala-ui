import { IonGrid } from "@ionic/react"
import { SqueezeBox } from "component/squeezeBox"
import { TimeLine } from "component/timeline"
import { StudyAbroadRoadmapInput } from "features/roadmap/template"
import HistoryHeader from "../history/atoms/HistoryHeader"

export const History = () => {
  const data = [
    {
      title: "2024",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2023",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2022",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2021",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2020",
      child: <TimeLine />,
      content: "The St. Tam"
    },
    {
      title: "2019",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2018",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2017",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2016",
      child: <TimeLine />,
      content:
        "The St. Tammany Parish Tourist Commission is the official destination marketing organization for St. Tammany Parish. The commission is charged with promoting St. Tammany Parish as a tourism destination and is funded by a 3% hotel occupancy tax paid by visitors to the parish. The commission is governed by a board of directors appointed by the St. Tammany Parish President and Parish Council. The commission is a member of the Louisiana Association of Convention and Visitors Bureaus and the Louisiana Travel Promotion Association."
    },
    {
      title: "2015",
      child: <TimeLine />,
      content: "The St. Tam"
    }
  ]
  return (
    <IonGrid style={{ maxWidth: "900px", margin: "auto" }}>
      <HistoryHeader />
      <SqueezeBox data={data} />
    </IonGrid>
  )
}
