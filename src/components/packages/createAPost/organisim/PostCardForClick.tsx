import React from "react";
import { Avatar } from "../../../defaults";
import { IonAvatar, IonItem } from "@ionic/react";
import { GalleryIcon } from "../../icons";
import { userInfo } from "../../../../utils/cache";
import { useSelector } from "react-redux";

export const PostCardForClick = () => {
  const { user } =  useSelector(state => state.userProfile)

  return (
    <div style={{ padding: "1px", cursor: "pointer" }}>
      <IonItem lines="none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IonAvatar slot="start">
          <Avatar username={user?.username} profilePic={user?.picture} />
        </IonAvatar>
        <input
          type="text"
          placeholder={"Suggest a university"}
          style={{ flexGrow: 1, marginLeft: '10px', marginRight: '10px' }} // Adjust spacing as needed
          className="bg-transparent border-none outline-none"
        />
        <div style={{ flexShrink: 0 }}>
          <GalleryIcon />
        </div>
      </IonItem>
    </div>
  );
};
