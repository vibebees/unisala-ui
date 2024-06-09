import React from "react";
import { useHistory } from "react-router";
import TabButton from "./TabButton"; // Adjust the path as needed
import { PeopleIcon, HomeIcon } from "@components/packages/icons";

const Tabs = () => {
  const params = new URLSearchParams(window.location.search);
  const history = useHistory();
  const q = params.get("tab");

  const setParams = (q) => {
    params.set("tab", q);
    history.push({
      search: params.toString(),
    });
  };

  return (
    <div className="flex flex-col items-center mx-auto w-full my-2 ">
      <div className="flex w-full">
        <TabButton
          label="GENERAL"
          active={q === "g"}
          onClick={() => setParams("g")}
          showBadge={q === "g"}
          Icon={HomeIcon}
        />
        <TabButton
          label="Reviews"
          active={q === "r"}
          onClick={() => setParams("r")}
          showBadge={q === "r"}
          Icon={PeopleIcon}
        />
      </div>
    </div>
  );
};

export default Tabs;
