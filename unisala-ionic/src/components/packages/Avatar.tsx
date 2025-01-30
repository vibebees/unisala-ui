import React, { FC } from "react";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

interface AvatarProfileProps {
  profilePic: string | null | undefined;
  username?: string;
}

const AvatarProfile: FC<AvatarProfileProps> = ({
  profilePic,
  username = "user",
}) => {
  const picture = profilePic
    ? profilePic
    : createAvatar(thumbs, {
        size: 128,
        seed: username,

        // ... other options
      })?.toDataUriSync();

  return (
    <img
      src={picture}
      className="user-profile__img"
      onError={(e) => {
        e.currentTarget.src = createAvatar(thumbs, {
          size: 128,
          seed: username,
        })?.toDataUriSync();
      }}
      alt={username}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

export default AvatarProfile;
