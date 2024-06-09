import { SendIcon } from "@components/packages/icons";
import React from "react";

const ChatBottomBar = () => {
  return (
    <div className="h-24 w-full border ">
      <div className="flex justify-between gap-4 px-5 items-center h-full">
        <input
          type="text"
          className="w-full rounded-full h-10 border border-gray-300 focus-within:border-gray-600 outline-none bg-white text-sm text-neutral-900  pl-3"
          placeholder="Type a message"
        />
        <button className="bg-neutral-200  rounded-full size-10 grid place-content-center  shrink-0">
          <SendIcon className="w-6 h-6 text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatBottomBar;
