import React, { lazy, Suspense } from "react";
import { Avatar, Card, Col, Typography } from "@components/defaults";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { IonSpinner } from "@ionic/react";
const TopSpaces = lazy(  () => import("@components/packages/TopSpaces/TopSpaces"));
import UnisalaIntro from "@assets/unisala-intro.png"
const TopOrgs = lazy(() => import("@components/packages/TopOrg/TopOrg"));

export const LeftSideBar = () => {
  const { authenticated, user } = useAuth();

  return (
    <Col
      size="auto"
      style={{
        height: "90vh",
        position: "sticky",
        top: "0px",
        overflow: "auto",
      }}
      className="profileCard ion-no-margin ion-no-padding"
    >
      {authenticated ? (
        <>
          <Col className="my-0 ion-no-margin ion-no-padding w-full">
            <Card className="ion-no-margin ion-no-padding BorderCard ">
              <div className="aside-profile pt-20 w-full">
                <div className="w-24 h-24 rounded-full overflow-hidden  !border-[7px] !border-neutral-200">
                  <Avatar
                    username={user?.username}
                    profilePic={""}
                    // size="medium"
                  />
                </div>
              </div>
              <div className="mt-3 mb-6">
                <Typography
                  variant="h6"
                  className="text-center text-sm font-bold"
                  color="dark"
                >
                  {user?.firstName + " " + user?.lastName}
                </Typography>
                <Typography
                  color="medium"
                  variant="p"
                  className="text-sm text-center font-normal"
                >
                  @{user?.username}
                </Typography>
              </div>
            </Card>
            <Card className="overflow-y-auto ion-no-margin ion-no-padding my-3 max-h-[348px] BorderCard">
              <Typography
                variant="h6"
                color="dark"
                className="text-center w-full my-2 font-semibold sticky top-0 bg-white z-10"
              >
                 Organizations
              </Typography>
              <Suspense fallback={<IonSpinner></IonSpinner>}>
                <TopOrgs />
              </Suspense>
            </Card>


            <Card className="overflow-y-auto justify-center my-3 max-h-[348px] ion-no-padding ion-no-margin BorderCard">
              <Typography
                variant="h6"
                color="dark"
                className="text-center w-full my-2 font-semibold sticky top-0 bg-white z-10"
                >
                Spaces
              </Typography>

              <Suspense fallback={<IonSpinner></IonSpinner>}>
                <TopSpaces />
              </Suspense>

              {/* // send user to search?q=test&tab=space */}
              <Link to="/space" style={{ marginTop: "120px" }}>
                <Typography className="max-w-[250px] py-4 text-[#3880FF] text-center  font-semibold">
                  Browse More Spaces
                </Typography>
              </Link>
            </Card>


          </Col>
        </>
      ) : (
        <>
          <Card
            style={{
              maxWidth: "250px",
            }}
          >
              <img src={UnisalaIntro} alt="unisala" loading="lazy" />
            <h5
              className="black-text"
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                lineHeight: "26px",
                padding: "5px",
              }}
            >
              If studying abroad is your dream, making it simple is ours! ✅
            </h5>
          </Card>
        </>
      )}
    </Col>
  );
};

