import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
// Interfaces for Apollo and Redux actions might need to be defined or imported if not already
import { UniFilterResults } from "../../datasource/graphql/uni";
import { Search } from "@datasource/graphql/user";
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL,
} from "../../datasource/servers/types";
// Component imports
import SearchTab from "./atoms/SearchTab";
import { UserResults } from "./orgamism/UserList";
import { UniversityResults } from "./orgamism/UniversityResults";
import UniSearchResult from "./uni";
import { URLgetter } from "../../utils/lib/URLupdate";
import useDocTitle from "../../hooks/useDocTitile";
import { searchGetSuccess } from "../../datasource/store/action";
import { OrgList } from "./orgamism/OrgList";
import { SpaceList } from "./orgamism/SpaceList";
import { Col, Row } from "../../components/defaults";
import { getAllQueryParams } from "./uni/filters/utility";
import { AnimatePresence } from "framer-motion";
import { SearchQuery } from "src/types/gqlTypes/graphql";

export const SearchTemplate: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  let tab = URLgetter("tab");

  useDocTitle(`Search ᛫ ${query}`);

  const { data: searchData, loading: userLoading } = useQuery<SearchQuery>(
    Search,
    {
      variables: { q: query, user: true, org: true, space: true, school: true },
      context: { server: USER_SERVICE_GQL },
    }
  );

  const [getUniversityResults, { data: uniData, loading: uniLoading }] =
    useLazyQuery(UniFilterResults, {
      context: { server: UNIVERSITY_SERVICE_GQL },
      fetchPolicy: "network-only",
    });

  useEffect(() => {
    if (tab === "uni") {
      const queryObject = getAllQueryParams(0);
      getUniversityResults({ variables: { ...queryObject } });
    }
  }, [history.location.search, tab, getUniversityResults]);

  useEffect(() => {
    if (uniData) {
      const formattedData = uniData.searchUniversity.map((item: any) => ({
        overallRating: item.overallRating,
        totalPeopleVoted: item.totalPeopleVoted,
        ...item.elevatorInfo,
        ...item.studentCharges,
      }));
      dispatch(searchGetSuccess(formattedData));
    }
  }, [uniData, dispatch]);

  // const { setPopUp } = useContext(ExploreFilterPopupContext);

  const { users, orgs, spaces } = searchData?.search ?? {};

  return (
    <>
      {/* <SearchFilterRow setPopUp={setPopUp} /> */}
      <Row className=" max-w-[900px] ion-no-margin ion-no-padding  px-4">
        <Col className="min-h-[100vh] ion-no-padding ion-no-margin  overflow-hidden w-full">
          <AnimatePresence mode="sync">
            <SearchTab />
          </AnimatePresence>
          <AnimatePresence mode="sync">
            {tab === "all" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <UserResults users={users} loading={uniLoading} />
                <UniversityResults
                  universities={uniData?.searchSchool}
                  loading={uniLoading}
                />
                <h3 style={{ marginBottom: "1rem", color: "#4d4d4d" }}>
                  Posts
                </h3>
              </div>
            )}
            {tab === "user" && (
              <UserResults
                key={"user-result"}
                users={users as IUser[]}
                loading={userLoading}
              />
            )}
            {tab === "uni" && (
              <UniSearchResult
                key={"uni-result"}
                query={query}
                loading={uniLoading}
              />
            )}
            {tab === "post" && <h1>Posts</h1>}
            {tab === "space" && (
              <SpaceList spaces={spaces} key={"space-result"} />
            )}
            {tab === "org" && <OrgList orgs={orgs} />}
          </AnimatePresence>
        </Col>
      </Row>
    </>
  );
};

// const SearchFilterRow: React.FC<{ setPopUp: (popUp: boolean) => void }> = ({
//   setPopUp,
// }) => (
//   <IonRow className="mobile-row">
//     <IonCol size="auto">
//       <IonIcon
//         icon={school}
//         onClick={() => setPopUp(true)}
//         size="large"
//         color="success"
//       />
//     </IonCol>
//     <IonCol>
//       <SearchBar />
//     </IonCol>
//   </IonRow>
// );
