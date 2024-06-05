import React from "react";
import Card from "../molecules/Card";
import useIsData from "@hooks/useIsData";

const CircularCardTemplate = ({ value, header }) => {
  const allProps = {
    header: header,
    data: [
      {
        title: "Total Graduate",
        value: `${useIsData(value.graduateEnrollment)}`,
        image: "https://cdn-icons-png.flaticon.com/512/7389/7389814.png",
      },
      {
        title: "Total Enrolled",
        value: `${useIsData(value.totalEnrollment)}`,
        image: "https://cdn-icons-png.flaticon.com/512/2534/2534204.png",
      },
      {
        title: "Total Undergraduate",
        value: `${useIsData(value.undergraduateEnrollment)}`,
        image: "https://cdn-icons-png.flaticon.com/512/7156/7156208.png",
      },
    ],
  };

  return (
    <div>
      <Card allProps={allProps} />
    </div>
  );
};

export default CircularCardTemplate;
