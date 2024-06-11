import React from "react";
import SingleFriendList from "../atoms/SingleFriendList";
import { useQuery } from "@apollo/client";
import { ConnectedList } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useAuth } from "@context/AuthContext";
import { ConnectedListQuery } from "src/types/gqlTypes/graphql";
import SingleFriendListSkeleton from "@components/skeleton/SingleFriendListSkeleton";
import FriendRequestList from "./FriendRequestList";
import { AddPerson, CloseIcon } from "@components/packages/icons";
import clsx from "clsx";

const FriendsTabContent = () => {
  const { user } = useAuth();
  const [showFriendList, setshowFriendList] = React.useState(false);
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
      <div className="flex justify-between  items-center mb-4 ">
        <h2 className="text-neutral-800 font-semibold  text-lg pl-6">
          {showFriendList ? "Friend Requests" : "Friends"}
        </h2>
        <div
          onClick={() => setshowFriendList((prev) => !prev)}
          className={clsx("mr-5 relative cursor-pointer select-none")}
        >
          {!showFriendList && (
            <>
              <AddPerson className="size-5 fill-black stroke-black" />
              <span className="size-6 select-none rounded-full  -top-5 -right-3 absolute grid place-items-center  bg-blue-500 text-white">
                4
              </span>
            </>
          )}
          {showFriendList && (
            <div className="text-red-500  font-bold bg-red-100 rounded-full size-7 grid place-items-center cursor-pointer active:scale-90 duration-100 ease-linear transition-transform">
              X
            </div>
          )}
        </div>
      </div>
      {showFriendList && <FriendRequestList />}
      {!showFriendList &&
        !error &&
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
