import React, { useEffect, useState, lazy } from "react";
import "./Home.css";
import { useQuery } from "@apollo/client";
import { getUpdatedSchoolInfo } from "./../../datasource/graphql/uni";
import { fetchFamousUniversities } from "./../../datasource/graphql/user";
import useDocTitle from "../../hooks/useDocTitile";
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL,
} from "./../../datasource/servers/types";
import { Card } from "../../components/defaults";

const FloatingButton = lazy(
  () => import("../../components/packages/floatingButton/index")
);
const CreateAPostCard = lazy(
  () => import("../../components/packages/createAPost/template")
);

const WelcomeSteps = lazy(
  () => import("../../components/packages/authentication/Welcome")
);
const InfiniteFeed = lazy(() => import("../../components/packages/feed/Feed"));
// const ScrollableCard = lazy(() =>import("../../components/packages/ScrollableImageCard/organism/ScrollableCard"))
const FolderStructure = lazy(
  () => import("../../components/packages/folderStructure/index")
);
const ScrollableCard = lazy(
  () =>
    import(
      "../../components/packages/scrollableImageCard/organism/ScrollableCard"
    )
);

export const Home = () => {
  useDocTitle("Unisala");
  const allProps = { unitId: "1" };

  // const [userGuide, setUserGuide] = useState([]);

  // const { loading: schoolLoading, data: schoolData } = useQuery(
  //   getUpdatedSchoolInfo(unitId),
  //   {
  //     variables: { unitId },
  //     context: { server: UNIVERSITY_SERVICE_GQL },
  //   }
  // );
  // const {
  //   data: famousUniversities,
  //   loading: famousUniversitiesLoading,
  //   error,
  // } = useQuery(fetchFamousUniversities, {
  //   variables: { limit: 20, page: 0 },
  //   context: { server: USER_SERVICE_GQL },
  // });

  // const discoverUni = famousUniversities?.getFamousUniversity;

  // useEffect(() => {
  //   const generatedUserGuide = generateUserGuide(
  //     userInfo,
  //     schoolData?.getUpdatedSchoolInfo?.elevatorInfo
  //   );
  //   setUserGuide(generatedUserGuide);
  // }, [schoolData]);

  const Feed = () => (
    <div>
      <CreateAPostCard allProps={{}} />
      <FolderStructure allProps={{}} />
      <Card className=" mt-4 ion-no-padding ion-no-margin">
        <ScrollableCard allProps={{}} />
      </Card>

      <InfiniteFeed feedType="newsfeed" />
    </div>
  );

  // const renderNewUserView = React.useCallback(() => {
  //   if (loggedIn && newUser) {
  //     return <WelcomeSteps allProps={{ ...allProps, refetch }} />;
  //   }
  //   return null;
  // }, [loggedIn, newUser]);

  return (
    <>
      <FloatingButton />
      {Feed()}
    </>
  );
};
