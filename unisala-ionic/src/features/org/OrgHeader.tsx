import React, { Suspense, lazy } from "react";
import { Card, CardHeader, Spinner } from "@components/defaults";
import OrgHeaderImg from "@assets/space-header.jpg";
import "./Org.css";
import { useOrgContext } from ".";
import { useAuth } from "@context/AuthContext";
const HeaderActions = lazy(() => import("@features/org/Header/HeaderActions"));

const OrgHeader = () => {
  const { admin, image, name, description } = useOrgContext();
  const { user } = useAuth();

  return (
    <Card className="ion-no-margin rounded-b-xl ">
      <CardHeader>
        <img
          className="profile-header-img"
          src={image || OrgHeaderImg}
          alt={`${name} Header`}
          style={{ height: "auto", maxWidth: "100%", borderRadius: "10px" }}
        />
      </CardHeader>

      <div className="profile-header-gradient ">
        <h2 className="space-name">{name}</h2>
        <p className="space-description" style={{ fontSize: "16px" }}>
          {description}
        </p>

        {admin.username === user?.username && (
          <Suspense fallback={<Spinner></Spinner>}>
            <HeaderActions />
          </Suspense>
        )}
      </div>
    </Card>
  );
};

export default OrgHeader;
