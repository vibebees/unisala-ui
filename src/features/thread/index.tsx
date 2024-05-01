import { useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router";
import { FeedSkeleton } from "../../components/packages/skeleton/feedSkeleton";
import SingleThread from "../../components/packages/thread/singleThread";
import { GetPostById } from "../../datasource/graphql/user";
import { USER_SERVICE_GQL } from "../../datasource/servers/types";

const index = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("user");

  let payload = {
    id,
  };

  if (paramValue) payload.user = paramValue;

  const { data, loading } = useQuery(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: payload,
  });

  if (loading || !data?.getPostById?.post) return <FeedSkeleton />;

  return <SingleThread thread={data?.getPostById.post} />;
};

export default index;
