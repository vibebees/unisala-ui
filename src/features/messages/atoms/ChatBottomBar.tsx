import { SendIcon } from "@components/packages/icons";
import React from "react";

const ChatBottomBar = () => {
  return (
    <div className="h-24 w-full border ">
      <div className="flex justify-between items-center h-full">
        <input
          type="text"
          className="w-full rounded-full h-10 border border-gray-300 bg-white text-sm  pl-3"
          placeholder="Type a message"
        />
        <button className="bg-primary-500  rounded-lg h-10 w">
          <SendIcon className="w-6 h-6 text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatBottomBar;
