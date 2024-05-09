import React, { FC, useEffect, useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { getImage } from "../../datasource/servers/s3.configs";

interface AvatarProfileProps {
  profilePic: string;
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
