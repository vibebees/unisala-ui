import React from "react";
import ChatHeader from "../molecules/ChatHeader";
import Chats from "../molecules/Chats";
import ChatBottomBar from "../atoms/ChatBottomBar";

const SingleChat = () => {
  return (
    <div className="w-full h-full">
      <ChatHeader />
      <section className="h">
        <Chats />
      </section>
      <section>
        <ChatBottomBar />
      </section>
    </div>
  );
};

export default SingleChat;
