import React from "react";

const SingleFriendListSkeleton = () => {
  return (
    <div className="hover:bg-neutral-200 group py-3 px-4">
      <div className="flex h-full animate-pulse">
        <div
          className="size-12 shrink-0 rounded-full bg-neutral-300"
          style={{ width: "48px", height: "48px" }}
        ></div>
        <div className="h-full pt-1 w-full ml-2 flex justify-between">
          <div className="flex items-start flex-col w-full">
            <div className="w-3/4 h-4 bg-neutral-300 rounded mb-1"></div>
            <div className="w-1/2 h-3 bg-neutral-300 rounded"></div>
          </div>
          <div>
            <div className="text-xs px-2 py-1 rounded-full bg-neutral-300 w-16 h-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFriendListSkeleton;
