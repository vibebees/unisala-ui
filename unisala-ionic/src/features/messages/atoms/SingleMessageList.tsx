import React, { FC } from "react";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";

const SingleMessageList = () => {
  return (
    <div className=" hover:bg-neutral-200 max-md:cursor-pointer group relative py-3 px-4">
      <div className="flex h-full">
        <ImageWithLoader
          src="/assets/alumini.jpeg"
          alt="user profile"
          className="size-12 shrink-0 rounded-full"
        />
        <div className="h-full max-md:hidden pt-1 w-full ml-2 flex flex-col justify-center">
          <div className="flex items-center justify-between w-full">
            <h4 className="font-medium text-sm text-black line-clamp-1">
              John Doe
            </h4>

            <p className="text-xs text-neutral-500 shrink-0">2hrs ago</p>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Hey there how are you
          </p>
        </div>
      </div>
      <div className="absolute origin-left duration-200 transition-all ease-linear max-md:group-hover:scale-100 max-md:group-hover:block scale-0 top-6  rounded-md -right-[70px] z-50 px-2 w-full bg-black">
        <h4 className="font-medium text-sm  whitespace-nowrap text-white w-full  rounded-lg px-1 ">
          John Doe
        </h4>
      </div>
    </div>
  );
};

export default SingleMessageList;
