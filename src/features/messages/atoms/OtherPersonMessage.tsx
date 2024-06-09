import React from "react";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";

const OtherPersonMessage = () => {
  return (
    <div className="flex pl-3 justify-start items-start my-2">
      <ImageWithLoader
        src="/assets/studentOrg.webp"
        alt="user profile"
        className="size-8 shrink-0 rounded-full"
      />
      <div className="bg-gray-400 relative mb-7 max-w-[50%] p-2 ml-1 rounded-lg">
        <p className="text-sm">
          Hello, How can I help you today Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolores, sequi. Sapiente, velit. Enim exercitationem
        </p>
        <p className="text-neutral-500 right-0  -bottom-5 text-xs absolute">
          5:00 PM
        </p>
      </div>
    </div>
  );
};

export default OtherPersonMessage;
