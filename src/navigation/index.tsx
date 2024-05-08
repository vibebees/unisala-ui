import React, { useEffect, useState } from "react";
import {
  Content,
  Header,
  Label,
  Menu,
  RouterOutlet,
  TabBar,
  TabButton,
  Tabs,
  Title,
  Toolbar,
} from "../components/defaults/";
import { Link, useHistory, useLocation } from "react-router-dom";
import { PageRoute } from "./PageRoute";
import { SearchBar } from "../components/packages/searchBox";
import { IonCol, IonGrid, IonHeader, IonRow } from "@ionic/react";
import useRoutes from "../hooks/useRoutes";
import { cn } from "../utils";
import useWindowWidth from "../hooks/useWindowWidth";
import logo from "@assets/icon/UniSala.gif";
import { createPortal } from "react-dom";
import ProfilePop from "@components/packages/profilePop";
import { useAuth } from "@context/AuthContext";
import AuthModal from "@components/packages/authentication/AuthModal";
// Define props if you have any for NavBar, for example:
interface NavigationProps {
  // Define any props here if needed, for now, it's empty as we don't have specific props based on your code.
}
type RouteParams = {
  path?: string;
};

export const Navigation: React.FC<NavigationProps> = () => {
  const { authenticated } = useAuth();
  const routes = useRoutes();
  const history = useHistory();
  const [showPopover, setShowPopover] = useState(false);
  const [active, setActive] = useState<string>("home");
  const { isMobile } = useWindowWidth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabClick = (e: any, path: string) => {
    if (e.detail.tab === "Profile" && authenticated) {
      setShowPopover(!showPopover);
    } else {
      history.push(path);
    }
  };

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.search, location.pathname]);

  const styleForSearch = { flex: "0 0 auto", width: "100%" };

  return (
    <>
      <Menu type="overlay" contentId="main-content">
        <Content id="menu-content">
          {/* pass content inside it using react portal */}
        </Content>
      </Menu>
      <IonHeader className="w-1/2 h-14 flex items-center shadow-none  max-md:w-full max-md:h-12 ">
        <IonGrid className=" bg-white   ion-no-margin ion-no-padding">
          <IonRow className="ion-no-margin ion-no-padding">
            <IonCol className="ion-no-padding h-full ion-no-margin" size="1">
              <Link to="/">
                <img
                  src={logo}
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
        <RouterOutlet id="main-content" className=" max-md:mt-12">
          <PageRoute />
        </RouterOutlet>

        <TabBar
          slot={isMobile ? "bottom" : "top"}
          className=" justify-end padding-0"
        >
          {routes?.map(({ name, Icon, link }) => (
            <TabButton
              key={name}
              tab={name}
              onClick={(e) => handleTabClick(e, link)}
              selected={activeTab === link}
              className={cn(
                " max-w-[10%] max-md:max-w-full relative ion-no-padding px-0 mx-0  ion-no-margin",
                activeTab === link
                  ? "tab-button-active "
                  : "tab-button-inactive"
              )}
            >
              <Icon />
              <div id={name} className="overflow-auto relative"></div>
              <Label className="font-semibold text-black max-md:text-smm">
                {name}
              </Label>
            </TabButton>
          ))}
        </TabBar>
      </Tabs>
      {window !== undefined &&
        document.getElementById("root") &&
        showPopover &&
        createPortal(
          <ProfilePop
            setShowPopover={setShowPopover}
            showPopover={showPopover}
          />,
          document.getElementById("root")!
        )}
      <AuthModal />
    </>
  );
};
