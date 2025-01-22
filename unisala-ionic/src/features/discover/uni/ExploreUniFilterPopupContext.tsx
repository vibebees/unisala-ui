import React from "react";
import { createContext, useContext, useState } from "react";
export const ExploreFilterPopupContext = createContext();
export const ExploreFilterPopupProvider = ({ children }) => {
  const [popUp, setPopUp] = useState(true);
  const closePopup = () => setPopUp(false);

  return (
    <ExploreFilterPopupContext.Provider value={{ popUp, setPopUp, closePopup }}>
      {children}
    </ExploreFilterPopupContext.Provider>
  );
};

export const useExploreUniFilterPopup = () =>
  useContext(ExploreFilterPopupContext);
