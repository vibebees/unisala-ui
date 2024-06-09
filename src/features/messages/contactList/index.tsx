import React from "react";
import { Link } from "react-router-dom";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonList,
  IonListHeader,
  IonSearchbar,
} from "@ionic/react";
import "./index.css";
import MessageItem from "../messagePop/MessageItem";
import { useDispatch } from "react-redux";
import { sendMessageTo } from "@datasource/store/action/userActivity";
import clsx from "clsx";
import ImageWithLoader from "@components/packages/reusable/Image/ImageWithLoader";
import SingleMessageList from "../atoms/SingleMessageList";
import MessageTabContent from "../molecules/MessageTabContent";
import FriendsTabContent from "../molecules/FriendsTabContent";

export const ContactList = ({ friends = [] }) => {
  const [activeTab, setActiveTab] = React.useState("messages");
  const dispatch = useDispatch();

  const setUpChat = (friend) => {
    dispatch(sendMessageTo(friend.user));
  };

  const handleMessagesList = () => {
    if (friends.length === 0) {
      return <div>No contacts</div>;
    }
    return friends.map((friend, index) => (
      <Link
        to={`/messages/${friend.user.username}`}
        key={friend.user._id}
        onClick={() => setUpChat(friend)}
      >
        <MessageItem {...friend.user} />
      </Link>
    ));
  };

  return (
    <div>
      <section className="pt-4">
        <div className="flex h-9 rounded-full mx-2 overflow-hidden bg-neutral-200 ">
          <button
            onClick={() => {
              setActiveTab("messages");
            }}
            className={clsx(
              "w-full rounded-full font-semibold text-neutral-600 text-sm",
              activeTab === "messages" && "bg-blue-500 text-white"
            )}
          >
            Messages
          </button>
          <button
            onClick={() => {
              setActiveTab("friends");
            }}
            className={clsx(
              "w-full rounded-full font-semibold text-neutral-600 text-sm",
              activeTab === "friends" && "bg-blue-500 text-white"
            )}
          >
            Friends
          </button>
        </div>
      </section>
      {/* <div className="chat-list__user-list">{handleMessagesList()}</div> */}
      <section className="w-full  h-full  pt-8">
        {activeTab === "messages" && <MessageTabContent />}
        {activeTab === "friends" && <FriendsTabContent />}
      </section>
    </div>
  );
};
