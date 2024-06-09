import React from "react";
import SingleFriendList from "../atoms/SingleFriendList";
import { useQuery } from "@apollo/client";
import { ConnectedList } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useAuth } from "@context/AuthContext";
import { ConnectedListQuery } from "src/types/gqlTypes/graphql";
import SingleFriendListSkeleton from "@components/skeleton/SingleFriendListSkeleton";

const FriendsTabContent = () => {
  const { user } = useAuth();
  const { id: userId } = user || {};
  const { data, loading, error } = useQuery<ConnectedListQuery>(ConnectedList, {
    variables: { userId },
    context: { server: USER_SERVICE_GQL },
    skip: !userId,
  });

  if (loading) {
    return (
      <>
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
      </>
    );
  }

  return (
    <div>
      {!error &&
        data?.connectedList?.connectionList?.length &&
        data?.connectedList?.connectionList?.map((friend) => {
          return (
            <SingleFriendList
              key={friend?.user?._id}
              {...(friend?.user as unknown as IUser)}
            />
          );
        })}

      {error && (
        <div className="text-center text-neutral-500">
          Something went wrong. Please try again
        </div>
      )}
    </div>
  );
};

export default FriendsTabContent;
