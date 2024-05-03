import React, { lazy } from "react";
import "./Home.css";
import useDocTitle from "../../hooks/useDocTitile";
const FloatingButton = lazy(
  () => import("../../components/packages/floatingButton/index")
);
const CreateAPostCard = lazy(
  () => import("../../components/packages/createAPost/template")
);
import InfiniteFeed from "../../components/packages/feed/Feed";
const FolderStructure = lazy(
  () => import("../../components/packages/folderStructure/index")
);

export const Home = () => {
  useDocTitle("Unisala");

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

  // const renderNewUserView = React.useCallback(() => {
  //   if (loggedIn && newUser) {
  //     return <WelcomeSteps allProps={{ ...allProps, refetch }} />;
  //   }
  //   return null;
  // }, [loggedIn, newUser]);

  return (
    <div className="w-full mx-3 overflow-x-hidden">
      <FloatingButton />
      <div>
        <CreateAPostCard />
        <InfiniteFeed feedType="newsfeed" />
      </div>
    </div>
  );
};
