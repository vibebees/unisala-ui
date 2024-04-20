// DesktopFilter.js
import React from "react";
import { IonCol } from "@ionic/react";
import Filter from "./filters";

export const DesktopFilter = ({ filterPage, setIsLoading }) => (
  <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
);
