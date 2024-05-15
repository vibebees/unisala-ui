import React, { useEffect, useState } from "react";
import { Avatar } from "../../../defaults";
import { IonAvatar, IonItem } from "@ionic/react";
import { GalleryIcon } from "../../icons";
import { userInfo, userName } from "../../../../utils/cache";
import { useSelector } from "react-redux";
import { useAuth } from "@context/AuthContext";
import { currentFeedType } from "@utils/lib/URLupdate";
import { useLocation } from "react-router";

export const PostCardForClick = () => {
  const { user } =  useAuth()
  const feedType = currentFeedType(useLocation())
  const [ createPostPlaceHolder, setCreatePostPlaceHolder ] = useState("Suggest a university");

  // if feedType is specificOrg then set the placeholder to "What is this organization about?"
  useEffect(() => {
    let placeHolder = {
      specificOrg: "Post on this organization",
      specificSpace: "Post on this space",
      uniWall: "Suggest a university",
      newsfeed: "What's on your mind?"
    }
    setCreatePostPlaceHolder(placeHolder[feedType])
  },[])


  return (
    <div style={{ padding: "1px", cursor: "pointer" }}>
      <IonItem lines="none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IonAvatar slot="start">
          <Avatar username={userName} profilePic={user?.picture} />
        </IonAvatar>
        <input
          type="text"
          placeholder={createPostPlaceHolder}
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
