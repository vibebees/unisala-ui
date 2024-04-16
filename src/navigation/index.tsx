import React, { useEffect, useState } from "react";
import {
  Label,
  RouterOutlet,
  TabBar,
  TabButton,
  Tabs,
} from "../components/defaults/";
import { Link, useHistory, useLocation } from "react-router-dom";
import { PageRoute } from "./PageRoute";
import { SearchBar } from "../components/packages/searchBox";
import { IonCol, IonGrid, IonHeader, IonRow } from "@ionic/react";
import useRoutes from "../hooks/useRoutes";
import { cn } from "../utils";
import useWindowWidth from "../hooks/useWindowWidth";

// Define props if you have any for NavBar, for example:
interface NavigationProps {
  // Define any props here if needed, for now, it's empty as we don't have specific props based on your code.
}
type RouteParams = {
  path?: string;
};

export const Navigation: React.FC<NavigationProps> = () => {
  const routes = useRoutes();
  const [active, setActive] = useState<string>("home");
  const { isMobile } = useWindowWidth();
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");
  const handleTabClick = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);
  const desktopViewCss = {
    marginRight: "0px",
    paddingStart: "0px",
    paddingEnd: "0px",
    maxWidth: "10%",
  };
  const styleForIcon = {
    flex: "0 0 auto",
    padding: 0,
    height: "100%",
    width: "50px",
  };
  const styleForSearch = { flex: "0 0 auto", width: "100%" };
  const navBarStyle = isMobile
    ? { width: "100%", height: "50px", border: "none", boxShadow: "none" }
    : { width: "50%", height: "55px", border: "none", boxShadow: "none" };

  return (
    <>
      <IonHeader className="w-1/2 h-14 border-none shadow-none max-md:w-full max-md:h-12 ">
        <IonGrid className="position-sticky bg-white  top-0 mb-3">
          <IonRow>
            <IonCol className="ion-no-padding h-full " size="1">
              <Link to="/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                  alt="logo"
                  className="h-10 w-10 shrink-0 object-contain"
                />
              </Link>
            </IonCol>
            <IonCol style={{ ...styleForSearch }} size="11">
              <SearchBar />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>

      <Tabs>
        <RouterOutlet>
          <PageRoute allProps={{}} />
        </RouterOutlet>

        <TabBar
          slot={isMobile ? "bottom" : "top"}
          className=" justify-end padding-0"
        >
          {routes?.map(({ name, Icon, link }) => (
            <TabButton
              key={name}
              tab={name}
              onClick={() => handleTabClick(link)}
              selected={activeTab === link}
              className={cn(
                " max-w-[10%] max-md:max-w-full ion-no-padding px-0 mx-0  ion-no-margin",
                activeTab === link
                  ? "tab-button-active "
                  : "tab-button-inactive"
              )}
            >
              <Icon />
              <Label className="font-semibold text-black max-md:text-smm">
                {name}
              </Label>
            </TabButton>
          ))}
        </TabBar>
      </Tabs>
    </>
  );
};
