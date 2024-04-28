import CardTitle from "../../university/rectangularCardGrid/atoms/CardTitle";
import UserCard from "../../../components/packages/userCard";
import { userName } from "../../../utils/cache";
import React, { FC } from "react";
import { Row, Typography } from "@components/defaults";

interface UserResultsProps {
  users: IUser[];
  loading: boolean;
}

export const UserResults: FC<UserResultsProps> = ({ users, loading }) => {
  return (
    <div className="">
      <Typography variant="h2" className="text-base font-semibold">
        Users
      </Typography>

      <Row className="flex mt-2 h-full flex-nowrap bg-transparent flex-row w-full gap-4">
        {users &&
          users?.length > 0 &&
          users.map((user, index) => <UserCard key={index} {...user} />)}
      </Row>
    </div>
  );
};
