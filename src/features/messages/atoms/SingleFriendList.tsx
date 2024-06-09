import React from "react";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";

const SingleFriendList = () => {
  return (
    <div className=" hover:bg-neutral-200 group py-3 px-4">
      <div className="flex h-full">
        <ImageWithLoader
          src="/assets/alumini.jpeg"
          alt="user profile"
          className="size-12 shrink-0 rounded-full"
        />
        <div className="h-full pt-1 w-full ml-2 flex  justify-between">
          <div className="flex items-start flex-col  w-full">
            <h4 className="font-medium text-sm text-black line-clamp-1">
              John Doe
            </h4>
            <p className="text-xs text-neutral-500 line-clamp-1">@johndoe</p>
          </div>
          <div>
            <button className="text-xs px-2 group-hover:bg-neutral-100 hover:text-black  py-1 rounded-full bg-neutral-200 text-neutral-500">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFriendList;
