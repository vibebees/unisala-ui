/* eslint-disable no-unused-vars */
import React from "react";
import { Icon, Label, SegmentButton } from "@components/defaults";
import * as icons from "ionicons/icons";
import ReactGA from "react-ga4";
import clsx from "clsx";

const Segment = ({
  name = "",
  icon = "",
  onClick = (e: any, nav: string) => {},
  nav = "",
  activeTab,
}) => {
  const iconName = icon in icons ? icons[icon] : icons["alert"];

  return (
    <>
      <SegmentButton
        value={nav}
        onClick={(e: any) => {
          onClick(e, nav);
          ReactGA.event({
            category: "Segment",
            action: name + " clicked",
            label: name,
            nav: nav,
          });
        }}
        className={clsx(
          "bg-transparent text-gray-600",
          activeTab === nav ? "text-white bg-blue-600" : ""
        )}
      >
        <Icon icon={iconName}></Icon>
        <Label>{name}</Label>
      </SegmentButton>
    </>
  );
};
export default Segment;
