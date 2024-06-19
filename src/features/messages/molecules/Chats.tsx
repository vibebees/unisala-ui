import React from "react";
import SenderMessage from "../atoms/SenderMessage";
import OtherPersonMessage from "../atoms/OtherPersonMessage";

const Chats = () => {
  return (
    <div className="border h-full border-green-400 pt-3 w-full ">
      <SenderMessage />
      <OtherPersonMessage />
      <SenderMessage />
      <OtherPersonMessage />
      <SenderMessage />
    </div>
  );
};

export default Chats;
