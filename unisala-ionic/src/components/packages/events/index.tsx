import React from "react";
import "./index.css";
import { EventCard } from "./organisms";

const Event = ({ events }: { events: IEvent[] }) => {
  return events?.map((event) => <EventCard key={event._id} event={event} />);
};

export default Event;
