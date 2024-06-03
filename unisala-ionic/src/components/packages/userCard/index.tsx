import { Link } from "react-router-dom";
import "./index.css";
import React, { FC } from "react";
import { Avatar, Typography } from "../../defaults";
import { Card } from "@components/defaults";

const UserCard: FC<IUser> = ({ name, username, picture }) => {
  return (
    <Link to={`/@/${username}`} className="max-w-28 grid grid-cols-1 ">
      <Card className="ion-no-margin  ion-no-padding w-full h-full bg-transparent shadow-none">
        <div className=" rounded-md max-w-28 w-full border border-neutral-300 overflow-hidden">
          <Avatar username={username} profilePic={picture} />
        </div>
      </Card>
      <div className="w-full " title={name}>
        <Typography
          variant="h4"
          className="line-clamp-1 text-sm text-neutral-950 !font-medium w-full"
        >
          {name}
        </Typography>
        <Typography
          variant="p"
          className="line-clamp-1 text-neutral-600 !text-[11px] w-full"
        >
          @{username}
        </Typography>
      </div>
    </Link>
  );
};

export default UserCard;
