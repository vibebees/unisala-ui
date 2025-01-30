import UserCard from "../../../components/packages/userCard";
import React, { FC } from "react";
import { Row, Typography } from "@components/defaults";
import Slider from "@components/packages/Slider/Slider";

interface UserResultsProps {
  users: IUser[];
}

const UserResults: FC<UserResultsProps> = ({ users }) => {
  if (!users) return null;
  if (users.length === 0) return null;

  return (
    <div className=" mt-4">
      <Typography variant="h2" className="text-base font-semibold">
        Users
      </Typography>
      <Row className="flex h-full flex-nowrap bg-transparent flex-row w-full gap-4">
        <Slider CustomclassName="discover-user-list">
          {users &&
            users?.length > 0 &&
            users.map((user, index) => <UserCard key={index} {...user} />)}
        </Slider>
      </Row>
    </div>
  );
};

export default UserResults;
