import React from "react";
import "./index.css";
import { Spinner, Text } from "../../defaults";

export const PreLoader = () => {
  return (
    <div className="preloader_content">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
        alt=""
      />

      {/* <img
        src="../../../../assets/icon/UniSala.gif"
        alt="unisala logo"
      /> */}

      <Text color="medium">
        <h1>Unisala</h1>
      </Text>
      <Spinner name="dots" />
    </div>
  );
};
