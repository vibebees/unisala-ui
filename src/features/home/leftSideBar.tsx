import React from "react";
import { Avatar, Card, Text } from "../../components/defaults";
import { userInfo } from "../../utils/cache";
import { AvatarProfile } from "../../components/packages/Avatar";
import UserCard from "../../components/packages/userCard";
import { all } from "axios";
import { Link } from "react-router-dom";
import { SpaceReference } from "../../components/packages/spaceReference";
export const LeftSideBar = ({
  activeTab,
  setActiveTab,
  unisalaImg,
  profileData,
  loggedIn,
  spaces,
  orgs
}) => {
  let user = userInfo
  const radius = 45;
  const dashArray = radius * Math.PI * 2;
  const dataOffset = dashArray - (dashArray * 0) / 100;

  const GroupReference = ({ data, reference = "space" }) => {
    let to = reference === "space" ? "Spaces" : "Orgs";
    return (<Card className="overflow-y-auto my-4 max-h-[348px]">
      <Text color="dark">
        <h6 className="text-center my-2 font-semibold">Top {to}</h6>
      </Text>

      <SpaceReference references={data} />
      <Link to="/space" style={{ marginTop: "120px" }}>
        <Text
          className="max-w-[250px] text-[#3880FF] text-center  font-semibold"
          fill="solid"
          style={{
            "--background": "white",
            "--background-hover": "#eee"
          }}
        >
          <h1 className="py-4">Browse More {to}</h1>
        </Text>
      </Link>
    </Card>)
  }
  let topSpace = () => {

    return (<>

      <UserCard
        key={1}
        profileBanner={user.coverPicture}
        profileImg={user.profileImg}
        name={user.name}
        username={user.username}
        loaction={user.loaction}
        oneLineBio={user.oneLineBio}
      >
      </UserCard>
      <GroupReference data={spaces?.spaceCategory} reference="space" />
      <GroupReference data={orgs?.data} reference="org" />


    </>)
  }
  return (
    topSpace()
  );
};
