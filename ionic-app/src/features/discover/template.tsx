import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
// Interfaces for Apollo and Redux actions might need to be defined or imported if not already
import { UniFilterResults } from "@datasource/graphql/uni";
import { Search } from "@datasource/graphql/user";
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL,
} from "../../datasource/servers/types";
// Component imports
import { URLgetter } from "../../utils/lib/URLupdate";
import useDocTitle from "../../hooks/useDocTitile";
import { searchGetSuccess } from "../../datasource/store/action";
import { AnimatePresence } from "framer-motion";
import { SearchQuery } from "src/types/gqlTypes/graphql";
import MajorPage from "./majors";

export const DiscoverTemplate: React.FC = () => {
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
      <AnimatePresence mode="sync">
        <MajorPage />
      </AnimatePresence>
    </>
  );
};
