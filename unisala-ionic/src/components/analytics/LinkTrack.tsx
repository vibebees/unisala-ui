import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

interface ICustomTrackingLink {
  to: string;
  children: React.ReactNode;
  title?: string;
  destination: string;
  customFunction?: () => void;
  className?: string;
}

export const CustomTrackingLink: FC<ICustomTrackingLink> = ({
  to,
  children,
  title = "",
  destination,
  customFunction,
  className,
}) => {
  const history = useHistory();
  const location = useLocation();

  const trackDestination = () => {
    let currentPath = location.pathname;
    customFunction && customFunction();
    ReactGA.send({
      hitType: "pageview",
      page: destination,
      title: title,
      from: currentPath,
      timeStamp: new Date(),
    });

    history.push(to);
  };

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      className={className}
      onClick={trackDestination}
    >
      {children}
    </div>
  );
};
