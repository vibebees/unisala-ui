import React from "react";
import { useQuery } from "@apollo/client";
// Interfaces for Apollo and Redux actions might need to be defined or imported if not already
import { Search } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "../../datasource/servers/types";
// Component imports
import SearchTab from "./atoms/SearchTab";
import UserResults from "./orgamism/UserList";
import UniversityResults from "./orgamism/UniversityResults";
import UniSearchResult from "./uni";
import { URLgetter } from "../../utils/lib/URLupdate";
import useDocTitle from "../../hooks/useDocTitile";
import { OrgList } from "./orgamism/OrgList";
import { SpaceList } from "./orgamism/SpaceList";
import { Col, Row, Spinner } from "../../components/defaults";
import { AnimatePresence } from "framer-motion";
import { SearchQuery } from "src/types/gqlTypes/graphql";

export const SearchTemplate: React.FC = () => {
  const query = URLgetter("q") || "";
  let tab = URLgetter("tab") ?? "all";

  useDocTitle(`Search ᛫ ${query}`);

  const { data: searchData, loading } = useQuery<SearchQuery>(Search, {
    variables: { q: query, user: true, org: true, space: true, school: true },
    context: { server: USER_SERVICE_GQL },
  });

  const { users, orgs, spaces, items } = searchData?.search ?? {};

  return (
    <>
      <Row className=" max-w-[900px] ion-no-margin ion-no-padding max-md:px-0  px-4">
        <Col className="min-h-[100vh] relative ion-no-padding ion-no-margin  overflow-hidden w-full">
          <AnimatePresence mode="sync">
            <SearchTab />
          </AnimatePresence>
          <AnimatePresence mode="sync">
            {loading && (
              <div className=" grid place-content-center absolute z-10 inset-0 w-full h-full">
                <Spinner />
              </div>
            )}
            {tab === "all" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <UserResults
                  users={
                    items?.filter((item) => item?.type === "user") as IUser[]
                  }
                />

                <UniversityResults
                  universities={items?.filter(
                    (item) => item?.type === "university"
                  )}
                />
              </div>
            )}
            {tab === "user" && (
              <UserResults key={"user-result"} users={users as IUser[]} />
            )}
            {tab === "uni" && (
              <UniSearchResult
                key={"uni-result"}
                query={query}
                loading={loading}
              />
            )}

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
