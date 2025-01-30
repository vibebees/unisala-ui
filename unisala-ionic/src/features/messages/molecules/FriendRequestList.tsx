import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  AcceptConnectRequest,
  PendingConnectionList,
  RemoveConnectRequest,
} from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import SingleFriendListSkeleton from "@components/skeleton/SingleFriendListSkeleton";
import SingleFriendRequest from "../atoms/SingleFriendRequest";
import { useIonToast } from "@ionic/react";
import {
  AcceptConnectRequestMutation,
  RemoveConnectRequestMutation,
} from "src/types/gqlTypes/graphql";

const fakeData: IUser[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "john_doe",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    username: "jane_doe",
  },

  {
    id: "3",
    firstName: "John",
    lastName: "Smith",
    username: "john_smith",
  },
];

const FriendRequestList = () => {
  const [present, dismiss] = useIonToast();

  const { data, loading, error } = useQuery<any>(PendingConnectionList, {
    context: { server: USER_SERVICE_GQL },
  });

  const [deleteRequest, { loading: deletePending }] =
    useMutation<RemoveConnectRequestMutation>(RemoveConnectRequest, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        requestorId: "1",
      },
      onCompleted: (data) => {
        console.log("remove request response", data);
      },
      onError: (error) => {
        console.log("login error", error);
        present({
          message: error.message,
          duration: 3000,
          color: "danger",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
      },
    });
  const [acceptRequest, { loading: aceeptPending }] =
    useMutation<AcceptConnectRequestMutation>(AcceptConnectRequest, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        requestorId: "1",
      },
      onCompleted: (data) => {
        console.log("remove request response", data);
      },
      onError: (error) => {
        console.log("login error", error);
        present({
          message: error.message,
          duration: 3000,
          color: "danger",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
      },
    });

  const handleRemoveRequest = (data: any) => {
    deleteRequest({
      variables: {
        requestorId: data.id,
      },
    });
  };

  const handleAcceptRequest = (data: any) => {
    acceptRequest({
      variables: {
        requestorId: data.id,
      },
    });
  };

  if (loading)
    return (
      <div>
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
        <SingleFriendListSkeleton />
      </div>
    );

  return (
    <div>
      {fakeData.map((request) => (
        <SingleFriendRequest
          key={request.id}
          {...request}
          handleRemoveRequest={handleRemoveRequest}
          handleAcceptRequest={handleAcceptRequest}
          isLoading={deletePending || aceeptPending}
        />
      ))}
    </div>
  );
};

export default FriendRequestList;
