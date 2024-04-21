import React, { useEffect } from "react";
import { IonCard, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import { URLgetter, URLupdate } from "../../../utils/lib/URLupdate";
import clsx from "clsx";

const UniversityScholarshipTab = () => {
  const history = useHistory();
  const [active, setActive] = React.useState("u");

  useEffect(() => {
    const url = URLgetter("st");
    if (url) {
      setActive(url);
    } else {
      setActive("u");
    }
  }, [history.location.search]);

  return (
    <IonCard className="flex ion-no-margin ion-no-padding my-2 h-8 shadow-none border border-neutral-200 rounded-md">
      <IonRow
        onClick={() => {
          const url = URLupdate("st", "u");
          history.push({ search: url });
        }}
        className={clsx(
          " w-full rounded-md  h-full justify-center items-center cursor-pointer",
          active === "u" && "bg-blue-500 text-white font-medium"
        )}
      >
        University
      </IonRow>
      <IonRow
        onClick={() => {
          const url = URLupdate("st", "s");
          history.push({ search: url });
        }}
        className={clsx(
          " w-full rounded-md  justify-center items-center cursor-pointer",
          active === "s" && "bg-blue-500 text-white font-medium"
        )}
      >
        Scholarship
      </IonRow>
    </IonCard>
  );
};

export default UniversityScholarshipTab;
