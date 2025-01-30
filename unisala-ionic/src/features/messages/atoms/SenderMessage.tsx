import React from "react";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";

const SenderMessage = () => {
  return (
    <div className="pr-3">
      <div className="flex justify-end items-start my-2">
        <div className="bg-gray-400 relative mb-7 max-w-[50%] p-2 mr-1 rounded-lg">
          <p className="text-sm">
            Hello, How can I help you today? Lorem ipsum dolor sit amet Lorem
          </p>
          <p className="text-neutral-500  left-0  -bottom-5 text-xs absolute">
            5:00 PM
          </p>
        </div>
        <ImageWithLoader
          src="/assets/alumini.jpeg"
          alt="user profile"
          className="size-8 shrink-0 rounded-full"
        />
      </div>
    </div>
  );
};

export default SenderMessage;
