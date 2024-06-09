import React from "react";
import ChatHeader from "../molecules/ChatHeader";
import Chats from "../molecules/Chats";
import ChatBottomBar from "../atoms/ChatBottomBar";

const SingleChat = () => {
  return (
    <div className="w-full h-full">
      <ChatHeader />
      <section className="h-[calc(100%-160px)] overflow-y-auto pt-3 w-full message-container">
        <Chats />
      </section>
      <section>
        <ChatBottomBar />
      </section>
    </div>
  );
};

export default SingleChat;
