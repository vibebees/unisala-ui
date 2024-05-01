import React from "react";
import SearchPage from "../features/discover/index.js";
import Layout from "../layouts/FreeLayout.js";
import { ExploreFilterPopupProvider } from "../features/discover/uni/ExploreUniFilterPopupContext.js";
import { IonContent } from "@ionic/react";

const DiscoverPage = () => {
  return (
    <IonContent>
      <SearchPage />
    </IonContent>
  );
};
export default DiscoverPage;
