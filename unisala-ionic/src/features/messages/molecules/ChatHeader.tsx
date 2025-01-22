import React from "react";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";
import { OptionIcon } from "@components/packages/icons";

const ChatHeader = () => {
  return (
    <div className="h-16 bg-neutral-100 ">
      <div className="flex justify-between items-center">
        <div className="px-3 py-2 flex items-center">
          <ImageWithLoader
            src="/assets/alumini.jpeg"
            alt="user profile"
            className="size-12 shrink-0 rounded-full"
          />
          <div className="ml-2 space-y-1">
            <h4 className="font-medium text-sm text-black">John Doe</h4>
            <p className="text-xs text-neutral-500">Last seen 5 minutes ago</p>
          </div>
        </div>
        <div className="pr-3">
          <div>
            <button className="size-8 rotate-90 rounded-full bg-neutral-300">
              <OptionIcon className="scale-75" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
