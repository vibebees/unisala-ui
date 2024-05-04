import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "@components/defaults";

interface SchoolCardProps {
  name: string;
  address?: string;
}

const SchoolCard: FC<SchoolCardProps> = ({ name, address = "" }) => {
  return (
    <Link to={"/universtity"}>
      <Card className=" BorderCard shadow-none ion-no-margin ion-no-padding my-1 w-48">
        <img
          src="https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"
          alt="university"
          className="w-48 h-44 "
        />
        <div className="py-2 px-2">
          <Typography
            variant="h6"
            className="!font-medium line-clamp-1 text-neutral-900"
          >
            {name}
          </Typography>
          <Typography variant="p" className="!text-xs line-clamp-1">
            {address}
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export default SchoolCard;
