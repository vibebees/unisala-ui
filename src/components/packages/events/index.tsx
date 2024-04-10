import React from "react"
import { lazy } from "react"
import "./index.css"
import { EventCard } from "./organisms"
const DeleteEvent = lazy(() => import("./atoms/DeleteEvent"))

export const Event = ({ events }) => {
  return events?.map((event) => <EventCard key={event?.id} event={event} />)
}

