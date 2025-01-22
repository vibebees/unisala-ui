import React, { useState, useEffect } from "react";
import { IonSegment } from "@ionic/react";
import Segments from "../atoms/Segment";
import { URLgetter, URLupdate } from "@utils/lib/URLupdate";
import { useHistory } from "react-router";

const Tabs = ({ props }: any) => {
  const { options, onClick, scrollable = true, Identifier } = props;
  const [activeTab, setActiveTab] = useState<any>("");
  const history = useHistory();

  useEffect(() => {
    const getURL = URLgetter(Identifier) || options[0].nav;
    setActiveTab(getURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search]);

  return (
    <IonSegment
      value="default"
      className="shadow-sm rounded-md border border-neutral-200 w-full"
      scrollable={scrollable}
      onIonChange={(e) => {
        const tab = e.target.value || options[0].nav;
        const updatedURL = URLupdate(Identifier, tab);
        history.push({
          search: updatedURL,
        });
      }}
    >
      {options?.map(({ name, icon, nav }, i) => (
        <Segments
          key={i}
          name={name}
          icon={icon}
          onClick={onClick}
          nav={nav}
          activeTab={activeTab}
        />
      ))}
    </IonSegment>
  );
};
export default Tabs;
