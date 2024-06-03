import React from "react";
import { useParams } from "react-router";
import { GetPostById } from "../../datasource/graphql/user";
import { useQuery } from "@apollo/client";
import SingleThread from "../../components/packages/thread/singleThread";
import { FeedSkeleton } from "../../components/packages/skeleton/feedSkeleton";
import { USER_SERVICE_GQL } from "../../datasource/servers/types";
import { GetPostByIdQuery } from "src/types/gqlTypes/graphql";

const Thread = () => {
  const { id }: any = useParams();

  const { data, loading } = useQuery<GetPostByIdQuery>(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: { id },
  });

  if (loading || !data?.getPostById?.post) return <FeedSkeleton />;

  return <SingleThread {...data.getPostById.post} />;
};

export default Thread;
