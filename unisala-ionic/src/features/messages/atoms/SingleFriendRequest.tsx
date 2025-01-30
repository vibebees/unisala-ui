/* eslint-disable no-unused-vars */
import React, { FC } from "react";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";
import { DeleteIcon } from "@components/packages/icons";
import { Spinner } from "@components/defaults";

interface SingleFriendListProps extends IUser {
  isLoading: boolean;
  handleRemoveRequest: (data: any) => void;
  handleAcceptRequest: (data: any) => void;
}

const SingleFriendRequest: FC<SingleFriendListProps> = ({
  username,
  firstName,
  picture,
  lastName,
  id,
  isLoading,
  handleAcceptRequest,
  handleRemoveRequest,
}) => {
  return (
    <div className=" hover:bg-neutral-200 group py-3 px-4">
      <div className="flex h-full">
        <ImageWithLoader
          src={picture || ""}
          alt="user profile"
          className="size-12 shrink-0 rounded-full"
        />
        <div className="h-full pt-1 w-full ml-2 flex  justify-between">
          <div className="flex items-start flex-col  w-full">
            <h4 className="font-medium text-sm text-black line-clamp-1">
              {firstName} {lastName}
            </h4>
            <p className="text-xs text-neutral-500 line-clamp-1">@{username}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              disabled={isLoading}
              onClick={() => {
                handleAcceptRequest({
                  id,
                  username,
                  firstName,
                  lastName,
                  picture,
                });
              }}
              className="text-xs px-2  h-8  rounded-md bg-green-400 hover:shadow-lg  text-white"
            >
              Accept
            </button>
            <button
              disabled={isLoading}
              onClick={() => {
                handleRemoveRequest({
                  id,
                  username,
                  firstName,
                  lastName,
                  picture,
                });
              }}
              className="text-xs size-8 grid place-items-center group-hover:bg-red-200 hover:text-black  rounded-full bg-neutral-200 text-neutral-500"
            >
              <DeleteIcon height={21} width={21} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFriendRequest;
